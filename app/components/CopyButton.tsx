"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — fail silently, no browser dialog.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="text-dim transition-colors hover:text-muted"
    >
      {copied ? "copied" : "⧉"}
    </button>
  );
}
