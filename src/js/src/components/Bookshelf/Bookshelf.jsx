import * as React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "../Controls/Controls";
import BookPoints from "./BookPoints";
import Effects from "../Effects/Effects";
import Background from "../Room/Background";
import { BackDrop, GroundPlane } from "../Room/Room";

const backgroundUrl =
  "https://us.123rf.com/450wm/pogrebkov/pogrebkov1804/pogrebkov180400052/100143207-black-cracked-brick-tiles-wall-texture-dark-old-rough-brickwork-background.jpg?ver=6";

const Bookshelf = (
  { data, layout, selectedPoint, onSelectPoint, setLayout },
  ref
) => {
  const controlsRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    resetCamera: () => {
      return controlsRef.current.resetCamera();
    },
  }));
  return (
    <Canvas
      camera={{ position: [0, 0, 20], far: 15000 }}
      style={{
        // background:
        // "radial-gradient(at 50% 60%, #873740 0%, #272730 40%, #171720 80%, #070710 100%)",
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      >
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
          setLayout={setLayout}
        />
      </React.Suspense>
      {/* <Effects /> */}
    </Canvas>
  );
};

export default React.forwardRef(Bookshelf);
