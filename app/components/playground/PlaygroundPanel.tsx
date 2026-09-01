"use client";

import { useState, type ReactNode } from "react";
import SpotifyWidget from "@/app/components/playground/SpotifyWidget";
import ShootaroundGame from "@/app/components/playground/ShootaroundGame";
import GachaWidget from "@/app/components/playground/GachaWidget";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="border-t border-dim/10 pt-3 first:border-t-0 first:pt-0">
      <div className="mb-2 flex items-center gap-1.5 text-xs text-dim">
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
        {label}
      </div>
      {children}
    </div>
  );
}

// GithubWidget is an async Server Component; a "use client" module can't import
// and render it directly, so the Server Component parent (page.tsx) renders it
// and passes the result down as a prop (RSC "interleaving" pattern).
export default function PlaygroundPanel({
  githubWidget,
}: {
  githubWidget: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed left-8 top-1/2 hidden -translate-y-1/2 xl:block">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-xs text-dim transition-colors hover:text-fg"
      >
        playground
      </button>

      {expanded && (
        <div
          className="mt-3 w-72 space-y-3 rounded-lg border border-dim/15 p-4 text-sm"
          style={{
            backgroundColor: "rgba(15, 16, 17, 0.9)",
            backgroundImage:
              "radial-gradient(rgba(244, 242, 237, 0.07) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        >
          <Row
            label="spotify"
            icon={
              <path d="M4 8c4-1.5 8-1.5 12 0M5 11c3-1 7-1 10 0M6 14c2-.6 6-.6 8 0" />
            }
          >
            <SpotifyWidget />
          </Row>

          <Row
            label="github"
            icon={
              <path d="M10 3a7 7 0 0 0-2.2 13.65c.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.8-.78-1.02-.78-1.02-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.46.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.52 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.7-1.64 3.29-3.21 3.46.25.22.48.65.48 1.31v1.94c0 .19.13.41.49.34A7 7 0 0 0 10 3Z" />
            }
          >
            {githubWidget}
          </Row>

          <Row
            label="shootaround"
            icon={
              <path d="M3 8.5h14a1 1 0 0 1 1 1.13l-.6 4.6a1.5 1.5 0 0 1-2.66.75L13.5 13h-7l-1.24 1.98a1.5 1.5 0 0 1-2.66-.75l-.6-4.6A1 1 0 0 1 3 8.5Z" />
            }
          >
            <ShootaroundGame />
          </Row>

          <Row
            label="gacha"
            icon={<path d="M10 3 4 6.5v7L10 17l6-3.5v-7L10 3Zm0 4v10M4 6.5 10 10l6-3.5" />}
          >
            <GachaWidget />
          </Row>
        </div>
      )}
    </div>
  );
}
