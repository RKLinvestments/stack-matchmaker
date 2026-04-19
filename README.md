# Stack Matchmaker

Find your AI stack in 2 minutes — the right tools, in the right order, for your role, goals, and budget.

**Live:** [stackmatchmaker.app](https://stackmatchmaker.app)
**Source:** [github.com/RKLinvestments/ai-match-maker](https://github.com/RKLinvestments/ai-match-maker)

---

## What this is

A curated quiz-driven recommender for AI tools. Instead of giving you a ranked list of 50 tools and walking away, it picks the 4–6 that fit your specific situation, orders them for rollout, and hands you a 30/60/90-day plan.

## Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript** end-to-end
- **Tailwind CSS** for styling
- **Claude API** (Anthropic) for the personalized rollout plan, with a template fallback
- **Resend** for lead-capture emails
- **PostHog** or **Plausible** for analytics (optional, driven by env vars)
- Deployed on **Vercel**

## How the recommendation works

Every tool in `data/tools.json` is hand-scored on four dimensions (0–10 each): **trust**, **ROI**, **demo quality**, and **retention**. When a user completes the quiz, the engine in `lib/recommend.ts` layers five more signals on top — role fit, goal fit, pain fit, budget fit (hard filter), and skill fit — then picks the top-scoring tool per category so the final 4–6 tools form a complete workflow rather than five chatbots.

See the full methodology live at [stackmatchmaker.app/methodology](https://stackmatchmaker.app/methodology).

## Local development

```bash
npm install
cp .env.example .env.local  # fill in keys (all optional except Anthropic for the AI narrative)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Var                             | Required | Purpose                                                   |
| ------------------------------- | -------- | --------------------------------------------------------- |
| `ANTHROPIC_API_KEY`             | Optional | Powers the personalized 30/60/90-day rollout plan. Without it, the app falls back to a template narrative. |
| `RESEND_API_KEY`                | Optional | Sends lead-capture emails. Without it, leads are logged to the server console. |
| `LEAD_TO_EMAIL`                 | Optional | Where leads are delivered.                                |
| `LEAD_FROM_EMAIL`               | Optional | Sender address for Resend.                                |
| `NEXT_PUBLIC_POSTHOG_KEY`       | Optional | PostHog analytics. Mutually exclusive with Plausible.     |
| `NEXT_PUBLIC_POSTHOG_HOST`      | Optional | PostHog host. Defaults to `us.i.posthog.com`.             |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`  | Optional | Plausible analytics. Mutually exclusive with PostHog.     |

## Project structure

```
app/               Next.js App Router pages
  api/             API routes (lead capture, narrative generation)
  compare/         Side-by-side tool comparison
  methodology/     How we score and pick tools
  privacy/         Privacy policy
  quiz/            The 7-step quiz
  results/         Personalized stack output
  terms/           Terms of service
components/        React components
data/
  tools.json       The curated tool database (the heart of the app)
lib/               Business logic, types, analytics, narrative, scoring
public/            Icons, OG image, manifest
```

## Contributing

Right now this is a product, not a community project. If you have feedback or spot a bug, open an issue — we read every one.

If you want a tool added to the catalog, open an issue with the name, URL, and why it should be included.

## License

All rights reserved © Gator Capital Partners. The source is public for transparency; the branding, trademarks, tool database, and scoring methodology are not open source.
