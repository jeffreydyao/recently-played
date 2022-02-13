import { Play, Pause, X } from "phosphor-react";
import { unmountComponentAtNode, render } from "react-dom";

export default function PlayerControls({
  isPlaying,
  onPlayPauseClick,
}: {
  isPlaying: any;
  onPlayPauseClick: any;
}) {


  return (
    <div className="flex flex-row items-center gap-3">
      {isPlaying ? (
        <button aria-label="Pause" onClick={() => onPlayPauseClick(false)}>
          <Pause weight="fill" className="w-5 h-5" />
        </button>
      ) : (
        <button aria-label="Play" onClick={() => onPlayPauseClick(true)}>
          <Play weight="fill" className="w-5 h-5" />
        </button>
      )}

      <button>
        <X weight="fill" className="w-6 h-6" onClick={() => unmountComponentAtNode(document.getElementById('player'))}/>
      </button>
    </div>
  );
}
