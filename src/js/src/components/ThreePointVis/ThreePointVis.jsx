import * as React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "../Controls/Controls";
import InstancedPoints from "../InstancedPoints/InstancedPoints";

const ThreePointVis = ({ data }) => {
  return (
    <Canvas camera={{ position: [0, 0, 80], far: 15000 }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <InstancedPoints data={data} />
    </Canvas>
  );
};

export default ThreePointVis;
