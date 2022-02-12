import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";

export default function Player({
  title,
  artist,
  url,
}: {
  title: any;
  artist: any;
  url: any;
}) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // Define audioSrc for testing
  const audioSrc =
    "https://p.scdn.co/mp3-preview/ea052b0bdb97320821f4fb3d17d09f97a8b55cab?cid=fd8c093872a04aad875e32aa77c989dd";

  // Refs
  // https://github.com/vercel/next.js/discussions/17963
  // We can't run the Audio API on the server, so we call it on the client using a hook.
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(audioSrc) : undefined
  );

  const intervalRef = useRef();
  const isReady = useRef(false);
  
  // Destructure for conciseness


  const { duration } = audio.current || {};

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audio.current.pause();
    }
  }, [isPlaying]);


  // Why does this run at the interval defined in startTimer?
 /*  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audio.current.pause();
      clearInterval(intervalRef.current);
    };
  }); */

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audio.current?.currentTime);
    }, [1000]);

  };

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
        <PlayerControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
      </div>
      <Progress.Root
        value={duration}
        className="absolute bottom-0 w-[96%] h-1 transform -translate-x-1/2 bg-emerald-200 rounded-full left-1/2"
      >
        <Progress.Indicator
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${duration}%` }}
        />
      </Progress.Root>
    </div>
  );
}
