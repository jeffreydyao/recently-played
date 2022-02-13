import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";
import { AnimatePresence, motion } from "framer-motion"


export default function Player({
  title,
  artist,
  artworkUrl,
  previewUrl,
}: {
  title: any;
  artist: any;
  artworkUrl: any;
  previewUrl: any;
}) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [showState, setShowState] = useState(true);

  // Define audioSrc for testing
  const audioSrc = `${previewUrl}`;

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

  // Auto-play on component mount - pass empty array as second argument because array never changes, and React calls useEffect when array is changed, hence will not autoplay again
  // TODO: Stop audio from playing again on fast refresh
  useEffect(() => {
    setIsPlaying(true);
  }, []);
  
  useEffect(() => {
    // If play button clicked, play audio and start timer for progress bar
    if (isPlaying) {
      audio.current?.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audio.current?.pause();
    }

    // When song changed, pause audio and clear timers
    return () => {
      audio.current?.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    // @ts-expect-error
    // TODO: Fix this
    intervalRef.current = window.setInterval(() => {
      setTrackProgress(audio.current!.currentTime);
    }, 50);
  };

  // When player unmounted, pause audio and clear timers to prevent memory leak
  useEffect(() => {
    return () => {
      audio.current?.pause();
      clearInterval(intervalRef.current);
    };
  }, [showState]);

  // Show player when showState is true (i.e. button clicked), and close when false
  return (
    <AnimatePresence>
      {showState ? (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div
          className="fixed bottom-0 py-3 mb-8 rounded-md drop-shadow-md left-10 right-10 bg-neutral-100 "
          id="player"
        >
          <div className="flex flex-row items-center justify-between px-4">
            <div className="flex flex-row items-center gap-3">
              <img className="w-8 h-8 rounded" src={artworkUrl} />
              <div className="flex flex-col">
                <p className="text-[0.875rem] text-neutral-900">{title}</p>
                <p className="text-[0.8125rem] text-neutral-700">{artist}</p>
              </div>
            </div>
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPauseClick={setIsPlaying}
              onCloseClick={setShowState}
            />
          </div>
          <Progress.Root
            value={duration}
            className="absolute bottom-0 w-[96%] h-1 transform -translate-x-1/2 bg-emerald-200 rounded-full left-1/2"
          >
            <Progress.Indicator
              className="h-full transition-all duration-[25] ease-linear rounded-full bg-emerald-500"
              style={{ width: `${currentPercentage}` }}
            />
          </Progress.Root>
        </div>
      </motion.div>
      ): (null)}:
    </AnimatePresence>
  )
}
