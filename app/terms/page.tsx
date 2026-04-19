import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Stack Matchmaker — the rules for using our AI stack recommendation tool.",
};

const LAST_UPDATED = "April 18, 2026";
const CONTACT_EMAIL = "aaron@gatorcapitalpartners.com";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-3xl px-6 pt-14 pb-8">
            <div className="chip mb-4 !bg-white">Legal</div>
            <h1 className="text-4xl font-semibold tracking-tight text-ink-950 md:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-ink-600">Last updated {LAST_UPDATED}.</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <div className="space-y-8 text-ink-800">
            <Block title="The short version">
              <p>
                Stack Matchmaker is a free tool that recommends AI products
                based on your answers to a short quiz. We do our best to keep
                the recommendations useful and current, but we can't guarantee
                any specific outcome. Use common sense — evaluate tools before
                paying for them, and remember that some of our links are
                affiliate links.
              </p>
            </Block>

            <Block title="Who we are">
              <p>
                Stack Matchmaker ("we," "us," or "our") is operated by Gator
                Capital Partners. By using this site you agree to these Terms.
                If you don't agree, please don't use the site.
              </p>
            </Block>

            <Block title="What Stack Matchmaker does">
              <p>
                We offer a quiz-driven recommendation engine for AI tools. The
                output is an opinion — a curated list of tools and a suggested
                rollout plan based on your inputs. We are not financial,
                legal, tax, business, or professional advisors, and nothing on
                this site constitutes professional advice.
              </p>
            </Block>

            <Block title="Acceptable use">
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Use the service in any way that violates the law.</li>
                <li>
                  Scrape, harvest, or copy our content, recommendations, or
                  database without written permission.
                </li>
                <li>
                  Attempt to interfere with the service, including overwhelming
                  our servers, bypassing rate limits, or probing for
                  vulnerabilities.
                </li>
                <li>
                  Misrepresent yourself or impersonate someone else.
                </li>
              </ul>
            </Block>

            <Block title="Accounts and email">
              <p>
                You don't need an account to use the quiz. If you provide your
                email, you're confirming that the email is yours and you want
                to receive what you asked for. You can unsubscribe any time
                using the link in our emails.
              </p>
            </Block>

            <Block title="Affiliate relationships">
              <p>
                Some links on this site are affiliate links. When you click one
                and purchase a subscription, we may earn a commission at no
                extra cost to you. Our recommendations are based on the
                scoring methodology on{" "}
                <Link href="/methodology" className="underline">
                  our methodology page
                </Link>
                , not commission size.
              </p>
            </Block>

            <Block title="Intellectual property">
              <p>
                The site, including the software, design, copy, and
                recommendation database, is owned by Gator Capital Partners and
                protected by copyright and other laws. Tool names, logos, and
                descriptions belong to their respective owners.
              </p>
              <p>
                You may share your personal results URL freely. You may not
                reproduce large portions of our content or database without
                written permission.
              </p>
            </Block>

            <Block title="Third-party tools">
              <p>
                The AI tools we recommend are operated by third parties under
                their own terms and privacy policies. We aren't responsible for
                their pricing, policies, uptime, data handling, or performance.
                Please read the terms of any tool before paying for it.
              </p>
            </Block>

            <Block title="Disclaimers">
              <p>
                The site is provided "as is" without warranties of any kind,
                express or implied, including but not limited to fitness for a
                particular purpose. We don't guarantee the recommendations will
                save you time or money, that any recommended tool will work for
                your situation, or that the site will be uninterrupted or
                error-free.
              </p>
            </Block>

            <Block title="Limitation of liability">
              <p>
                To the maximum extent permitted by law, Gator Capital Partners
                and its operators are not liable for any indirect, incidental,
                special, consequential, or punitive damages, including lost
                profits or revenue, arising out of your use of the site. Our
                total liability for any claim relating to the site is limited
                to $100.
              </p>
            </Block>

            <Block title="Changes">
              <p>
                We may update these Terms from time to time. The "last updated"
                date at the top shows when the Terms last changed. Continued
                use after a change means you accept the updated Terms.
              </p>
            </Block>

            <Block title="Governing law">
              <p>
                These Terms are governed by the laws of the United States and
                the state in which Gator Capital Partners is organized, without
                regard to conflict-of-laws principles.
              </p>
            </Block>

            <Block title="Contact">
              <p>
                Questions? Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-ink-900 underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Block>

            <div className="pt-6 text-sm text-ink-500">
              <Link href="/privacy" className="underline">
                Privacy Policy
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
      <h2 className="text-xl font-semibold tracking-tight text-ink-950">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
