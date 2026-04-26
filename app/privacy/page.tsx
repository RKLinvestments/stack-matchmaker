import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Stack Matchmaker collects, uses, and protects your data when you use our AI stack recommendation tool.",
};

const LAST_UPDATED = "April 18, 2026";
const CONTACT_EMAIL = "aaron@gatorcapitalpartners.com";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-3xl px-6 pt-14 pb-8">
            <div className="chip mb-4">Legal</div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-muted-foreground">Last updated {LAST_UPDATED}.</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <div className="prose-like space-y-8 text-foreground">
            <Block title="The short version">
              <p>
                We built Stack Matchmaker to help you find the right AI tools. We
                collect the minimum information we need to show you useful
                recommendations and improve the product. We never sell your
                personal data. If you give us your email, we use it only to send
                you what you asked for and occasional product updates you can
                opt out of at any time.
              </p>
            </Block>

            <Block title="Who we are">
              <p>
                Stack Matchmaker is operated by Gator Capital Partners. If you
                have any questions about this policy, email us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-foreground underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Block>

            <Block title="What we collect">
              <p>There are three kinds of information we may collect:</p>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <strong>Quiz answers.</strong> When you take the quiz, we
                  process your answers (role, goals, budget, current tools,
                  etc.) to generate your stack. Those answers are encoded into
                  the results URL so you can share or bookmark your result.
                </li>
                <li>
                  <strong>Email (optional).</strong> If you enter your email to
                  save your plan or subscribe to our newsletter, we store that
                  email so we can send you the plan and product updates.
                </li>
                <li>
                  <strong>Usage analytics.</strong> We use privacy-respecting
                  analytics (PostHog or Plausible) to understand which features
                  people use. This includes basic events like "quiz started,"
                  "stack viewed," and "tool clicked." We do not collect IP
                  addresses in a way that identifies individuals where we can
                  avoid it.
                </li>
              </ol>
            </Block>

            <Block title="How we use your information">
              <ul className="list-disc space-y-2 pl-5">
                <li>Generate and display your personalized AI stack.</li>
                <li>
                  Send you the emails you asked for (your saved plan, product
                  updates, and occasional recommendations).
                </li>
                <li>
                  Improve the recommendation engine, the catalog of tools, and
                  the overall product experience.
                </li>
                <li>
                  Monitor traffic and prevent abuse (e.g., blocking bots).
                </li>
              </ul>
            </Block>

            <Block title="What we don't do">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  We don't sell your personal data to anyone. Ever.
                </li>
                <li>
                  We don't share your email with the tools we recommend. Clicking
                  an affiliate link opens that company's site under their own
                  privacy policy — we don't hand your information to them.
                </li>
                <li>
                  We don't run third-party advertising trackers on this site.
                </li>
              </ul>
            </Block>

            <Block title="Affiliate links">
              <p>
                Some links on this site are affiliate links. When you click one
                and purchase a subscription, we may earn a commission at no
                extra cost to you. Our recommendations are not influenced by
                commission size — we score tools on trust, ROI, and retention,
                not payout.
              </p>
            </Block>

            <Block title="Third-party services we use">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Vercel</strong> — hosts the application.
                </li>
                <li>
                  <strong>Anthropic (Claude API)</strong> — generates your
                  personalized rollout plan. Your quiz answers are sent to
                  Anthropic to produce the plan and are not used by Anthropic to
                  train models (per their API terms).
                </li>
                <li>
                  <strong>Resend</strong> — sends emails when you opt in to
                  receive them.
                </li>
                <li>
                  <strong>PostHog or Plausible</strong> — product analytics,
                  used for aggregate usage data only.
                </li>
              </ul>
            </Block>

            <Block title="Your rights">
              <p>
                You can ask us to access, correct, or delete any information we
                have about you. Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-foreground underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                and we'll respond within 30 days. You can also unsubscribe from
                any email we send you using the unsubscribe link in the footer
                of the email.
              </p>
              <p>
                If you're in the EU, UK, or California, you may have additional
                rights under GDPR, UK GDPR, or CCPA — we'll honor those rights
                on request.
              </p>
            </Block>

            <Block title="Children">
              <p>
                Stack Matchmaker is not directed to children under 13, and we do
                not knowingly collect data from children.
              </p>
            </Block>

            <Block title="Changes to this policy">
              <p>
                If we make material changes to this policy, we'll update the
                "last updated" date above and, if relevant, notify users by
                email. Continued use of the site after a change means you
                accept the updated policy.
              </p>
            </Block>

            <div className="pt-6 text-sm text-muted-foreground">
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              ·{" "}
              <Link href="/methodology" className="underline">
                How we recommend
              </Link>{" "}
              ·{" "}
              <Link href="/" className="underline">
                Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
