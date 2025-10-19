/* eslint-env node */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- CORS setup ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests quickly
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Reject non-POST methods
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // --- Get your Google Apps Script Web App URL ---
  const sheetWebAppUrl =
    process.env.SHEET_WEBAPP_URL ||
    "https://script.google.com/macros/s/AKfycbzopnsOgeR2JXt6H6--sN8h3c-SELky7mW0GXoeT7HaSSrGtVFqq203MTzDzNzG0nc/exec"; // ✅ fallback for local testing

  try {
    const body = req.body ?? {};

    // --- Validate fields ---
    const requiredFields = ["token", "name", "mobile", "date", "time", "concern", "type"] as const;
    const missing = requiredFields.filter(
      (key) => !body?.[key] || (typeof body[key] === "string" && body[key].trim() === "")
    );
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    // --- Forward data to Google Apps Script ---
    const forwardResp = await fetch(sheetWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await forwardResp.text();

    // --- Handle different response types ---
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      console.warn("Non-JSON response from Google Apps Script:", text);
      return res.status(200).json({ status: "success", message: "Forwarded successfully." });
    }
  } catch (err: any) {
    console.error("Error forwarding request:", err);
    return res.status(500).json({ error: "Server error forwarding data" });
  }
}
