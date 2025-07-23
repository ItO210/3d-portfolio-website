import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import RaycastHandler from "./RaycastHandler";
import FanAnimator from "./FanAnimator";
import AttachHtmlToMesh from "./AttachHtmlToMesh";
import { navConfig } from "../../utils/navConfig.js";

export default function SceneWrapper() {
  const [interactives, setInteractives] = useState([]);
  const [fans, setFans] = useState([]);
  const controlsRef = useRef();
  const [screenMesh, setScreenMesh] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    controlsRef.current.target.set(0, 2.5, 0);
    controlsRef.current.update();
  }, []);

  const activeEntry = screenMesh
    ? Object.values(navConfig).find((entry) => entry.text === target)
    : null;

  const PageComponent = activeEntry?.component;

  return (
    <>
      <ModelLoader
        url="/models/3dPortfolio.glb"
        onMeshReady={setInteractives}
        onFansReady={setFans}
      />

      {screenMesh && PageComponent && (
        <AttachHtmlToMesh mesh={screenMesh}>
          <PageComponent />
        </AttachHtmlToMesh>
      )}

      <RaycastHandler
        targets={interactives}
        controlsRef={controlsRef}
        setScreenMesh={setScreenMesh}
        setTarget={setTarget}
        screenMesh={screenMesh}
      />

      <FanAnimator fans={fans} />
      <OrbitControls ref={controlsRef} />
    </>
  );
}
