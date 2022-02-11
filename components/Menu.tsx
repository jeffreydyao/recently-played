// @ts-nocheck
// TODO: Fix error on line 91: Object is of type unknown

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsThree } from "phosphor-react";
import { format } from "date-fns";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { SpotifyLogo, AppleMusicLogo } from "../components/Icons";

export default function Menu({
  playedAt,
  id,
  spotifyUrl,
}: {
  playedAt: any;
  id: any;
  spotifyUrl: any;
}) {
  // if playedAt = undefined, return "Currently playing"
  // if playedAt anything else, format date and return with "Played at"

  var timestamp = !playedAt
    ? "Playing now"
    : "Played at " + format(new Date(playedAt), "h:mm a, d MMM");

  const { data, error } = useSWR("/api/search", fetcher);
  const [open, setOpen] = React.useState(false);
  const duration = 0.2;
  const exitDuration = duration / 2;

  if (error)
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none">
          <DotsThree
            className="w-6 h-6"
            weight="fill"
            aria-label="Listen to the full version of this song"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="flex flex-col items-start gap-3 py-3 rounded-md bg-stone-50 drop-shadow-md"
          sideOffset={9}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenu.Item>
            <Link href={`${spotifyUrl}`} passHref>
              <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-500">
                Listen on Spotify
                <SpotifyLogo />
              </a>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-200" />
          <DropdownMenu.Item className="flex flex-row items-center justify-between w-64 px-4 text-stone-500">
            Listen on Apple Music
            <div className="opacity-40">
              <AppleMusicLogo />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-400" />
          <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 text-sm text-stone-500">
            {timestamp}
          </DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  if (!data)
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none">
          <DotsThree
            className="w-6 h-6"
            weight="fill"
            aria-label="Listen to the full version of this song"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="flex flex-col items-start gap-3 py-3 rounded-md bg-stone-50 drop-shadow-md"
          sideOffset={9}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenu.Item>
            <Link href={`${spotifyUrl}`} passHref>
              <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-900">
                Listen on Spotify
                <SpotifyLogo />
              </a>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-200" />
          <DropdownMenu.Item className="flex flex-row items-center justify-between w-64 px-4 text-stone-500">
            Searching Apple Music ...
            <div className="opacity-40">
              <AppleMusicLogo />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-400" />
          <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 text-sm text-stone-500">
            {timestamp}
          </DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none">
        <DotsThree
          className="w-6 h-6"
          weight="fill"
          aria-label="Listen to the full version of this song"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="flex flex-col items-start gap-3 py-3 rounded-md bg-stone-50 drop-shadow-md"
        sideOffset={9}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DropdownMenu.Item>
          <Link href={`${spotifyUrl}`} passHref>
            <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-900">
              Listen on Spotify
              <SpotifyLogo />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-200" />
        <DropdownMenu.Item>
          <Link href={data.appleMusicTracks[id]} passHref>
            <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-900">
              Listen on Apple Music
              <AppleMusicLogo />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-400" />
        <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 text-sm text-stone-500">
          {timestamp}
        </DropdownMenu.Label>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
