"use client";

import { track } from "@/lib/analytics";

export function PrintButton() {
  return (
    <button
      onClick={() => {
        track("print_clicked");
        window.print();
      }}
      className="btn-secondary !py-2 !px-4 text-sm"
    >
      Save as PDF
    </button>
  );
}
