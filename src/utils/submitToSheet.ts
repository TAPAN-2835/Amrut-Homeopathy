// Utilities to submit appointment data via Vercel API proxy to Google Sheet

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

const API_ENDPOINT =
  import.meta.env.DEV
    ? "/api/submit" // ✅ use proxy in dev
    : "/api/submit"; // ✅ same in production (handled by Vercel)

function generateToken(): string {
  const num = Math.floor(Math.random() * 10000);
  const fourDigits = num.toString().padStart(4, "0");
  return `AH${fourDigits}`;
}

async function postToApi(
  payload: Record<string, unknown>,
): Promise<{ status: string; message?: string } | { error: string }>
{
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // API returns JSON with { status: "success" | "error", ... } forwarded from Apps Script
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
  options?: { maxRetries?: number },
): Promise<SubmitResult> {
  const maxRetries = options?.maxRetries ?? 6;

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

    const result = await postToApi(payload);

    if ((result as any).status === "success") {
      return { token };
    }

    if ((result as any).status === "error" && /duplicate token/i.test((result as any).message ?? "")) {
      // Try again with a new token
      continue;
    }

    // Unexpected error
    if ((result as any).message) {
      throw new Error((result as any).message);
    }
    if ((result as any).error) {
      throw new Error((result as any).error);
    }
    throw new Error("Unknown error while submitting to sheet.");
  }

  throw new Error("Could not generate a unique token after several attempts. Please try again.");
}

export function mapPatientType(value: string): AppointmentSubmission["type"] {
  return value === "existing" ? "Existing Patient" : "New Patient";
}
