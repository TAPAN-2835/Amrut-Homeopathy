/* eslint-env node */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- CORS setup ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // --- Google Apps Script endpoint ---
  const sheetWebAppUrl =
    process.env.SHEET_WEBAPP_URL ||
    "https://script.google.com/macros/s/AKfycbyVFJz1yMf3mayF1eJPhrDoCNy6ar_z_h0eRHtWXB8x-ODyHAjv2P5v8hqxyBKitnY/exec";

  try {
    // --- Handle body safely (sometimes req.body can be a string) ---
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const parsedBody = typeof req.body === "object" ? req.body : JSON.parse(rawBody);

    // --- Validation ---
    const requiredFields = ["token", "name", "mobile", "date", "time", "concern", "type"];
    const missing = requiredFields.filter(
      (key) => !parsedBody?.[key] || (typeof parsedBody[key] === "string" && parsedBody[key].trim() === "")
    );

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    // --- Forward data to Google Apps Script ---
    const forwardResp = await fetch(sheetWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedBody), // ✅ ensures correct JSON
    });

    const text = await forwardResp.text();

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      console.warn("Non-JSON response from Google Apps Script:", text);
      return res.status(200).json({ status: "success", raw: text });
    }
  } catch (err: any) {
    console.error("Error forwarding request:", err);
    return res.status(500).json({ error: "Server error forwarding data", details: err.message });
  }
}
