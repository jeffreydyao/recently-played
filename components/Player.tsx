import {
  animate,
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
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
  const [playState, setPlayState] = useState(false);
  const ready = useRef(false); // Is the audio ready to be played?
  const [showState, setShowState] = useState(true); // Is the player mounted or not?
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number>(0);
  const remaining = useRef<number>(0);
  const [notStarted, setNotStarted] = useState(true);

  const { lastSeenDate }: any = useVisibilityChange();

  const x = useMotionValue(0); // Initial progress bar state

  const audioSrc = previewUrl;

  const controls = useAnimation(); // Initialise Framer Motion playback controls

  let progressBarWidth = document
  .getElementById('progressBarRoot')
  ?.getBoundingClientRect().width;

  let progressIndicatorWidth = document
  .getElementById('progressBarIndicator')
  ?.getBoundingClientRect().width;


  // https://github.com/vercel/next.js/discussions/17963
  // The Web Audio API can't be run server-side, so we call it on the client with a hook.
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(audioSrc) : undefined,
  );

  // Play preview on first mount
  useEffect(() => {
    setPlayState(true);
    remaining.current = 30;
    return () => {
      remaining.current = null as any;
      setPlayState(false);
    };
  }, []);

  // Check if audio is ready to play without interruptions
  function readyCheck() {
    if (audio.current?.readyState! > 2) {
      ready.current = true;
    } else {
      ready.current = false;
    }
  }

  // ... by adding a listener for the loadeddata event
  useEffect(() => {
    audio.current?.addEventListener('loadeddata', readyCheck);

    return () => {
      audio.current?.removeEventListener('loadeddata', readyCheck);
    };
  }, [playState]);

  // Player logic for pausing / playing audio and animating progress bar
  useEffect(() => {
    if (playState) {
      if (ready && notStarted) {
        // Store startTime for usage in calculating speed at which to animate progress bar
        // performance.now() used as higher accuracy than Date.now()
        startTime.current = pauseTime.current = performance.now() / 1000;
        // console.log('Audio ready - playing - notStarted - 3');
        setNotStarted(false);
      } else if (ready && progressIndicatorWidth === progressBarWidth) {
        controls.start({
          scaleX: 0,
          transition: { duration: 0, ease: 'linear' },
        });
        setTimeout(() => {
          // Go back to beginning
          setNotStarted(true);
        }, 5);
      } else if (ready) {
        audio.current?.play();
        // console.log('Audio ready - playing - started - 4');
        remaining.current = 30 - (pauseTime.current - startTime.current);
        // console.log(`Remaining time on play is ${remaining.current} - 2`);
        const controls = animate(x, 1, {
          ease: 'linear',
          duration: remaining.current,
          onComplete: () => {
            setPlayState(false);
          },
        });
      } else {
        // console.log('Audio not ready - buffering ... - 2');
        controls.stop();
      }
    } else if (!ready && notStarted) {
      // console.log('Not ready and not started - 1');
    } else {
      audio.current?.pause();
      controls.stop();
      pauseTime.current = performance.now() / 1000;
    }

    return () => {
      audio.current?.pause();
    };
  });

  // CSS animations pause when you switch tabs, meaning the animation finishes later than the audio
  // To overcome this, we re-calculate the duration remaining by subtracting the time away from the tab 
  // This hook only fires when the user switches away and back to save resources
  useEffect(() => {
    let remainingAfterRefocus =
      30 -
      audio.current?.currentTime! -
      (new Date().valueOf() - Date.parse(lastSeenDate)) / 1000; // Date.parse() returns lastSeenDate in format compliant with iOS Safari
    if (playState) {
      const controls = animate(x, 1, {
        ease: 'linear',
        duration: remainingAfterRefocus,
        onComplete: () => {
          setPlayState(false);
        },
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
