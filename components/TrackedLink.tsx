"use client";

import { track } from "@/lib/analytics";

type Props = {
  href: string;
  event: string;
  eventProps?: Record<string, string | number | boolean>;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  event,
  eventProps,
  className,
  external,
  children,
}: Props) {
  return (
    <a
      href={href}
      onClick={() => track(event, eventProps)}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
