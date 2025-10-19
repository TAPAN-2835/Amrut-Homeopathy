/* eslint-env node */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sheetWebAppUrl = process.env.SHEET_WEBAPP_URL;
  if (!sheetWebAppUrl) {
    return res.status(500).json({ error: "Missing SHEET_WEBAPP_URL environment variable" });
  }

  try {
    const body = (req as any).body ?? {};

    // Basic required fields validation (server-side safety check)
    const requiredFields = ["token", "name", "mobile", "date", "time", "concern", "type"] as const;
    const missing = requiredFields.filter((key) => !body?.[key] || (typeof body[key] === "string" && body[key].trim() === ""));
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const forwardResp = await fetch(sheetWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Try to parse JSON, fall back to text
    const text = await forwardResp.text();
    try {
      const json = JSON.parse(text);
      // Normalize to 200 to keep client logic simple
      return res.status(200).json(json);
    } catch {
      return res.status(502).json({ error: "Upstream returned non-JSON response", raw: text.slice(0, 200) });
    }
  } catch (err: any) {
    console.error("Error forwarding request:", err);
    return res.status(500).json({ error: "Server error forwarding data" });
  }
}
