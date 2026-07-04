import { NextRequest, NextResponse } from "next/server";

const AUTH_KEY = "we_are_in_simulation";

export async function POST(req: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  const authHeader = req.headers.get("x-auth-key");
  if (authHeader !== AUTH_KEY) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const timestamp = new Date().toISOString();

  // ── Console log ──────────────────────────────────────────────────────────────
  console.log(`[LOG] ${timestamp}`, JSON.stringify(body, null, 2));

  // ── Response ─────────────────────────────────────────────────────────────────
  return NextResponse.json(
    {
      success: true,
      message: "Log received",
      timestamp,
      received: body,
    },
    { status: 200 }
  );
}

// Optional: reject non-POST methods explicitly
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
