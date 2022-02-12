import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";
import ReactPlayer from "react-player";
import useAudioPlayer from "./useAudioPlayer"

export default function PlayerTwo({
  title,
  artist,
  url,
}: {
  title: any;
  artist: any;
  url: any;
}) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
  
  return (
    <div className="relative py-3 rounded-md bg-neutral-100 drop-shadow-md">
      <div className="flex flex-row items-center justify-between px-4">
        <div className="flex flex-row items-center gap-3">
          <div className="w-8 h-8 rounded bg-neutral-400" /> {/* Album art */}
          <div className="flex flex-col">
            <p className="text-[0.875rem] text-neutral-900">Track title</p>
            <p className="text-[0.8125rem] text-neutral-700"> Artist</p>
          </div>
        </div>
        <PlayerControls isPlaying={playing} onPlayPauseClick={setPlaying} />
      </div>
      <Progress.Root
        value={50}
        className="absolute bottom-0 w-[96%] h-1 transform -translate-x-1/2 bg-emerald-200 rounded-full left-1/2"
      >
        <Progress.Indicator
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${50}%` }}
        />
      </Progress.Root>
    </div>
  );
}
