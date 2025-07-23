import { useRef } from "react";
import AudioVisualizer from "../ui/AudioVisualizer";
import AudioControls from "../ui/AudioControls";

export default function MusicPage() {
  const audioRef = useRef(null);

  return (
    <div className="relative w-full h-full bg-neutral-200 text-white ">
      {/* Audio Visualizer - background layer */}
      <div className="absolute w-full h-full z-0">
        <AudioVisualizer audioRef={audioRef} />
      </div>

      {/* Audio element - hidden */}
      <audio ref={audioRef} src="/audios/audio1.mp3" className="hidden" />

      {/* Audio Controls - top layer */}
      <div className="absolute w-full h-full z-10 p-4 bg-neutral-900 opacity-80">
        <AudioControls audioRef={audioRef} />
      </div>
    </div>
  );
}
