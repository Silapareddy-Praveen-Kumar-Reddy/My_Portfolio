import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * Visitor counter — uses countapi.xyz to persist a real count across all visitors.
 * - Namespace: "praveen-portfolio"
 * - Key:       "visitors"
 * - Initial offset: 123 baked in — so even if the API returns 1, we display 124.
 *
 * The API is called once per session (tracked via sessionStorage) so that
 * page refreshes during the same browser session don't keep incrementing.
 */
const NAMESPACE = "praveen-portfolio-v1";
const KEY = "visitors";
const SEED = 123; // shown even if the API counter is at 0
const SESSION_KEY = "vcount_hit";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyHit = sessionStorage.getItem(SESSION_KEY);

    const endpoint = alreadyHit
      ? `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
      : `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        if (data?.value !== undefined) {
          setCount(SEED + data.value);
          if (!alreadyHit) sessionStorage.setItem(SESSION_KEY, "1");
        }
      })
      .catch(() => {
        // Fallback: show seed only
        setCount(SEED);
      });
  }, []);

  const display =
    count === null
      ? "···"
      : count.toLocaleString("en-IN");

  return (
    <div className="visitor-counter" title="Total visitors">
      <Eye size={13} strokeWidth={2} className="visitor-counter-icon" />
      <span className="visitor-counter-label">Total Visitors</span>
      <span className="visitor-counter-value">{display}</span>
    </div>
  );
};

export default VisitorCounter;
