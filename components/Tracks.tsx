import * as Portal from "@radix-ui/react-portal";
import Image from "next/image";
import { CircleNotch, Play, SmileySad, Equalizer, Pause } from "phosphor-react";
import React from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Menu from "./Menu";
import Player from "./Player";


export default function Tracks() {
  let track;
  let index;

  const [loadPlayer, setLoadPlayer] = React.useState(null);
  const { data, error } = useSWR("/api/tracks", fetcher);

  if (error)
    return (
      <div className="flex flex-col items-center">
        <SmileySad className="text-neutral-800 dark:text-neutral-100 w-9 h-9" />
        <p className="pt-2 text-sm text-neutral-800 dark:text-neutral-100 text-medium">
          Failed to load tracks.
        </p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center">
        <CircleNotch className="text-neutral-600 dark:text-neutral-200 w-9 h-9 animate-spin" />
        <p className="pt-2 text-sm text-neutral-600 dark:text-neutral-200 text-medium">Loading ...</p>
      </div>
    );

  // @ts-expect-error
  return data.tracks.map((track: any, index) => (
    <div
      key={track.isrc}
      className="flex flex-row items-center justify-between"
    >
      <div className="flex flex-row items-center gap-3">
        <div className="relative flex flex-none w-10 h-10 rounded max-h-10 max-w-10" >
          <Image
            src={track.artwork_url}
            layout="fill"
            objectFit="contain"
            className="rounded"
            alt={`Album art for ${track.title} by ${track.artist}`}
          />
        </div>
        <div className="flex flex-col pr-3 md:pr-0">
          {track.isPlaying !== undefined ? (
            <div className="flex flex-row items-center justify-start gap-[0.375rem]">
              <div className="flex flex-none">
               <Equalizer weight="bold" className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="leading-6 text-neutral-900 dark:text-neutral-200">{track.title}</h2>
            </div>
          ) : (
            <h2 className="text-neutral-900 dark:text-neutral-200">{track.title}</h2>
          )}
          <h3 className="text-sm text-neutral-700 dark:text-neutral-400">{track.artist}</h3>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() =>
            setLoadPlayer((loadPlayer) => (loadPlayer === index ? null : index))
          }
          className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-stone-200 focus:bg-stone-200 focus:ring focus:outline-none dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:radix-state-open:bg-stone-700"
          aria-label="Play preview"
        >
          <Play weight="fill" className="w-4 h-4 text-neutral-900 dark:text-neutral-300" />
        </button>
        {loadPlayer === index && (
          <Portal.Root>
            <Player
              title={track.title}
              artist={track.artist}
              artworkUrl={track.artwork_url}
              previewUrl={track.preview_url}
            />
          </Portal.Root>
        )}
        <Menu
          playedAt={track.played_at}
          spotifyUrl={track.spotify_url}
          id={index}
        />
      </div>
    </div>
  ));
}
