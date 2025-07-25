// App.jsx or App.tsx
import { Canvas } from "@react-three/fiber";
import SceneWrapper from "./components/3d/SceneWrapper";

export default function App() {
  return (
    <div className="relative h-screen w-full bg-black flex ">
      <Canvas camera={{ position: [16.5, 4, 14.5], fov: 35 }} className="z-0">
        <SceneWrapper />
      </Canvas>
      <div className="absolute text-3xl w-full h-full pointer-events-none text-white font-mono z-10">
        this is a div?
      </div>
    </div>
  );
}
