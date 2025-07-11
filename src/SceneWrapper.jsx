import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import RaycastHandler from "./RaycastHandler";
import FanAnimator from "./FanAnimator";
import AttachHtmlToMesh from "./AttachHtmlToMesh";
import HeroPage from "./HeroPage";

export default function SceneWrapper() {
  const [interactives, setInteractives] = useState([]);
  const [fans, setFans] = useState([]);
  const controlsRef = useRef();
  const [screenMesh, setScreenMesh] = useState(null);

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

      {screenMesh && (
        <AttachHtmlToMesh mesh={screenMesh} offset={[0, 0, 0]}>
          <div className="w-full h-full">
            <HeroPage />
          </div>
        </AttachHtmlToMesh>
      )}

      <RaycastHandler
        targets={interactives}
        controlsRef={controlsRef}
        setScreenMesh={setScreenMesh}
      />

      <FanAnimator fans={fans} />
      <OrbitControls ref={controlsRef} zoomSpeed={0.5} enableDamping />
    </>
  );
}
