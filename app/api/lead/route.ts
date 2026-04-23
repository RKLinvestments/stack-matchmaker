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

  if (resendKey && from) {
    if (to) {
      await sendResend(resendKey, {
        from,
        to,
        subject: `New Stack Matchmaker lead (${source}): ${email}`,
        text: `Email: ${email}\nSource: ${source}\nStack: ${shareUrl}\n`,
      });
    }

    if (stackId) {
      await sendResend(resendKey, {
        from,
        to: email,
        subject: "Your AI stack is ready",
        text: stackEmailText(shareUrl),
        html: stackEmailHtml(shareUrl),
      });
    }
  }

  return NextResponse.json({ ok: true });
}

type ResendPayload = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

async function sendResend(key: string, payload: ResendPayload): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("[lead] resend failed", res.status, t);
    }
  } catch (err) {
    console.error("[lead] resend error", err);
  }
}

function stackEmailText(url: string): string {
  return [
    "Your AI stack is saved.",
    "",
    "View your personalized plan — tools, workflow order, and a 7-day setup checklist:",
    url,
    "",
    "Bookmark the link or forward it to a teammate — it'll keep working.",
    "",
    "— Stack Matchmaker",
    "",
    "Reply STOP and we'll take you off the list. Questions? Just reply to this email.",
  ].join("\n");
}

function stackEmailHtml(url: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fafaf7;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#13151d;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafaf7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #ececea;border-radius:16px;">
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6f7a;">Stack Matchmaker</div>
                <h1 style="margin:12px 0 8px 0;font-size:24px;line-height:1.25;color:#13151d;">Your AI stack is saved.</h1>
                <p style="margin:0;color:#3d424e;line-height:1.55;">Here's your personalized plan — the tools to use, the order to roll them out, and a 7-day setup checklist.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <a href="${escapeHtml(url)}" style="display:inline-block;background:#ff6a3d;color:#ffffff;text-decoration:none;font-weight:600;padding:14px 22px;border-radius:999px;">View my stack &rarr;</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px 32px;">
                <p style="margin:0;color:#6b6f7a;font-size:14px;line-height:1.55;">Bookmark the link or forward it to a teammate — it will keep working.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #f0eeea;color:#8a8f9a;font-size:12px;line-height:1.5;">
                You got this because you saved your stack at <a href="https://stackmatchmaker.app" style="color:#8a8f9a;">stackmatchmaker.app</a>. Reply STOP to unsubscribe, or just reply with a question.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getOrigin(req: Request): string {
  try {
    return new URL(req.url).origin;
  } catch {
    return "";
  }
}
