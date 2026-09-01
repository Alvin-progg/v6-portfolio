import type { ReactNode } from "react";

type DockItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const items: DockItem[] = [
  {
    label: "home",
    href: "#",
    icon: (
      <path d="M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3.5v-4.5h-5V17H4a1 1 0 0 1-1-1V9.5Z" />
    ),
  },
  {
    label: "code",
    href: "#",
    icon: <path d="M7 6 2 10l5 4M13 6l5 4-5 4M11 4 9 16" />,
  },
  {
    label: "archive",
    href: "#",
    icon: (
      <path d="M3 5h14v3H3V5Zm1 3h12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm4 3h4" />
    ),
  },
  {
    label: "theme",
    href: "#",
    icon: (
      <path d="M10 3v2M10 15v2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M3 10h2M15 10h2M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4M10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    ),
  },
];

export default function FloatingDock() {
  return (
    <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-dim/20 bg-bg/70 px-3 py-2 backdrop-blur-md">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="rounded-full p-2 text-dim transition-colors hover:text-fg"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {item.icon}
          </svg>
        </a>
      ))}
    </div>
  );
}
