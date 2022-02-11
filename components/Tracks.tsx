import { CircleNotch, SmileySad } from "phosphor-react";
import React from "react";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

export default function Tracks() {
  const { data, error } = useSWR("/api/tracks", fetcher);

  if (error) return <div className="flex flex-col items-center">
    <SmileySad className="text-neutral-800 w-9 h-9" />
    <p className="pt-2 text-sm text-neutral-800 text-medium">
      Failed to load tracks.
    </p>
  </div>;

  // TODO: Perhaps add progress bar for better communication?
  // https://github.com/vercel/swr/issues/159
  if (!data) return <div className="flex flex-col items-center">
    <CircleNotch className="text-neutral-600 w-9 h-9 animate-spin" />
    <p className="pt-2 text-sm text-neutral-600 text-medium">Loading ...</p>
  </div>;

  return data.tracks.map((track: any) => (
    <div key={track.isrc} className="flex flex-row w-screen gap-3 px-6">
      <img src={track.artwork_url} className="w-10 h-10 rounded"/>
      <div className="flex flex-col">
        <h2 className="text-neutral-900">{track.title}</h2>
        <h3 className="text-sm text-neutral-700">{track.artist}</h3>
      </div>
    </div>
  ));
}
