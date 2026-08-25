import Link from "next/link";

type ListItemProps = {
  title: string;
  description?: string;
  /** If set, the title becomes a link. */
  href?: string;
  /** Optional tertiary meta, e.g. dates — rendered dim. */
  meta?: string;
};

// A single titled entry with a muted description — the atom of most sections.
// No card, border, or shadow; emphasis comes only from color + weight.
export default function ListItem({
  title,
  description,
  href,
  meta,
}: ListItemProps) {
  const titleNode = href ? (
    <Link href={href} className="transition-colors hover:text-muted">
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-fg">{titleNode}</h3>
        {meta && <span className="shrink-0 text-sm text-dim">{meta}</span>}
      </div>
      {description && (
        <p className="mt-1 text-muted">{description}</p>
      )}
    </div>
  );
}
