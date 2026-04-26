import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted-foreground">
        <div className="grid gap-8 md:grid-cols-[1.5fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-xs font-bold text-white">
                S
              </span>
              <span className="font-semibold text-foreground">Stack Matchmaker</span>
            </div>
            <p className="mt-3 max-w-sm">
              Curated AI tool recommendations for people who'd rather ship than
              shop. Some links are affiliate links — we only recommend tools
              we'd use ourselves.
            </p>
          </div>
          <FooterCol title="Product">
            <FooterLink href="/quiz">Take the quiz</FooterLink>
            <FooterLink href="/methodology">How we recommend</FooterLink>
            <FooterLink href="/#how">How it works</FooterLink>
            <FooterLink href="/#faq">FAQ</FooterLink>
          </FooterCol>
          <FooterCol title="Company">
            <FooterLink href="/#who">Who it's for</FooterLink>
            <FooterLink href="mailto:aaron@gatorcapitalpartners.com">
              Contact
            </FooterLink>
          </FooterCol>
          <FooterCol title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterCol>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Stack Matchmaker. All rights reserved.</div>
          <div>Made for builders, not tool hoarders.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </div>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground hover:text-foreground">
        {children}
      </Link>
    </li>
  );
}
