import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type NowPlaying =
  | { playing: false }
  | {
      playing: true;
      title: string;
      artist: string;
      albumArt: string | null;
      url: string;
    };

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return typeof data.access_token === "string" ? data.access_token : null;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json<NowPlaying>({ playing: false });
    }

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (res.status === 204 || !res.ok) {
      return NextResponse.json<NowPlaying>({ playing: false });
    }

    const data = await res.json();
    const item = data?.item;
    if (!item) {
      return NextResponse.json<NowPlaying>({ playing: false });
    }

    return NextResponse.json<NowPlaying>({
      playing: true,
      title: item.name ?? "",
      artist: Array.isArray(item.artists)
        ? item.artists.map((a: { name: string }) => a.name).join(", ")
        : "",
      albumArt: item.album?.images?.[0]?.url ?? null,
      url: item.external_urls?.spotify ?? "",
    });
  } catch {
    return NextResponse.json<NowPlaying>({ playing: false });
  }
}
