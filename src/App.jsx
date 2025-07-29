import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SceneWrapper from "./components/3d/SceneWrapper";
import Loading from "./components/pages/Loading.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !muted;
    audioRef.current.muted = newMuted;
    setMuted(newMuted);
  };
  return (
    <div className="relative h-screen w-full bg-black flex ">
      <Canvas camera={{ position: [16.5, 4, 14.5], fov: 35 }} className="z-0">
        <SceneWrapper setLoaded={setLoaded} audioRef={audioRef} />
      </Canvas>
      <div className="absolute pointer-events-none text-3xl w-full h-full  text-white font-mono z-10 ">
        {showLoading && (
          <Loading loaded={loaded} setShowLoading={setShowLoading} />
        )}
        <button onClick={handleToggleMute} className="pointer-events-auto">
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
