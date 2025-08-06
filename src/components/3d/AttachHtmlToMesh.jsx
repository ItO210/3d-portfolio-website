import { Html } from "@react-three/drei";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Vector3 } from "three";
import { navConfig } from "../../utils/navConfig.js";

export default function AttachHtmlToMesh({ mesh, children }) {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [position, setPosition] = useState([0, 0, 0]);
  const htmlRef = useRef();

  const configEntry = Object.values(navConfig).find(
    (entry) => entry.target === mesh?.name,
  );

  // Step 1: Set the size
  useLayoutEffect(() => {
    if (!mesh || !configEntry) return;

    mesh.geometry?.computeBoundingBox();
    const box = mesh.geometry?.boundingBox;
    if (!box) return;

    const axisMap = {
      x: box.max.x - box.min.x,
      y: box.max.y - box.min.y,
      z: box.max.z - box.min.z,
    };

    const width = axisMap[configEntry.htmlSizeAxis[0]] || 1;
    const height = axisMap[configEntry.htmlSizeAxis[1]] || 1;
    setSize({ width, height });
  }, [mesh, configEntry]);

  // Step 2: After size has been applied and rendered
  useEffect(() => {
    if (!mesh || !configEntry) return;

    const raf = requestAnimationFrame(() => {
      // Now that size is applied, compute position
      const box = mesh.geometry?.boundingBox;
      if (!box) return;

      const center = new Vector3();
      box.getCenter(center);
      mesh.localToWorld(center);

      setPosition([
        center.x + configEntry.htmlOffset[0],
        center.y + configEntry.htmlOffset[1],
        center.z + configEntry.htmlOffset[2],
      ]);
    });

    return () => cancelAnimationFrame(raf);
  }, [size, mesh, configEntry]);

  if (!mesh || !configEntry) return null;

  return (
    <Html
      ref={htmlRef}
      position={position}
      rotation={configEntry.htmlRotation}
      transform
      occlude="blending"
      distanceFactor={0.4}
      center
      style={{
        width: `${size.width * 1000}px`,
        height: `${size.height * 1000}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </Html>
  );
}
