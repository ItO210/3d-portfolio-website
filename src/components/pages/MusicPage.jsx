import { useRef, useState } from "react";
import AudioVisualizer from "../ui/AudioVisualizer";
import AudioControls from "../ui/AudioControls";

export default function MusicPage({ audioRef }) {
  const tracks = [
    { title: "Track 1", src: "/audios/audio1.mp3", image: "/images/a.png" },
    { title: "Track 2", src: "/audios/audio2.mp3", image: "/images/a.png" },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = tracks[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative w-full h-full bg-neutral-200 text-white font-mono">
      {/* Audio Visualizer - background layer */}
      <div className="absolute w-full h-full ">
        <AudioVisualizer audioRef={audioRef} />
      </div>

      {/* Audio element - hidden */}
      <audio ref={audioRef} src={currentTrack.src} className="hidden" />

      {/* Audio Controls - top layer */}

      <div className="absolute w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-200/60 backdrop-blur-xs">
        <img
          src={currentTrack.image}
          alt="Track Art"
          className="h-2/3 w-2/3 object-cover rounded-2xl shadow-xl shadow-neutral-500 mb-8 backdrop-blur-3xl bg-neutral-200/60"
        />

        <div className="text-neutral-900 text-5xl w-full flex pl-4 ">
          {currentTrack.title}
        </div>
        <AudioControls
          currentTrackIndex={currentTrackIndex}
          audioRef={audioRef}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
}
