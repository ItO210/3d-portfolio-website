import { useEffect, useRef, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { navConfig } from "../../utils/navConfig.js";

export default function RaycastHandler({
  targets,
  controlsRef,
  setScreenMesh,
  setTarget,
  screenMesh,
  currentTarget,
}) {
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const hovered = useRef(null);
  const hoverTargets = useRef([]);
  const { camera } = useThree();

  // --- helpers ---
  const findNavEntryBy = useCallback(
    (key, value) =>
      Object.values(navConfig).find((conf) => conf[key] === value),
    [],
  );

  const findTargetByName = useCallback(
    (name) => targets.find((o) => o.name === name),
    [targets],
  );

  const playHoverAnimation = useCallback((object, on) => {
    if (!object) return;
    const targetScale = on
      ? object.userData.initialScale.clone().multiplyScalar(1.1)
      : object.userData.initialScale;
    const targetColor = on ? "#ffffff" : "#ff4444";

    gsap.to(object.scale, {
      x: targetScale.x,
      y: targetScale.y,
      z: targetScale.z,
      duration: 0.4,
      ease: "back.out(1.8)",
      overwrite: "auto",
    });

    gsap.to(object.material.color, {
      ...new THREE.Color(targetColor),
      duration: 0.4,
      overwrite: "auto",
    });
  }, []);

  const focusCameraOnObject = useCallback(
    (object) => {
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;

      const configEntry = findNavEntryBy("target", object.name);
      const offsetArray = configEntry?.cameraOffset || [0, 0, 1];
      const offsetDirection = new THREE.Vector3(...offsetArray).normalize();
      const newCameraPos = center
        .clone()
        .add(offsetDirection.multiplyScalar(cameraZ));

      gsap.to(controlsRef.current.target, {
        x: center.x,
        y: center.y,
        z: center.z,
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(camera.position, {
        x: newCameraPos.x,
        y: newCameraPos.y,
        z: newCameraPos.z,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          camera.lookAt(controlsRef.current.target);
          controlsRef.current.update();
        },
      });
    },
    [camera, controlsRef, findNavEntryBy],
  );

  // --- setup pointer move ---
  useEffect(() => {
    const handleMove = (e) => {
      const bounds = document.body.getBoundingClientRect();
      pointer.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // --- compute hoverTargets when targets change ---
  useEffect(() => {
    hoverTargets.current = targets.filter((t) =>
      Object.values(navConfig).some((conf) => conf.glass === t.name),
    );
  }, [targets]);

  // --- GSAP cleanup ---
  useEffect(() => {
    return () => {
      gsap.globalTimeline.clear();
    };
  }, []);

  // --- hover logic ---
  useFrame(() => {
    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(hoverTargets.current);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const navEntry = findNavEntryBy("glass", hit.name);
      if (!navEntry) return;

      if (hovered.current !== hit) {
        if (hovered.current) {
          const prevEntry = findNavEntryBy("glass", hovered.current.name);
          if (prevEntry) {
            playHoverAnimation(findTargetByName(prevEntry.text), false);
          }
        }
        hovered.current = hit;
        playHoverAnimation(findTargetByName(navEntry.text), true);
      }
      document.body.style.cursor = "pointer";
    } else {
      if (hovered.current) {
        const prevEntry = findNavEntryBy("glass", hovered.current.name);
        if (prevEntry) {
          playHoverAnimation(findTargetByName(prevEntry.text), false);
        }
        hovered.current = null;
      }
      document.body.style.cursor = "default";
    }
  });

  // --- focus when screenMesh changes ---
  useEffect(() => {
    if (screenMesh) focusCameraOnObject(screenMesh);
  }, [screenMesh, currentTarget, focusCameraOnObject]);

  // --- click handler ---
  useEffect(() => {
    const handleClick = () => {
      raycaster.current.setFromCamera(pointer.current, camera);

      const clickTargets = targets.filter((t) =>
        Object.values(navConfig).some(
          (conf) => conf.glass === t.name || conf.target === t.name,
        ),
      );

      const intersects = raycaster.current.intersectObjects(clickTargets);
      if (intersects.length === 0) return;

      const clicked = intersects[0].object;

      if (clicked.name.includes("Screen")) {
        if (clicked === screenMesh) {
          controlsRef.current.enabled = false;
        } else {
        }

        const navEntry = findNavEntryBy("target", clicked.name);
        if (!navEntry) return;

        const screenTarget = findTargetByName(navEntry.target);
        if (screenTarget && screenTarget !== screenMesh) {
          setScreenMesh?.(screenTarget);
          setTarget(navEntry.text);
        }
      } else {
        const navEntry = findNavEntryBy("glass", clicked.name);
        if (!navEntry) return;
        const screenTarget = findTargetByName(navEntry.target);
        if (screenTarget) {
          setScreenMesh?.(screenTarget);
          setTarget(navEntry.text);
        }
      }
    };

    const handlePointerUp = () => {
      controlsRef.current.enabled = true;
    };

    window.addEventListener("pointerdown", handleClick);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerdown", handleClick);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    targets,
    camera,
    controlsRef,
    setScreenMesh,
    screenMesh,
    setTarget,
    findNavEntryBy,
    findTargetByName,
  ]);

  return null;
}
