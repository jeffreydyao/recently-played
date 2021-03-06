import { Pause, Play, X } from "phosphor-react";
import React from "react";

export default function PlayerControls({
  isPlaying,
  onPlayPauseClick,
  onCloseClick,
}: {
  isPlaying: any;
  onPlayPauseClick: any;
  onCloseClick: any;
}) {

  return (
    <div className="flex flex-row items-center gap-3">
    {isPlaying ? (
      <button aria-label="Pause" onClick={() => onPlayPauseClick(false)}>
        <Pause weight="fill" className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />
      </button>
    ) : (
      <button aria-label="Play" onClick={() => onPlayPauseClick(true)}>
        <Play weight="fill" className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />
      </button>
    )}

    <button aria-label="Close" onClick={() => onCloseClick(false)}>
      <X weight="fill" className="w-6 h-6 text-neutral-900 dark:text-neutral-300" />
    </button>
  </div>
  )

}
