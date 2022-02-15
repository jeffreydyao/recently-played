import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useVisibilityChange } from "use-visibility-change";

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
  const pauseTime = useRef();
  const unfocusTime = useRef();
  const focusTime = useRef();
  const remaining = useRef(0);
  const [notStarted, setNotStarted] = useState(true);

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
    console.log(`First mount - remaining time is ${remaining.current}`);
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
      if (ready && notStarted) {
        // TODO: Solve race condition: Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
        startTime.current = pauseTime.current = performance.now() / 1000;
        console.log("Audio ready - playing - notStarted - 3"); // Three
        setNotStarted(false);
      } else if (ready && progressIndicatorWidth === progressBarWidth) {
        console.log("Replaying ...!");
        controls.start({
          scaleX: 0,
          transition: { duration: 0, ease: "linear" },
        });
        setTimeout(() => {
          setNotStarted(true); // Loop back to beginning
        }, 5);
      } else if (ready) {
        audio.current?.play();
        console.log("Audio ready - playing - started - 4"); // Four
        remaining.current = 30 - (pauseTime.current - startTime.current);
        console.log(`Remaining time on play is ${remaining.current} - 2`);
        controls.start({
          scaleX: 1,
          transition: { duration: `${remaining.current}`, ease: "linear" },
        });
      } else {
        // Two
        console.log("Audio not ready - buffering ... - 2");
        controls.stop();
      }
    } else if (!ready && notStarted) {
      // One
      console.log("Not ready and not started - 1");
    } else {
      audio.current?.pause();
      controls.stop();
      pauseTime.current = performance.now() / 1000;
      console.log(ready);
      console.log(notStarted);
    }

    // Pause audio when unmounted
    return () => {
      audio.current?.pause();
    };
  });


  const { lastSeenDate } = useVisibilityChange();

  useEffect(() => {
    console.log(lastSeenDate)
    let remainingAfterRefocus =
      30 -
      audio.current?.currentTime -
      (new Date() - Date.parse(lastSeenDate)) / 1000 +
      1.2; //
    if (playState) {
      controls.start({
        scaleX: 1,
        transition: { duration: `${remainingAfterRefocus}`, ease: "linear" },
      });
    }
  }, [lastSeenDate]);
  /* 


  // CSS transitions pause if tab switched
  // Update progress bar when tab refocused
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        unfocusTime.current = performance.now() / 1000;
        console.log(`Window unfocused`);
        controls.stop();
      } else {
        focusTime.current = performance.now() / 1000;
        console.log(
          `Window focused - away for ${
            focusTime.current - unfocusTime.current
          } - 1`
        );
        remaining.current =
          30 -
          (pauseTime.current - startTime.current) -
          (focusTime.current - unfocusTime.current);
        console.log("Fired!")
        console.log(remaining.current)
        controls.start({
          scaleX: 1,
          transition: { duration: `${remaining.current}`, ease: "linear" },
        });
      }
    });
  });
 */
  let progressBarWidth = document
    .getElementById("progressBarRoot")
    ?.getBoundingClientRect().width;

  let progressIndicatorWidth = document
    .getElementById("progressBarIndicator")
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
            initial={{ scaleX: 0, originX: 0 }}
            id={"progressBarIndicator"}
          >
            <div className="w-full h-1 bg-emerald-500 dark:bg-emerald-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
