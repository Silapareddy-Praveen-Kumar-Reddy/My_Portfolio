import { getStore } from "@netlify/blobs";

const SEED = 123; // display = SEED + raw stored value

export default async (req: Request): Promise<Response> => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const store = getStore("portfolio-stats");
    const url = new URL(req.url);
    const readOnly = url.searchParams.get("readonly") === "1";

    const raw = await store.get("visitor-count", { type: "text" });
    const current = parseInt(raw ?? "0", 10) || 0;

    let displayed = current;

    if (!readOnly) {
      const next = current + 1;
      await store.set("visitor-count", String(next));
      displayed = next;
    }

    return new Response(
      JSON.stringify({ value: SEED + displayed }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Visitor count error:", err);
    return new Response(
      JSON.stringify({ value: SEED }),
      { status: 200, headers }
    );
  }
};

export const config = {
  path: "/api/visitor-count",
};
