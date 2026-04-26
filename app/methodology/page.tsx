import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "How we recommend",
  description:
    "How Stack Matchmaker chooses which AI tools to recommend — our scoring methodology, what we look for, and what we refuse to promote.",
};

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-3xl px-6 pt-14 pb-8">
            <div className="chip mb-4">Methodology</div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              How we recommend
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              No algorithm magic. No vendor pay-to-play. Here's exactly how we
              decide which tools show up in your stack.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <div className="space-y-10 text-foreground">
            <Block title="Every tool is scored on four things">
              <p>
                Before a tool ever shows up in a recommendation, we hand-score
                it on four dimensions from 0–10. These scores are deliberately
                subjective, because the internet already has plenty of
                algorithmic review aggregators and they're mostly noise.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ScoreCard
                  title="Trust"
                  body="Is the company credible? Funded, staffed, not shutting down next quarter? Do they do right by their users when things break?"
                />
                <ScoreCard
                  title="ROI"
                  body="Does this tool actually save real time or make real money for people in the target role, within 30 days of adopting it?"
                />
                <ScoreCard
                  title="Demo score"
                  body="Is the 'aha' moment obvious inside 5 minutes? Tools that take an hour to demo well have a higher drop-off rate."
                />
                <ScoreCard
                  title="Retention"
                  body="Do people still use this 90 days in, or does it end up in the subscription graveyard? We care about keep-rate, not install-rate."
                />
              </div>
            </Block>

            <Block title="How we pick your stack from those scores">
              <p>
                When you take the quiz, we score every tool in our database
                against your specific situation, layering five signals on top
                of the base scores:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Role fit (+25).</strong> Is this tool built for what
                  you actually do?
                </li>
                <li>
                  <strong>Goal fit (+25).</strong> Does it directly help you
                  achieve the outcome you picked?
                </li>
                <li>
                  <strong>Pain fit (+12).</strong> Does it target the specific
                  friction you said was biggest?
                </li>
                <li>
                  <strong>Budget fit (+10 / −30).</strong> Hard filter. If it's
                  out of your stated budget, we drop it.
                </li>
                <li>
                  <strong>Skill fit.</strong> A beginner doesn't get handed an
                  enterprise automation platform on day one.
                </li>
              </ul>
              <p>
                Then we pick the top-scoring tool per category (never two tools
                that do the same thing), and return the 4–6 tools that together
                form a complete workflow for your goal.
              </p>
            </Block>

            <Block title="What we refuse to do">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Pay-to-play.</strong> We don't accept payment to add,
                  promote, or rank a tool. Ever.
                </li>
                <li>
                  <strong>Weight recommendations by affiliate payout.</strong>{" "}
                  Some tools have 30% recurring commissions; some have zero.
                  The payout never shows up in the scoring formula.
                </li>
                <li>
                  <strong>Recommend tools we wouldn't use ourselves.</strong>{" "}
                  Plenty of tools have a big affiliate program and a bad
                  product. We leave those out.
                </li>
                <li>
                  <strong>Promote hype-cycle tools.</strong> If something just
                  launched and hasn't proven retention, it doesn't get a high
                  retention score yet. We'd rather be a few months late on a
                  great tool than early on a burning one.
                </li>
              </ul>
            </Block>

            <Block title="How we keep the database fresh">
              <p>
                The AI tools market moves. We update the catalog regularly
                based on:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  New tools we've actually tested or seen working well in
                  customer workflows
                </li>
                <li>
                  Price changes, product pivots, or retention drops that move
                  an existing tool's scores
                </li>
                <li>
                  User feedback — if a recommended tool doesn't stick, we want
                  to know
                </li>
                <li>
                  Tools being sunset, acquired, or changing ownership in ways
                  that affect reliability
                </li>
              </ul>
            </Block>

            <Block title="Why you should trust this">
              <p>
                You shouldn't. Not yet. Trust us as far as the first
                recommendation you try. If the stack we suggest makes sense and
                the first tool delivers value in your first week, keep going.
                If not, our recommendations aren't for you, and that's fair.
                We'd rather you bounce than pay for something that doesn't
                stick.
              </p>
            </Block>

            <div className="pt-6">
              <Link href="/quiz" className="btn-brand">
                Take the quiz →
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
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

function ScoreCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </div>
      <p className="mt-2 text-foreground">{body}</p>
    </div>
  );
}
