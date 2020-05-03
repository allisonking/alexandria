import * as React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "../Controls/Controls";
import BookPoints from "./BookPoints";
import Effects from "../Effects/Effects";

const ThreePointVis = ({ data, layout, selectedPoint, onSelectPoint }, ref) => {
  const controlsRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    },
  }));
  return (
    <Canvas camera={{ position: [0, 0, 10], far: 15000 }}>
      <Controls ref={controlsRef} />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <React.Suspense fallback={<mesh />}>
        <BookPoints
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={onSelectPoint}
        />
      </React.Suspense>
      <Effects />
    </Canvas>
  );
};

export default React.forwardRef(ThreePointVis);
