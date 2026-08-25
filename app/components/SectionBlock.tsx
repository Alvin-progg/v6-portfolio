import type { ReactNode } from "react";
import Link from "next/link";

type SectionBlockProps = {
  /** Lowercase section label, e.g. "projects" (kept lowercase by design). */
  label: string;
  /** Optional right-aligned "view all" link target. */
  viewAllHref?: string;
  children: ReactNode;
};

// The repeating section wrapper: a lowercase label, an optional "view all"
// link, and a spaced list of children. Sections are separated by whitespace
// only — no rules, no backgrounds (see DESIGN.md).
export default function SectionBlock({
  label,
  viewAllHref,
  children,
}: SectionBlockProps) {
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold text-fg">{label}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            view all
          </Link>
        )}
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
