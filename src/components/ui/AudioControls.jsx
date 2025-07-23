import { useEffect, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import AudioSlider from "../ui/AudioSlider.jsx";

export default function AudioControls({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setProgress(value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <AudioSlider
        duration={duration}
        progress={progress}
        onChange={handleSeek}
      />
      <button onClick={togglePlay} className="text-white text-4xl">
        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
      </button>
    </div>
  );
}
