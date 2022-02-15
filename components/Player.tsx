import {
  animate, AnimatePresence,
  motion,
  useAnimation, useMotionValue
} from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useVisibilityChange } from 'use-visibility-change';
import PlayerControls from './PlayerControls';

export default function Player({
  title,
  artist,
  artworkUrl,
  previewUrl,
}: {
  title: string;
  artist: string;
  artworkUrl: string;
  previewUrl: string;
}) {
  // State
  const [playState, setPlayState] = useState(false);
  const ready = useRef(false);
  const [showState, setShowState] = useState(true);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);
  const remaining = useRef<number>(0);
  const [notStarted, setNotStarted] = useState(true);

  const x = useMotionValue(0);

  const audioSrc = previewUrl;

  const controls = useAnimation(); // Initialise Framer Motion playback controls

  // Refs: https://github.com/vercel/next.js/discussions/17963
  // We can't run the Audio API on the server, so we call it on the client using a hook.
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(audioSrc) : undefined,
  );

  // Check if audio is buffering

  // Auto-play on first mount
  useEffect(() => {
    setPlayState(true);
    remaining.current = 30;
    return () => {
      remaining.current = null as any;
      setPlayState(false);
    };
  }, []);

  // Check if audio is ready to play
  function readyCheck() {
    if (audio.current?.readyState! > 2) {
      ready.current = true;
    } else {
      ready.current = false;
    }
  }

  // Check if audio can be played without interruptions initially
  useEffect(() => {
    audio.current?.addEventListener('loadeddata', readyCheck);

    return () => {
      audio.current?.removeEventListener('loadeddata', readyCheck);
    };
  }, [playState]);

  useEffect(() => {
    if (playState) {
      if (ready && notStarted) {
        // TODO: Solve race condition: Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
        startTime.current = pauseTime.current = performance.now() / 1000;
        console.log('Audio ready - playing - notStarted - 3'); // Three
        setNotStarted(false);
      } else if (ready && progressIndicatorWidth === progressBarWidth) {
        controls.start({
          scaleX: 0,
          transition: { duration: 0, ease: 'linear' },
        });
        setTimeout(() => {
          setNotStarted(true); // Loop back to beginning
        }, 5);
      } else if (ready) {
        audio.current?.play();
        console.log('Audio ready - playing - started - 4'); // Four
        remaining.current = 30 - (pauseTime.current - startTime.current);
        console.log(`Remaining time on play is ${remaining.current} - 2`);
      } else {
        // Two
        console.log('Audio not ready - buffering ... - 2');
        controls.stop();
      }
    } else if (!ready && notStarted) {
      // One
      console.log('Not ready and not started - 1');
    } else {
      audio.current?.pause();
      controls.stop();
      pauseTime.current = performance.now() / 1000;
    }

    // Pause audio when unmounted
    return () => {
      audio.current?.pause();
    };
  });

  const { lastSeenDate }: any = useVisibilityChange();

  useEffect(() => {
    console.log(Date.parse(lastSeenDate));
    let remainingAfterRefocus =
      30 -
      audio.current?.currentTime! -
      (new Date().valueOf() - Date.parse(lastSeenDate)) / 1000; // use-visiblity-change returns date as format incompatible with Safari - parse fixes this
    if (playState) {
      controls.start({
        scaleX: 1,
        transition: { duration: `${remainingAfterRefocus}`, ease: 'linear' },
      });
    }

    return () => {
      remainingAfterRefocus = null as any;
    };
  }, [lastSeenDate]);

  // Pause song when player unmounted
  useEffect(() => {
    if (!showState) {
      audio.current?.pause();
    }

    return () => {
      setShowState(false);
    };
  }, [showState]);

  let progressBarWidth = document
    .getElementById('progressBarRoot')
    ?.getBoundingClientRect().width;

  let progressIndicatorWidth = document
    .getElementById('progressBarIndicator')
    ?.getBoundingClientRect().width;

  return (
    <AnimatePresence>
      {showState ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="fixed bottom-0 flex flex-col items-center justify-start w-full px-4 pb-8 from-stone-100/75 to-stone-100 dark:from-neutral-900/50 dark:to-neutral-900 bg-gradient-to-b">
            <div
              className="w-full py-2 transition-colors duration-[0ms] rounded-md drop-shadow-md bg-neutral-100 dark:bg-neutral-800"
              id="player"
            >
              <div className="flex flex-row items-center justify-between px-4">
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={artworkUrl}
                    className="rounded"
                    width={36}
                    height={36}
                    alt={`Album art for ${title} by ${artist}`}
                  />
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
                  initial={{ originX: 0 }}
                  style={{ scaleX: x }}
                  id={'progressBarIndicator'}
                >
                  <div className="w-full h-1 bg-emerald-500 dark:bg-emerald-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
