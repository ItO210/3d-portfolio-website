import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
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

    const hoverGroups = {
      AboutMeGlass: "AboutMe_Red_Bloom",
      ProjectsGlass: "Projects_Red_Bloom",
      GamesGlass: "Games_Red_Bloom",
      MusicGlass: "Music_Red_Bloom",
      ContactGlass: "Contact_Red_Bloom",
    };

    const navItems = {
      AboutMe_Red_Bloom: "PhoneFacePlateScreen_White",
      Projects_Red_Bloom: "VendingMachineBodyScreen_White",
      Games_Red_Bloom: "ArcadeMachineBodyScreen_White",
      Music_Red_Bloom: "JackboxBodyScreen_White",
      Contact_Red_Bloom: "PhoneFacePlateScreen_White",
    };

    function playHoverAnimation(name, isHovering) {
      const object = raycasterObjects.find((obj) => obj.name === name);
      if (!object) return;

      gsap.killTweensOf(object.scale);
      gsap.killTweensOf(object.material.color);

      if (object.name in navItems) {
        const targetScale = isHovering
          ? {
              x: object.userData.initialScale.x * 1.1,
              y: object.userData.initialScale.y * 1.1,
              z: object.userData.initialScale.z * 1.1,
            }
          : {
              x: object.userData.initialScale.x,
              y: object.userData.initialScale.y,
              z: object.userData.initialScale.z,
            };

        gsap.to(object.scale, {
          ...targetScale,
          duration: 0.5,
          ease: "back.out(1.8)",
        });

        const targetColor = isHovering ? "#ffffff" : "#ff4444";
        if (!object.userData.originalColor) {
          object.userData.originalColor = object.material.color.clone();
        }

        gsap.to(object.material.color, {
          r: new THREE.Color(targetColor).r,
          g: new THREE.Color(targetColor).g,
          b: new THREE.Color(targetColor).b,
          duration: 0.5,
        });
      }
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

        if (hoverGroups[child.name] || child.name.includes("Bloom")) {
          raycasterObjects.push(child);
          child.userData.initialScale = child.scale.clone();
        }

        for (const glassName in hoverGroups) {
          if (hoverGroups[glassName].includes(child.name)) {
            child.userData.initialScale = child.scale.clone();
          }
        }
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

      const dir = new THREE.Vector3()
        .subVectors(camera.position, controls.target)
        .normalize();

      const newCameraPos = center.clone().add(dir.multiplyScalar(cameraZ));

      gsap.to(controls.target, {
        x: center.x,
        y: center.y,
        z: center.z,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(controls.target);
          controls.update();
        },
      });

      gsap.to(camera.position, {
        x: newCameraPos.x,
        y: newCameraPos.y,
        z: newCameraPos.z,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(controls.target);
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
        if (hoverGroups[clickedObject.name] in navItems) {
          const object = raycasterObjects.find(
            (obj) => obj.name === navItems[hoverGroups[clickedObject.name]],
          );
          focusCameraOnObject(object);
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

      let hoveringInteractive = false;

      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        const group = hoverGroups[hovered.name] || hovered.name;

        if (hovered !== currentHoveredObject) {
          if (currentHoveredObject) {
            const prevGroup =
              hoverGroups[currentHoveredObject.name] ||
              currentHoveredObject.name;
            playHoverAnimation(prevGroup, false);
          }
          playHoverAnimation(group, true);
          currentHoveredObject = hovered;
        }

        if (navItems[group]) {
          hoveringInteractive = true;
        }
      } else {
        if (currentHoveredObject) {
          const group =
            hoverGroups[currentHoveredObject.name] || currentHoveredObject.name;
          playHoverAnimation(group, false);
          currentHoveredObject = null;
        }
      }

      document.body.style.cursor = hoveringInteractive ? "pointer" : "default";

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
