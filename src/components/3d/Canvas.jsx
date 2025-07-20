import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { navConfig } from "../../utils/navConfig";
import gsap from "gsap";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;

    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      1000,
    );
    camera.position.set(16, 1, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 2.5, 0);

    const zAxisFans = [];
    const yAxisFans = [];
    const raycasterObjects = [];

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let currentHoveredObject = null;

    const textureLoader = new THREE.TextureLoader();
    const textureMap = {
      First: { red: "/textures/First.webp" },
      Second: { red: "/textures/Second.webp" },
      Third: { red: "/textures/Third.webp" },
    };

    const loadedTextures = { red: {} };
    Object.entries(textureMap).forEach(([key, paths]) => {
      const redTexture = textureLoader.load(paths.red);
      redTexture.flipY = false;
      redTexture.colorSpace = THREE.SRGBColorSpace;
      loadedTextures.red[key] = redTexture;
    });

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    function playHoverAnimation(object, isHovering) {
      if (!object) return;

      gsap.killTweensOf(object.scale);
      gsap.killTweensOf(object.material.color);

      const config = Object.values(navConfig).find(
        (cfg) => cfg.glass === object.name,
      );

      if (!config) return;

      const text = raycasterObjects.find((obj) => obj.name === config.text);
      if (!text) return;

      const { x, y, z } = text.userData.initialScale;
      const targetScale = isHovering
        ? { x: x * 1.1, y: y * 1.1, z: z * 1.1 }
        : { x, y, z };

      gsap.to(text.scale, {
        ...targetScale,
        duration: 0.5,
        ease: "back.out(1.8)",
      });

      const targetColor = isHovering ? "#ffffff" : "#ff4444";
      if (!text.userData.originalColor) {
        text.userData.originalColor = text.material.color.clone();
      }

      const color = new THREE.Color(targetColor);
      gsap.to(text.material.color, {
        r: color.r,
        g: color.g,
        b: color.b,
        duration: 0.5,
      });
    }
    loader.load("/models/3dPortfolio.glb", (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;

        Object.keys(textureMap).forEach((key) => {
          if (child.name.includes(key)) {
            child.material = new THREE.MeshBasicMaterial({
              map: loadedTextures.red[key],
            });

            if (child.name.includes("Fan_2") || child.name.includes("Fan_5")) {
              zAxisFans.push(child);
            } else if (child.name.includes("Fan")) {
              yAxisFans.push(child);
            }

            if (child.material.map) {
              child.material.map.minFilter = THREE.LinearFilter;
            }
            if (child.name.includes("First")) {
              raycasterObjects.push(child);
            }
          }
        });

        if (child.name.includes("Glass")) {
          child.material = new THREE.MeshPhysicalMaterial({
            transparent: true,
            transmission: 1,
            roughness: 0,
            metalness: 0,
            opacity: 1,
            ior: 1.5,
            thickness: 0.1,
            specularIntensity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0,
          });
        }

        if (child.name.includes("Red")) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xff2222 });
        }

        if (child.name.includes("White")) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        }

        if (child.name.includes("Screen")) {
          raycasterObjects.push(child);
        }

        Object.values(navConfig).forEach(({ glass, text }) => {
          if (child.name === glass || child.name === text) {
            raycasterObjects.push(child);
            child.userData.initialScale = child.scale.clone();
          }
        });
      });

      scene.add(glb.scene);
    });

    function focusCameraOnObject(object) {
      const box = new THREE.Box3().setFromObject(object);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();

      box.getCenter(center);
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5;

      const offsetArray = Object.values(navConfig).find(
        (config) => config.target === object.name,
      )?.cameraOffset;
      const offsetDirection = new THREE.Vector3(...offsetArray);
      const newCameraPos = center
        .clone()
        .add(offsetDirection.multiplyScalar(cameraZ));

      gsap.to(controls.target, {
        x: center.x,
        y: center.y,
        z: center.z,
        duration: 2,
      });

      gsap.to(camera.position, {
        x: newCameraPos.x,
        y: newCameraPos.y,
        z: newCameraPos.z,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(center);
          controls.update();
        },
      });
    }

    window.addEventListener("pointerdown", (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(raycasterObjects);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (
          Object.values(navConfig).some(
            (config) => config.glass === clickedObject.name,
          )
        ) {
          const object = raycasterObjects.find(
            (obj) =>
              obj.name ===
              Object.values(navConfig).find(
                (config) => config.glass === clickedObject.name,
              )?.target,
          );
          focusCameraOnObject(object);
        } else if (
          Object.values(navConfig).some(
            (config) => config.target === clickedObject.name,
          )
        ) {
          focusCameraOnObject(clickedObject);
        }
      }
    });

    const handleResize = () => {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    const handleMousemove = (e) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMousemove);

    let animationId;

    const animate = () => {
      controls.update();

      zAxisFans.forEach((fan) => (fan.rotation.y -= 0.01));
      yAxisFans.forEach((fan) => (fan.rotation.x -= 0.01));

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(raycasterObjects);

      if (intersects.length > 0) {
        const hovered = intersects[0].object;

        if (hovered !== currentHoveredObject) {
          if (currentHoveredObject) {
            playHoverAnimation(currentHoveredObject, false);
          }
          playHoverAnimation(hovered, true);
          currentHoveredObject = hovered;
        }
      } else {
        if (currentHoveredObject) {
          playHoverAnimation(currentHoveredObject, false);
          currentHoveredObject = null;
        }
      }

      //      document.body.style.cursor = hoveringInteractive ? "pointer" : "default";

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMousemove);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={canvasRef} className="h-screen w-full overflow-hidden" />;
}
