import { Moon, SpotifyLogo } from "phosphor-react";
import React from "react";
import Avatar from "./Avatar";

export default function Header() {
  return (
    // TODO: Move padding into parent DOM
    <header className="flex justify-between w-full min-h-full px-6 pt-9">
      <h1 className="text-xl font-bold text-neutral-900">Recently Played</h1>
      <div className="flex flex-row items-center gap-4">
        <Avatar />
        <Moon size={24} weight="regular" />
      </div>
    </header>
  )
}