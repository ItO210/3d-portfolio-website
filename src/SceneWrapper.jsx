// components/SceneWrapper.jsx
import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import RaycastHandler from "./RaycastHandler";
import FanAnimator from "./FanAnimator";

export default function SceneWrapper() {
  const [interactives, setInteractives] = useState([]);
  const [fans, setFans] = useState([]);
  const controlsRef = useRef();

  useEffect(() => {
    controlsRef.current.target.set(0, 2.5, 0);
    controlsRef.current.update();
  }, []);

  return (
    <>
      <ModelLoader
        url="/models/3dPortfolio.glb"
        onMeshReady={setInteractives}
        onFansReady={setFans}
      />
      <RaycastHandler targets={interactives} controlsRef={controlsRef} />
      <FanAnimator fans={fans} />

      <OrbitControls ref={controlsRef} zoomSpeed={0.5} enableDamping />
    </>
  );
}
