"use client";

import { usePlaygroundState } from "@/app/components/playground/PlaygroundState";

export default function GachaWidget() {
  const { hasCleanShot, spins, unlockedIds, totalUnlocks, roll } =
    usePlaygroundState();

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-fg">gacha</span>
          <span className="rounded-full border border-dim/40 px-1.5 py-0.5 text-[10px] text-dim">
            beta
          </span>
        </span>
        <span className="text-dim">
          spins {String(spins).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-1 flex items-baseline justify-between">
        <span className="text-dim">
          {hasCleanShot ? "ready to roll" : "make a clean shot first"}
        </span>
        <button
          type="button"
          onClick={roll}
          disabled={!hasCleanShot}
          className="text-fg transition-colors hover:text-muted disabled:cursor-not-allowed disabled:text-dim/50 disabled:hover:text-dim/50"
        >
          roll
        </button>
      </div>
      <p className="mt-1 text-xs text-dim">
        see unlocks {unlockedIds.length}/{totalUnlocks}
      </p>
    </div>
  );
}
