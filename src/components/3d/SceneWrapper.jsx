import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import RaycastHandler from "./RaycastHandler";
import FanAnimator from "./FanAnimator";
import AttachHtmlToMesh from "./AttachHtmlToMesh";
import { navConfig } from "../../utils/navConfig.js";

export default function SceneWrapper({ audioRef, setLoaded, showLoading }) {
  const [interactives, setInteractives] = useState([]);
  const [fans, setFans] = useState([]);
  const controlsRef = useRef();
  const [screenMesh, setScreenMesh] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    controlsRef.current.target.set(0, 2, 0);
    controlsRef.current.update();
    controlsRef.current.enablePan = false;
    controlsRef.current.minPolarAngle = 0;
    controlsRef.current.maxPolarAngle = Math.PI / 2;
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
        setLoaded={setLoaded}
      />

      {screenMesh && PageComponent && (
        <AttachHtmlToMesh mesh={screenMesh}>
          <PageComponent audioRef={audioRef} />
        </AttachHtmlToMesh>
      )}

      {!showLoading && (
        <RaycastHandler
          targets={interactives}
          controlsRef={controlsRef}
          setScreenMesh={setScreenMesh}
          setTarget={setTarget}
          screenMesh={screenMesh}
          currentTarget={target}
        />
      )}

      <FanAnimator fans={fans} />
      <OrbitControls ref={controlsRef} />
    </>
  );
}
