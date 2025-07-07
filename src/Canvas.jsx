import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D baseTexture;
  uniform sampler2D bloomTexture;
  varying vec2 vUv;

  void main() {
    vec4 base = texture2D(baseTexture, vUv);
    vec4 bloom = texture2D(bloomTexture, vUv);
    gl_FragColor = base + bloom;
  }
`;

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;

    // ------------------ Setup ------------------
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
    //    controls.enablePan = false;
    controls.target.set(0, 2.5, 0);

    // ------------------ Postprocessing ------------------
    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      0.2,
      0.5,
      0,
    );
    composer.addPass(bloomPass);
    composer.renderToScreen = false;

    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: composer.renderTarget2.texture },
        },
        vertexShader,
        fragmentShader,
      }),
      "baseTexture",
    );

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);
    finalComposer.addPass(new OutputPass());

    // ------------------ Bloom Config ------------------
    const BLOOM_SCENE = 1;
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const darkGlassMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
    });
    const materials = {};

    function nonBloomed(obj) {
      if (obj.isMesh && !bloomLayer.test(obj.layers)) {
        materials[obj.uuid] = obj.material;
        obj.material = obj.name.includes("Glass")
          ? darkGlassMaterial
          : darkMaterial;
      }
    }

    function restoreMaterial(obj) {
      if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
    }

    // ------------------ Assets ------------------
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

    const environmentMap = new THREE.CubeTextureLoader()
      .setPath("textures/skybox/")
      .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // ------------------ Hover Setup ------------------
    const hoverGroups = {
      AboutMeGlass: "AboutMe_Red_Bloom",
      ProjectsGlass: "Projects_Red_Bloom",
      GamesGlass: "Games_Red_Bloom",
      MusicGlass: "Music_Red_Bloom",
      ContactGlass: "Contact_Red_Bloom",
      MainSignGlass1: "MainSign1_Red_Bloom",
      MainSignGlass2: "MainSign2_Red_Bloom",
      RamenShopSignGlass: "RamenShopSignText_Red_Bloom",
      ArcadeSignGlass: "ArcadeSignText_Red_Bloom",
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
      if (!object) {
        return;
      }

      gsap.killTweensOf(object.scale);

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
      }

      if (object.name.includes("Bloom")) {
        if (isHovering) {
          /*
        if (!object.userData.originalColor) {
          object.userData.originalColor = object.material.color.clone();
        }
        object.material.color.set(0xff0000);
        */
          object.layers.enable(BLOOM_SCENE);
        } else {
          object.layers.disable(BLOOM_SCENE);
        }
      }
    }

    // ------------------ Model Loading ------------------
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

    // ------------------ Events ------------------

    function focusCameraOnObject(object) {
      // Compute bounding box of the object
      const box = new THREE.Box3().setFromObject(object);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();

      box.getCenter(center);
      box.getSize(size);

      // Calculate the optimal camera distance
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5; // Add some padding

      // Calculate new camera position relative to the center
      const dir = new THREE.Vector3()
        .subVectors(camera.position, controls.target)
        .normalize();

      const newCameraPos = center.clone().add(dir.multiplyScalar(cameraZ));

      // Animate controls.target and camera.position together
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
          /*
          gsap.to(camera.position, {
            z: 5.5,
            x: -1.8,
            y: 1.5,
            duration: 2,
          });

          gsap.to(controls.target, {
            x: -1.8,
            y: 1.5,
            z: 0,
            duration: 2,
          }
          */
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
      composer.setSize(sizes.width, sizes.height);
      finalComposer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    const handleMousemove = (e) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMousemove);

    // ------------------ Animation Loop ------------------
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
            const group =
              hoverGroups[currentHoveredObject.name] ||
              currentHoveredObject.name;
            playHoverAnimation(group, false);
          }
          const group = hoverGroups[hovered.name] || hovered.name;
          playHoverAnimation(group, true);
          currentHoveredObject = hovered;
        }
        document.body.style.cursor = "pointer";
      } else {
        if (currentHoveredObject) {
          const group =
            hoverGroups[currentHoveredObject.name] || currentHoveredObject.name;
          playHoverAnimation(group, false);
          currentHoveredObject = null;
        }
        document.body.style.cursor = "default";
      }

      scene.traverse(nonBloomed);
      composer.render();
      scene.traverse(restoreMaterial);
      finalComposer.render();

      animationId = requestAnimationFrame(animate);
    };
    animate();

    // ------------------ Cleanup ------------------
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
