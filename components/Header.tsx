import React from "react";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    // TODO: Move padding into parent DOM
    <header className="flex justify-between w-full min-h-full px-6">
      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">Recently Played</h1>
      <div className="flex flex-row items-center gap-4">
        <Avatar />
        <ThemeToggle />
      </div>
    </header>
  )
}