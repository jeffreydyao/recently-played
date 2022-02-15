import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

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
  const [playState, setPlayState] = useState(false);
  const [ready, setReady] = useState(false);
  const [showState, setShowState] = useState(true);
  const startTime = useRef();
  const elapsedTime = useRef();
  const remaining = useRef(0);

  const audioSrc = `${previewUrl}`;

  const controls = useAnimation(); // Initialise Framer Motion playback controls

  // Refs: https://github.com/vercel/next.js/discussions/17963
  // We can't run the Audio API on the server, so we call it on the client using a hook.
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(audioSrc) : undefined
  );

  // Check if audio is buffering

  // Auto-play on first mount
  useEffect(() => {
    setPlayState(true);
    remaining.current = 30;
  }, []);

  // Check if audio can be played without interruptions initially
  useEffect(() => {
    audio.current?.addEventListener("loadeddata", () => {
      if (audio.current?.readyState! > 2) {
        setReady(true);
      } else {
        setReady(false);
      }
    });
  });
  

  useEffect(() => {
    if (playState) {
      if (ready) {
        audio.current?.play();
        console.log("Audio ready - playing");
        console.log(`Remaining time on play is ${remaining.current}`)
        controls.start({ scaleX: 1, transition: { duration: 30, ease: "linear" } });
        // @ts-expect-error
        startTime.current = performance.now() / 1000;
      } else {
        console.log("Audio not ready - buffering ...");
        controls.stop();
      }
    } else {
      audio.current?.pause();
      // @ts-expect-error
      remaining.current = 30 - ((performance.now() / 1000) - startTime.current)
      console.log(remaining)
      controls.stop();
    }

    // Pause audio when unmounted
    return () => {
      audio.current?.pause();
    };
  });




  let progressBarWidth = document
    .getElementById("progressBarRoot")
    ?.getBoundingClientRect().width;

  return (
    <div className="fixed bottom-0 flex flex-col items-center justify-start w-full px-4 pb-8 from-stone-100/75 to-stone-100 dark:from-neutral-900/50 dark:to-neutral-900 bg-gradient-to-b">
      <div
        className="w-full py-2 transition-colors duration-[0ms] rounded-md drop-shadow-md bg-neutral-100 dark:bg-neutral-800"
        id="player"
      >
        <div className="flex flex-row items-center justify-between px-4">
          <div className="flex flex-row items-center gap-3">
            <img className="rounded w-9 h-9" src={artworkUrl} />
            <div className="flex flex-col">
              <p className="text-[0.875rem] text-neutral-900 dark:text-neutral-200">
                {title}
              </p>
              <p className="text-[0.8125rem] text-neutral-700 dark:text-neutral-400">
                {artist}
              </p>
            </div>
          </div>
          <button
            className="w-4 h-4 bg-red-400"
            onClick={() =>
              controls.start({
                scaleX: 1,
                transition : {duration: 30, ease: "linear"}
              })
            }
          />
          <button
            className="w-4 h-4 bg-blue-400"
            onClick={() => controls.stop()}
          />
          <button
            className="w-4 h-4 bg-blue-400"
            onClick={() => console.log(audio.current?.readyState)}
          />

          <PlayerControls
            isPlaying={playState}
            onPlayPauseClick={setPlayState}
            onCloseClick={setShowState}
          />
        </div>
        <div
          id="progressBarRoot"
          className="w-[98%] h-1 relative bottom-[-0.5rem] rounded-full transform -translate-x-1/2 left-1/2 bg-emerald-200 dark:bg-emerald-700 overflow-hidden"
        >
          <motion.div
            animate={controls}
            initial={{scaleX: 0, originX:0}} 
            id={"progressBarIndicator"}
          >
            <div className="w-full h-1 bg-emerald-500 dark:bg-emerald-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
