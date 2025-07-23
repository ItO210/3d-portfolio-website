import { useRef, useEffect, useState } from "react";

export default function AudioSlider({ duration = 1, progress = 0, onChange }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const progressPercent = (progress / duration) * 100;

  const handleSeek = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = (offsetX / rect.width) * duration;
    onChange(newProgress);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    const clampedOffset = Math.max(0, Math.min(offsetX, rect.width));
    const newProgress = (clampedOffset / rect.width) * duration;
    onChange(newProgress);
  };

  useEffect(() => {
    const moveHandler = (e) => handleDrag(e);
    const upHandler = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", moveHandler);
      window.addEventListener("mouseup", upHandler);
      window.addEventListener("touchmove", moveHandler);
      window.addEventListener("touchend", upHandler);
    }

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };
  }, [isDragging]);

  return (
    <div
      ref={trackRef}
      onClick={handleSeek}
      className="relative w-full h-3 bg-neutral-300 rounded cursor-pointer"
    >
      {/* Fill line */}
      <div
        className="absolute h-full bg-red-500 rounded"
        style={{ width: `${progressPercent}%` }}
      />

      {/* Thumb */}
      <div
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="absolute top-1/2 w-4 h-4 bg-red-600 rounded-full -translate-y-1/2 -translate-x-1/2 d"
        style={{ left: `${progressPercent}%` }}
      />
    </div>
  );
}
