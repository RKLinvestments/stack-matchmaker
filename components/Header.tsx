import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
            S
          </span>
          <span className="font-semibold tracking-tight text-foreground">Stack Matchmaker</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/#how" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="/#who" className="hover:text-foreground">
            Who it's for
          </Link>
          <Link href="/quiz" className="btn-brand !py-2 !px-4 text-sm">
            Take the quiz
          </Link>
        </nav>
        <Link href="/quiz" className="btn-brand !py-2 !px-4 text-sm md:hidden">
          Start
        </Link>
      </div>
    </header>
  );
}
