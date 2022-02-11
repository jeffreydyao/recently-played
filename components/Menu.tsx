// @ts-nocheck
// TODO: Fix error on line 91: Object is of type unknown

import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DotsThree, SpotifyLogo } from 'phosphor-react'
import { format } from 'date-fns'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export default function Menu({playedAt, id, spotifyUrl} : {playedAt: any, id: any, spotifyUrl: any}) {
  // if playedAt = undefined, return "Currently playing"
  // if playedAt anything else, format date and return with "Played at"

  var timestamp = (!playedAt) ? "Playing now" : "Played at " + format(new Date(playedAt), 'h:mm a, d MMM')

  const { data, error } = useSWR('/api/search', fetcher);

  if (error) return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsThree className="w-6 h-6" weight="fill" aria-label="Listen to the full version of this song"/>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="flex flex-col items-start gap-3 py-2 rounded-md bg-stone-50 drop-shadow-md">
        <DropdownMenu.Item>
          <Link href={`${spotifyUrl}`} passHref>
            <a className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
              Listen on Spotify
              <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-200"/>
        <DropdownMenu.Item className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
          Listen on Apple Music (ERROR)
          <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-400"/>
        <DropdownMenu.Label className="flex flex-row items-center justify-between w-56 px-4 text-sm text-stone-500">
          {timestamp}
        </DropdownMenu.Label>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
  if (!data) return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsThree className="w-6 h-6" weight="fill" aria-label="Listen to the full version of this song"/>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="flex flex-col items-start gap-3 py-2 rounded-md bg-stone-50 drop-shadow-md">
        <DropdownMenu.Item>
          <Link href={`${spotifyUrl}`} passHref>
            <a className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
              Listen on Spotify
              <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-200"/>
        <DropdownMenu.Item className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
          Listen on Apple Music (...)
          <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-400"/>
        <DropdownMenu.Label className="flex flex-row items-center justify-between w-56 px-4 text-sm text-stone-500">
          {timestamp}
        </DropdownMenu.Label>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsThree className="w-6 h-6" weight="fill" aria-label="Listen to the full version of this song"/>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="flex flex-col items-start gap-3 py-2 rounded-md bg-stone-50 drop-shadow-md">
        <DropdownMenu.Item>
          <Link href={`${spotifyUrl}`} passHref>
            <a className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
              Listen on Spotify
              <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-200"/>
        <DropdownMenu.Item>
          <Link href={`${data.appleMusicTracks[id]}`} passHref>
            <a className="flex flex-row items-center justify-between w-56 px-4 text-stone-900">
              Listen on Apple Music
              <SpotifyLogo className="w-6 h-6 text-emerald-600" weight="fill" />
            </a>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="w-full border-t border-stone-400"/>
        <DropdownMenu.Label className="flex flex-row items-center justify-between w-56 px-4 text-sm text-stone-500">
          {timestamp}
        </DropdownMenu.Label>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

}
