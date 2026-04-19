import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterCapture } from "@/components/NewsletterCapture";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is it really free?",
    a: (
      <p>
        Yes. The quiz and the recommendations are free and always will be. We
        make money when some people click through and subscribe to a tool we
        recommended — that's optional, and the commission never changes your
        price.
      </p>
    ),
  },
  {
    q: "How are tools picked?",
    a: (
      <p>
        Every tool is hand-scored on trust, ROI, demo quality, and retention.
        When you take the quiz, we match those scores against your role, goal,
        pain point, budget, skill, and team size. Our{" "}
        <Link href="/methodology" className="underline">
          methodology page
        </Link>{" "}
        explains exactly how.
      </p>
    ),
  },
  {
    q: "Do you take money from the tools you recommend?",
    a: (
      <p>
        Some recommendation links are affiliate links, which means we earn a
        commission if you subscribe. But tools don't pay to be listed or to
        rank higher. A tool with a 50% commission and a tool with zero
        commission get the exact same scoring treatment — the payout never
        touches the formula.
      </p>
    ),
  },
  {
    q: "What if the recommendation isn't right for me?",
    a: (
      <p>
        That's fine — our goal is decision relief, not a perfect match. You can
        retake the quiz with different answers, compare tools side-by-side from
        any result card, or email us and tell us what missed. We'd rather get
        smarter than be right today.
      </p>
    ),
  },
  {
    q: "Will you spam me?",
    a: (
      <p>
        No. We only email you if you ask us to (by subscribing or saving your
        plan), and you can unsubscribe from any email with one click. We don't
        sell your email to anyone. Details in our{" "}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>
    ),
  },
  {
    q: "Do I need to be technical?",
    a: (
      <p>
        No. The quiz asks your skill level and the recommendations are tuned
        accordingly. A beginner gets tools that work on day one; an advanced
        user gets depth. Either way, we never hand you a tool that takes a
        weekend of setup.
      </p>
    ),
  },
  {
    q: "How often do you update the tools?",
    a: (
      <p>
        Regularly — the AI tools market moves fast, and so do we. When a tool
        pivots, raises prices, loses retention, or gets better, we update its
        scores and sometimes swap it out of the recommendations entirely.
      </p>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
            <div className="chip mx-auto mb-6 !bg-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Personalized AI stack in 2 minutes
            </div>
            <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink-950 md:text-6xl">
              Stop wasting money on random AI subscriptions.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600">
              Answer a few questions and get a curated AI stack — the right tools, in the right order, for your role, goals, and budget.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 md:flex-row">
              <Link href="/quiz" className="btn-brand text-base">
                Find my AI stack →
              </Link>
              <Link href="#how" className="btn-secondary text-base">
                How it works
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-500">
              <span>✓ Free</span>
              <span>✓ No signup to start</span>
              <span>✓ Curated, not algorithmic spam</span>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us about you",
                body: "Role, goals, budget, current tools. 7 quick questions.",
              },
              {
                step: "02",
                title: "Get your stack",
                body: "We score 35+ AI tools against your situation and pick the right 4–6.",
              },
              {
                step: "03",
                title: "Follow the workflow",
                body: "Setup order, what to keep, what to drop, what to use each tool for.",
              },
            ].map((b) => (
              <div key={b.step} className="card">
                <div className="text-xs font-semibold tracking-widest text-brand-500">
                  {b.step}
                </div>
                <div className="mt-3 text-xl font-semibold text-ink-900">
                  {b.title}
                </div>
                <p className="mt-2 text-ink-600">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="who" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-950">
              Built for people who actually have to ship
            </h2>
            <p className="mt-3 max-w-2xl text-ink-600">
              We don't recommend 50 tools. We recommend the 4–6 that fit you, and we tell you why.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                "Creators tired of spending more time choosing tools than making content",
                "Founders who want to ship without hiring a 10-person team",
                "Operators stitching together internal workflows that don't break",
                "Marketers who need to prove ROI on every tool they expense",
                "Sales teams who want AI on calls and in their CRM, not a dozen tabs",
                "Agencies productizing AI for clients without reinventing the wheel",
              ].map((line) => (
                <div key={line} className="card">
                  <p className="text-ink-700">{line}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/quiz" className="btn-brand text-base">
                Show me what I need →
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <div className="chip mx-auto mb-4 !bg-white">FAQ</div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-950">
              Questions people ask before the quiz
            </h2>
            <p className="mt-3 text-ink-600">
              If we missed yours,{" "}
              <a
                href="mailto:aaron@gatorcapitalpartners.com"
                className="underline"
              >
                email us
              </a>
              .
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-ink-100 bg-white p-5 open:shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-950">
                  {f.q}
                  <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition group-open:rotate-45 group-open:border-ink-950 group-open:text-ink-950">
                    +
                  </span>
                </summary>
                <div className="mt-3 text-ink-700">{f.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/quiz" className="btn-brand">
              Take the 2-minute quiz →
            </Link>
          </div>
        </section>

        <NewsletterCapture />
      </main>
      <Footer />
    </>
  );
}
