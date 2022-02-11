import { CircleNotch, SmileySad, Play } from "phosphor-react";
import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Menu from "./Menu";

import fetcher from "../lib/fetcher";

export default function Tracks() {
  let track;
  let index;

  const { data, error } = useSWR("/api/tracks", fetcher);

  if (error)
    return (
      <div className="flex flex-col items-center">
        <SmileySad className="text-neutral-800 w-9 h-9" />
        <p className="pt-2 text-sm text-neutral-800 text-medium">
          Failed to load tracks.
        </p>
      </div>
    );

  // TODO: Perhaps add progress bar for better communication?
  // https://github.com/vercel/swr/issues/159
  if (!data)
    return (
      <div className="flex flex-col items-center">
        <CircleNotch className="text-neutral-600 w-9 h-9 animate-spin" />
        <p className="pt-2 text-sm text-neutral-600 text-medium">Loading ...</p>
      </div>
    );

  // @ts-expect-error
  return data.tracks.map((track: any, index) => (
    <div
      key={track.isrc}
      className="flex flex-row items-center justify-between"
    >
      <div className="flex flex-row gap-3">
        <img src={track.artwork_url} className="w-10 h-10 rounded" alt={`Album art for ${track.title} by ${track.artist}`}/>
        <div className="flex flex-col">
          <h2 className="text-neutral-900">{track.title}</h2>
          <h3 className="text-sm text-neutral-700">{track.artist}</h3>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        {/* TODO: Implement audio player */}
        <Link href={track.preview_url}>
          <a>
            <Play weight="fill" className="w-4 h-4" />
          </a>
        </Link>
        <Menu
          playedAt={track.played_at}
          spotifyUrl={track.spotify_url}
          id={index}
        />
      </div>
    </div>
  ));
}
