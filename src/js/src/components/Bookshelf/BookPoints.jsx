import * as React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";

import {
  usePointColors,
  useMousePointInteraction,
  usePrevious,
} from "../hooks";
import { useAnimatedLayout, useLayout } from "../layouts";

const Points = ({ data, layout, selectedPoint, onSelectPoint }) => {
  const texture = useLoader(
    THREE.TextureLoader,
    "https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg"
  );
  const texture2 = useLoader(
    THREE.TextureLoader,
    "https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg"
  );

  const prevLayout = usePrevious(layout);
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  // // run the layout, animating on change
  // const { animationProgress } = useAnimatedLayout({
  //   data,
  //   layout,
  //   onFrame: () => {},
  //   // onFrame: () => {
  //   //   console.log("animated", data);
  //   //   updateMesh({ mesh: meshRef.current });
  //   // },
  // });

  const shelfLayout = (i) => {
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;
    const x = col;
    const y = row * 1.05;
    // const z = (numPoints -i) * 0.05
    const z = 0;
    return { x, y, z };
  };

  let theta = 0;
  const spiralLayout = (i) => {
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.6);
    theta += Math.asin(1 / radius) * 1;

    return {
      x: radius * Math.cos(theta),
      y: radius * Math.sin(theta),
      z: i * 0.05,
    };
  };

  const getLayout = (i) => {
    switch (layout) {
      case "spiral":
        return spiralLayout(i);

      case "shelf":
      default: {
        return shelfLayout(i);
      }
    }
  };

  const animProps = useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: prevLayout !== layout,
  });
  console.log("animprops", animProps);

  const { handleClick, handlePointerDown } = useMousePointInteraction({
    data,
    selectedPoint,
    onSelectPoint,
  });

  return (
    <>
      {data.map((d, i) => {
        const { x, y, z } = getLayout(i);

        return (
          <mesh
            key={d.id}
            position={[x, y, z]}
            rotation={[Math.PI * 0.5, 0, 0]}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
          >
            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 1]} />
            <meshStandardMaterial
              attach="material"
              map={i % 2 ? texture : texture2}
            />
          </mesh>
        );
      })}
      {/* {selectedPoint && (
        <a.group
          position={animationProgress.interpolate(() => [
            selectedPoint.x,
            selectedPoint.y,
            selectedPoint.z,
          ])}
        >
          <pointLight
            distance={9}
            position={[0, 0, 0.3]}
            intensity={5}
            decay={30}
            color="#3f3"
          />
          <pointLight
            position={[0, 0, 0]}
            decay={1}
            distance={5}
            intensity={1}
            color="#2f0"
          />
        </a.group>
      )} */}
    </>
  );
};

export default Points;
