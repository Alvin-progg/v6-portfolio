"use client";

import { useEffect, useState } from "react";

type NowPlaying =
  | { playing: false }
  | {
      playing: true;
      title: string;
      artist: string;
      albumArt: string | null;
      url: string;
    };

export default function SpotifyWidget() {
  const [state, setState] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data: NowPlaying = await res.json();
        if (!cancelled) setState(data);
      } catch {
        if (!cancelled) setState({ playing: false });
      }
    }

    poll();
    const interval = setInterval(poll, 20_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!state || !state.playing) {
    return <p className="text-dim">spotify quiet</p>;
  }

  return (
    <a
      href={state.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 transition-colors hover:text-muted"
    >
      {state.albumArt ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={state.albumArt}
          alt=""
          width={36}
          height={36}
          className="rounded"
        />
      ) : (
        <div className="h-9 w-9 shrink-0 rounded bg-dim/20" />
      )}
      <span>
        <span className="block font-semibold text-fg">{state.title}</span>
        <span className="block text-sm text-dim">{state.artist}</span>
      </span>
    </a>
  );
}
