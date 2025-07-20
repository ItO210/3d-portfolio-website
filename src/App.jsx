// App.jsx or App.tsx
import { Canvas } from "@react-three/fiber";
import SceneWrapper from "./components/3d/SceneWrapper";

export default function App() {
  return (
    <div className="h-screen w-full bg-black">
      {" "}
      <Canvas camera={{ position: [16.5, 6, 14.5], fov: 35 }}>
        <SceneWrapper />
      </Canvas>
    </div>
  );
}
