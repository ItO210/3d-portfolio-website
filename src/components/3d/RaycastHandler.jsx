import { useEffect, useRef } from "react";
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
}) {
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const hovered = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleMove = (e) => {
      const bounds = document.body.getBoundingClientRect();
      pointer.current.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.current.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const playHoverAnimation = (object, on) => {
    if (!object) return;

    gsap.killTweensOf(object.scale);
    gsap.killTweensOf(object.material.color);

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
    });

    gsap.to(object.material.color, {
      ...new THREE.Color(targetColor),
      duration: 0.4,
    });
  };

  function focusCameraOnObject(object, controlsRef, camera, navConfig) {
    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5;

    // Find config entry where target matches the object's name
    const configEntry = Object.values(navConfig).find(
      (config) => config.target === object.name,
    );

    const offsetArray = configEntry?.cameraOffset || [0, 0, 1];
    const offsetDirection = new THREE.Vector3(...offsetArray).normalize();

    // New camera position based on center + offsetDirection * cameraZ
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
  }

  useFrame(() => {
    raycaster.current.setFromCamera(pointer.current, camera);

    // Only check raycast against all navConfig.glass entries
    const hoverTargets = targets.filter((t) =>
      Object.values(navConfig).some((conf) => conf.glass === t.name),
    );

    const intersects = raycaster.current.intersectObjects(hoverTargets);

    if (intersects.length > 0) {
      const hit = intersects[0].object;

      // Find navConfig entry where glass matches hit.name
      const navEntry = Object.values(navConfig).find(
        (conf) => conf.glass === hit.name,
      );

      if (!navEntry) return;

      if (hovered.current !== hit) {
        if (hovered.current) {
          const prevEntry = Object.values(navConfig).find(
            (conf) => conf.glass === hovered.current.name,
          );
          if (prevEntry) {
            const prevObject = targets.find((o) => o.name === prevEntry.text);
            playHoverAnimation(prevObject, false);
          }
        }

        hovered.current = hit;
        const bloomObject = targets.find((o) => o.name === navEntry.text);
        playHoverAnimation(bloomObject, true);
      }

      document.body.style.cursor = "pointer";
    } else {
      if (hovered.current) {
        const prevEntry = Object.values(navConfig).find(
          (conf) => conf.glass === hovered.current.name,
        );
        if (prevEntry) {
          const prevObject = targets.find((o) => o.name === prevEntry.text);
          playHoverAnimation(prevObject, false);
        }
        hovered.current = null;
      }
      document.body.style.cursor = "default";
    }
  });

  useEffect(() => {
    if (!screenMesh) return;

    const navEntry = Object.values(navConfig).find(
      (entry) => entry.target === screenMesh.name,
    );

    if (!navEntry) return;

    focusCameraOnObject(screenMesh, controlsRef, camera, navConfig);
    setTarget(navEntry.text);
  }, [screenMesh]);

  useEffect(() => {
    const handleClick = () => {
      raycaster.current.setFromCamera(pointer.current, camera);

      const hoverTargets = targets.filter((t) =>
        Object.values(navConfig).some(
          (conf) => conf.glass === t.name || conf.target === t.name,
        ),
      );

      const intersects = raycaster.current.intersectObjects(hoverTargets);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        const navEntry = Object.values(navConfig).find((conf) => {
          if (clicked.name.includes("Screen")) {
            return conf.target === clicked.name;
          } else {
            return conf.glass === clicked.name;
          }
        });

        if (!navEntry) return;

        const target = targets.find((o) => o.name === navEntry.target);

        if (target && target !== screenMesh) {
          controlsRef.current.enabled = false; // disable orbit controls

          setScreenMesh?.(target);
        }
      }
    };
    const handlePointerUp = () => {
      controlsRef.current.enabled = true; // always re-enable
    };

    window.addEventListener("pointerdown", handleClick);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerdown", handleClick);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [targets, camera, controlsRef, setScreenMesh]);

  return null;
}
