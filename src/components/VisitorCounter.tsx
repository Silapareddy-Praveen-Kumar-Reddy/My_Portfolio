import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * Visitor counter — calls a Netlify serverless function that stores
 * the real count in Netlify Blobs (persistent across all users).
 *
 * Seed (123) is applied inside the function, so the API returns the
 * full display value directly.
 *
 * sessionStorage is used so refreshing during the same browser session
 * doesn't keep incrementing the counter.
 */
const SESSION_KEY = "vcount_hit";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyHit = sessionStorage.getItem(SESSION_KEY);

    // On first visit → hit the function (increments + returns count)
    // On refresh in same session → still fetch but we won't increment
    // (the function always increments; we work around it with a read-only
    // param so dev refreshes don't spam the counter)
    const url = "/api/visitor-count" + (alreadyHit ? "?readonly=1" : "");

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.value !== undefined) {
          setCount(data.value);
          if (!alreadyHit) sessionStorage.setItem(SESSION_KEY, "1");
        }
      })
      .catch(() => setCount(123));
  }, []);

  const display =
    count === null ? "···" : count.toLocaleString("en-IN");

  return (
    <div className="visitor-counter" title="Total visitors">
      <Eye size={13} strokeWidth={2} className="visitor-counter-icon" />
      <span className="visitor-counter-label">Total Visitors</span>
      <span className="visitor-counter-value">{display}</span>
    </div>
  );
};

export default VisitorCounter;
