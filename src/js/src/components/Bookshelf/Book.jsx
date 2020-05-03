import * as React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { a } from "react-spring/three";

const Book = (
  { position, onClick, onPointerDown, textureUrl, bookDimensions },
  ref
) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  //   console.log("position", position);
  return (
    <a.mesh
      ref={ref}
      position={position}
      rotation={[Math.PI * 0.5, 0, 0]}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <boxBufferGeometry attach="geometry" args={bookDimensions} />
      <meshStandardMaterial attach="material" map={texture} />
    </a.mesh>
  );
};

export default React.forwardRef(Book);
