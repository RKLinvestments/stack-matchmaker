"use client";

import { useRouter } from "next/navigation";

export function BackLink() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-ink-500 hover:text-ink-900"
    >
      ← Back
    </button>
  );
}
