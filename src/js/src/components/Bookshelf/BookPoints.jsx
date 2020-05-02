import * as React from "react";
import * as THREE from "three";
import { a } from "react-spring/three";

import { usePointColors, useMousePointInteraction } from "../hooks";
import { useAnimatedLayout } from "../layouts";

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

const texture = new THREE.TextureLoader().load(
  "https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg"
);
const updateInstancedMeshMatrices = ({ mesh, data }) => {
  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z } = data[i];

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
};

const InstancedPoints = ({ data, layout, selectedPoint, onSelectPoint }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // run the layout, animating on change
  const { animationProgress } = useAnimatedLayout({
    data,
    layout,
    onFrame: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

  // update instance matrices only when needed
  React.useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [numPoints, data, layout]);

  const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint });
  const { handleClick, handlePointerDown } = useMousePointInteraction({
    data,
    selectedPoint,
    onSelectPoint,
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, numPoints]}
        frustumCulled={false}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 1]}>
          <instancedBufferAttribute
            ref={colorAttrib}
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </boxBufferGeometry>
        <meshStandardMaterial
          attach="material"
          map={texture}
          // transparent={true}
          // opacity={0.9}
          // vertexColors={THREE.VertexColors}
        />
      </instancedMesh>
      {selectedPoint && (
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
      )}
    </>
  );
};

export default InstancedPoints;
