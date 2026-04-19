"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export function ShareBar({ path }: { path: string }) {
  const [url, setUrl] = useState(path);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${path}`);
    }
  }, [path]);

  function copy() {
    track("share_clicked");
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <button onClick={copy} className="btn-secondary !py-2 !px-4 text-sm">
      {copied ? "Copied ✓" : "Copy share link"}
    </button>
  );
}
