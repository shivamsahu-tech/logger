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
  let message = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? body ?? "");
  } catch {
    message = "";
  }

  const timestamp = new Date().toISOString();

  // ── Console log ──────────────────────────────────────────────────────────────
  console.log(`${timestamp} : ${message}`);

  // ── Response ─────────────────────────────────────────────────────────────────
  return NextResponse.json(
    { success: true, log: `${timestamp} : ${message}` },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
