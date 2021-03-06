// @ts-nocheck
// TODO: Type line 140 safely (href, object is of type unknown) before removing no-check

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import Link from "next/link";
import { LinkProps } from "next/link";
import { DotsThree } from "phosphor-react";
import React from "react";
import useSWR from "swr";
import { AppleMusicLogo, SpotifyLogo } from "../components/Icons";
import fetcher from "../lib/fetcher";

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
        <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:radix-state-open:bg-stone-800">
          <DotsThree
            className="w-6 h-6 text-neutral-900 dark:text-neutral-300"
            weight="fill"
            aria-label="Listen to the full version of this song"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="flex flex-col items-start gap-3 py-3 rounded-lg bg-stone-50 dark:bg-neutral-800 drop-shadow-md"
          sideOffset={9}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenu.Item>
            <Link href={`${spotifyUrl}`} passHref>
              <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-900 dark:text-neutral-200">
                Listen on Spotify
                <SpotifyLogo />
              </a>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-200 dark:border-neutral-700" />
          <DropdownMenu.Item className="flex flex-row items-center justify-between w-64 px-4 cursor-default text-stone-500 dark:text-neutral-400">
            Listen on Apple Music
            <div className="opacity-40">
              <AppleMusicLogo />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-400 dark:border-neutral-600" />
          <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 text-sm text-stone-500 dark:text-neutral-200">
            {timestamp}
          </DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  if (!data)
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:radix-state-open:bg-stone-700">
          <DotsThree
            className="w-6 h-6 text-neutral-900 dark:text-neutral-300"
            weight="fill"
            aria-label="Listen to the full version of this song"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="flex flex-col items-start gap-3 py-3 rounded-lg bg-stone-50 drop-shadow-md dark:bg-neutral-800"
          sideOffset={9}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenu.Item>
            <Link href={`${spotifyUrl}`} passHref>
              <a className="flex flex-row items-center justify-between w-64 px-4 text-stone-900 dark:text-neutral-200">
                Listen on Spotify
                <SpotifyLogo />
              </a>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-200 dark:border-neutral-700" />
          <DropdownMenu.Item className="flex flex-row items-center justify-between w-64 px-4 cursor-default text-stone-500 dark:text-neutral-300">
            Searching Apple Music ...
            <div className="opacity-40">
              <AppleMusicLogo />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="w-full border-t border-stone-400 dark:border-neutral-600" />
          <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 text-sm text-stone-500 dark:text-neutral-200">
            {timestamp}
          </DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-md hover:transition-all hover:bg-stone-200 focus:bg-stone-200 focus:ring radix-state-open:bg-stone-300 focus:outline-none dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:radix-state-open:bg-stone-700">
        <DotsThree
          className="w-6 h-6 text-neutral-900 dark:text-neutral-300"
          weight="fill"
          aria-label="Listen to the full version of this song"
        />
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content
        className="flex flex-col items-start rounded-lg bg-stone-50 drop-shadow-md dark:bg-neutral-800"
        sideOffset={9}
        onCloseAutoFocus={(event) => event.preventDefault()}
        loop={true} // Return to start of menu after last item reached with keyboard nav
      >
        <DropdownMenu.Item className="hover:outline-none focus:outline-none focus:bg-stone-200 dark:focus:bg-stone-900 focus:rounded-t">
          <Link href={`${spotifyUrl}`} passHref>
            <a className="flex flex-row items-center justify-between w-64 px-4 py-3 rounded-t-md text-stone-900 dark:text-neutral-200">
              Listen on Spotify
              <SpotifyLogo />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-200 dark:border-neutral-700" />
        <DropdownMenu.Item className="hover:outline-none focus:outline-none focus:bg-stone-200 dark:focus:bg-stone-900">
          <Link href={data.appleMusicTracks[id]} passHref>
            <a className="flex flex-row items-center justify-between w-64 px-4 py-3 text-stone-900 dark:text-neutral-200">
              Listen on Apple Music
              <AppleMusicLogo />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-400 dark:border-neutral-600" />
        <DropdownMenu.Label className="flex flex-row items-center justify-between w-64 px-4 py-3 text-sm text-stone-500 dark:text-neutral-400">
          {timestamp}
        </DropdownMenu.Label>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
