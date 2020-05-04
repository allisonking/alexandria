import React from "react";
import { useThree, useLoader } from "react-three-fiber";
import { TextureLoader, LinearFilter } from "three";

export function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="brown" />
    </mesh>
  );
}

function Background({ textureUrl }) {
  const { viewport, aspect } = useThree();
  console.log("viewport", viewport, "aspect", aspect);
  const texture = useLoader(TextureLoader, textureUrl);

  React.useMemo(() => (texture.minFilter = LinearFilter), [texture.minFilter]);
  // Calculates a plane filling the screen similar to background-size: cover
  const adaptedHeight =
    3800 *
    (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800);
  const adaptedWidth =
    5000 *
    (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800);

  return (
    <mesh receiveShadow scale={[adaptedWidth, adaptedHeight, 1]}>
      <planeBufferGeometry
        attach="geometry"
        args={[adaptedWidth, adaptedHeight]}
      />
      <meshBasicMaterial attach="material" map={texture} depthTest={false} />
    </mesh>
  );
}

export default Background;
