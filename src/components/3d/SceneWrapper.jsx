import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import RaycastHandler from "./RaycastHandler";
import FanAnimator from "./FanAnimator";
import AttachHtmlToMesh from "./AttachHtmlToMesh";
import { navConfig } from "../../utils/navConfig.js";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

export default function SceneWrapper({
  audioRef,
  setLoaded,
  showLoading,
  cameraReset,
  setCameraReset,
  setIsAnimating,
}) {
  const [interactives, setInteractives] = useState([]);
  const [fans, setFans] = useState([]);
  const controlsRef = useRef();
  const [screenMesh, setScreenMesh] = useState(null);
  const [target, setTarget] = useState(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!cameraReset) return;

    setTarget(null);
    setScreenMesh(null);

    const controls = controlsRef.current;
    if (!controls) return;
    controls.enabled = false;
    controls.enableZoom = false;

    // Kill any existing camera tweens
    gsap.killTweensOf([controls.target, camera.position]);

    const newTarget = { x: 0, y: 2, z: 0 };
    const newPosition = { x: 16.5, y: 4, z: 14.5 };

    gsap.to(controls.target, {
      ...newTarget,
      duration: 2,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(camera.position, {
      ...newPosition,
      duration: 2,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        camera.lookAt(controls.target);
        controls.update();
      },
      onComplete: () => {
        controls.enabled = true;
        controls.enableZoom = true;
        setCameraReset(false); // mark reset complete
      },
    });
  }, [cameraReset]);

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
          <PageComponent audioRef={audioRef} setTarget={setTarget} />
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
          setIsAnimating={setIsAnimating}
        />
      )}

      <FanAnimator fans={fans} />
      <OrbitControls ref={controlsRef} />
    </>
  );
}
