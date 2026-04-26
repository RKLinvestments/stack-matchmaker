"use client";

import { useRouter } from "next/navigation";

export function BackLink() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-muted-foreground hover:text-foreground"
    >
      ← Back
    </button>
  );
}
