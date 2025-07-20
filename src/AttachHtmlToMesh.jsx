import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useEffect, useState, useRef } from "react";
import { Vector3 } from "three";
import { navConfig } from "./navConfig.js";

export default function AttachHtmlToMesh({ mesh, children }) {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [position, setPosition] = useState([0, 0, 0]);
  const hasCalculated = useRef(false);
  const lastMeshUUID = useRef(null);

  const configEntry = Object.values(navConfig).find(
    (entry) => entry.target === mesh?.name,
  );

  useEffect(() => {
    // Reset when the mesh changes
    if (mesh?.uuid !== lastMeshUUID.current) {
      hasCalculated.current = false;
      lastMeshUUID.current = mesh?.uuid;
    }
  }, [mesh]);

  useFrame(() => {
    if (!mesh || !configEntry || hasCalculated.current) return;

    mesh.geometry?.computeBoundingBox();
    const box = mesh.geometry?.boundingBox;

    if (box) {
      const axisMap = {
        x: box.max.x - box.min.x,
        y: box.max.y - box.min.y,
        z: box.max.z - box.min.z,
      };

      const width = axisMap[configEntry.htmlSizeAxis[0]] || 1;
      const height = axisMap[configEntry.htmlSizeAxis[1]] || 1;

      const center = new Vector3();
      box.getCenter(center);
      mesh.localToWorld(center);

      setSize({ width, height });
      setPosition([
        center.x + configEntry.htmlOffset[0],
        center.y + configEntry.htmlOffset[1],
        center.z + configEntry.htmlOffset[2],
      ]);

      hasCalculated.current = true;
    }
  });

  if (!mesh || !configEntry) return null;

  return (
    <Html
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
