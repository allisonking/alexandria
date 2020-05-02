import * as React from "react";
import * as THREE from "three";

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

const InstancedPoints = ({ data }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // update instance matrices only when needed
  React.useEffect(() => {
    const mesh = meshRef.current;

    // set transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      const x = (i % 30) * 1.05;
      const y = Math.floor(i / 30) * 1.05;
      const z = 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
      <meshStandardMaterial attach="material" color="#fff" />
    </instancedMesh>
  );
};

export default InstancedPoints;
