import * as React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { a } from "react-spring/three";

const Book = (
  { position, onClick, onPointerDown, textureUrl, dimensions, data },
  ref
) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const handleClick = () => {
    // attach position data
    data.position = position;
    onClick(data);
  };

  return (
    <a.mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerDown={onPointerDown}
    >
      <boxBufferGeometry attach="geometry" args={dimensions} />
      <meshStandardMaterial attach="material" map={texture} />
    </a.mesh>
  );
};

export default React.forwardRef(Book);
