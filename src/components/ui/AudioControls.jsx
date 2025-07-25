import { useEffect, useState } from "react";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipStartFill,
  BsSkipEndFill,
} from "react-icons/bs";
import AudioSlider from "../ui/AudioSlider.jsx";

export default function AudioControls({
  currentTrackIndex,
  audioRef,
  onNext,
  onPrev,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => onNext();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    setDuration(0);
    audioRef.current.play();
  }, [currentTrackIndex]);

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
    <div className=" w-full flex flex-col items-center justify-center p-4">
      <AudioSlider
        duration={duration}
        progress={progress}
        onChange={handleSeek}
      />
      <div className="flex items-center gap-6 text-neutral-900 text-4xl">
        <button onClick={onPrev} title="Previous">
          <BsSkipStartFill size={50} />
        </button>
        <button onClick={togglePlay} title="Play/Pause">
          {isPlaying ? <BsPauseFill size={50} /> : <BsPlayFill size={50} />}
        </button>
        <button onClick={onNext} title="Next">
          <BsSkipEndFill size={50} />
        </button>
      </div>
    </div>
  );
}
