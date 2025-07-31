import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SceneWrapper from "./components/3d/SceneWrapper";
import Loading from "./components/pages/Loading.jsx";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

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
        <SceneWrapper
          setLoaded={setLoaded}
          audioRef={audioRef}
          showLoading={showLoading}
        />
      </Canvas>
      <div className="absolute pointer-events-none text-3xl w-full h-full text-neutral-200 font-mono z-10 flex flex-col">
        {showLoading ? (
          <Loading loaded={loaded} setShowLoading={setShowLoading} />
        ) : (
          <button
            onClick={handleToggleMute}
            className="absolute pointer-events-auto p-4 top-4 right-4 bg-neutral-800/40 backdrop-blur-xs rounded-xl "
          >
            <audio
              ref={audioRef}
              src={"/audios/audio1.mp3"}
              className="hidden"
              autoPlay
            />

            {muted ? (
              <BsFillVolumeMuteFill size={30} />
            ) : (
              <BsFillVolumeUpFill size={30} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
