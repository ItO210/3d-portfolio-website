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
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = prevIndex === tracks.length - 1 ? 0 : prevIndex + 1;

      // change the audio src via ref
      if (audioRef.current) {
        audioRef.current.src = tracks[newIndex].src;
        audioRef.current.play();
      }

      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;

      if (audioRef.current) {
        audioRef.current.src = tracks[newIndex].src;
        audioRef.current.play();
      }
      return newIndex;
    });
  };

  return (
    <div className="relative w-full h-full bg-neutral-200 text-white font-mono">
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full ">
        <AudioVisualizer audioRef={audioRef} />
      </div>
      <div className="absolute w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent to-neutral-200/60">
        <img
          src={currentTrack.image}
          alt="Track Art"
          className="h-2/3 w-2/3 object-cover rounded-2xl shadow-lg shadow-neutral-500 mb-8 backdrop-blur-3xl bg-neutral-200/60 border border-neutral-50"
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
