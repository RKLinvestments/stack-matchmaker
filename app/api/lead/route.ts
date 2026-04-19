import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.email !== "string") {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const email: string = body.email;
  const stackId: string = typeof body.stackId === "string" ? body.stackId : "";
  const source: string =
    typeof body.source === "string" ? body.source : stackId ? "stack_results" : "unknown";
  const shareUrl = stackId
    ? `${getOrigin(req)}/results?a=${stackId}`
    : "(no stack id)";

  console.log("[lead] captured", { email, stackId, source });

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (resendKey && to && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: `New Stack Matchmaker lead (${source}): ${email}`,
          text: `Email: ${email}\nSource: ${source}\nStack: ${shareUrl}\n`,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        console.error("[lead] resend failed", res.status, t);
      }
    } catch (err) {
      console.error("[lead] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function getOrigin(req: Request): string {
  try {
    return new URL(req.url).origin;
  } catch {
    return "";
  }
}
