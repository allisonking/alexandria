import * as React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "../Controls/Controls";

const ThreePointVis = ({ data }) => {
  return (
    <Canvas camera={{ position: [0, 0, 40] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      {data.map((d, i) => {
        const x = (i % 30) * 1.05;
        const y = Math.floor(i / 30) * 1.05;
        const z = 0;
        return (
          <mesh
            key={d.id}
            position={[x, y, z]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[0.5, 0.5, 0.15, 32]}
            />
            <meshStandardMaterial attach="material" color="#fff" />
          </mesh>
        );
      })}
    </Canvas>
  );
};

export default ThreePointVis;
