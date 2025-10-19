// Utilities to submit appointment data to Google Apps Script-backed Google Sheet

export type AppointmentSubmission = {
  name: string;
  mobile: string; // 10-digit string
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  concern: string; // value from select
  type: "New Patient" | "Existing Patient";
  message?: string;
};

export type SubmitResult = {
  token: string;
};

const SHEET_URL: string | undefined = (import.meta as any).env?.VITE_SHEET_URL;

function generateToken(): string {
  const num = Math.floor(Math.random() * 10000);
  const fourDigits = num.toString().padStart(4, "0");
  return `AH${fourDigits}`;
}

async function postToSheet(
  url: string,
  payload: Record<string, unknown>,
): Promise<{ status: string; message?: string }>
{
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Google Apps Script Web Apps typically don't require credentials for public access
  });

  // Google Apps Script Web App often returns 200 even on errors encoded in JSON
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch {
    // If it's not valid JSON, treat as error
    return { status: "error", message: `Unexpected response: ${text.slice(0, 200)}` };
  }
}

/**
 * Attempts to submit appointment data with a unique token. Retries if the token collides.
 * Relies on the Apps Script to reject duplicates with { status: "error", message: "Duplicate token" }.
 */
export async function submitToSheet(
  data: AppointmentSubmission,
  options?: { maxRetries?: number; sheetUrlOverride?: string },
): Promise<SubmitResult> {
  const maxRetries = options?.maxRetries ?? 6;
  const url = options?.sheetUrlOverride ?? SHEET_URL;

  if (!url) {
    throw new Error(
      "Missing VITE_SHEET_URL. Please set your Google Apps Script Web App URL in .env as VITE_SHEET_URL.",
    );
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const token = generateToken();
    const payload = {
      token,
      name: data.name,
      mobile: data.mobile,
      email: data.email ?? "",
      date: data.date,
      time: data.time,
      concern: data.concern,
      type: data.type,
      message: data.message ?? "",
    };

    const result = await postToSheet(url, payload);

    if (result.status === "success") {
      return { token };
    }

    if (result.status === "error" && /duplicate token/i.test(result.message ?? "")) {
      // Try again with a new token
      continue;
    }

    // Unexpected error
    throw new Error(result.message || "Unknown error while submitting to sheet.");
  }

  throw new Error("Could not generate a unique token after several attempts. Please try again.");
}

export function mapPatientType(value: string): AppointmentSubmission["type"] {
  return value === "existing" ? "Existing Patient" : "New Patient";
}
