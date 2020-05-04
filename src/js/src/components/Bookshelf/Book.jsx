import * as React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { a } from "react-spring/three";

const Book = ({
  position,
  onClick,
  onPointerDown,
  textureUrl,
  dimensions,
  data,
}) => {
  const ref = React.useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const handleClick = () => {
    // attach position data
    data.position = position;
    const rotated = ref.current.rotation.x === Math.PI / 4;
    if (data.trigger) {
      if (rotated) {
        ref.current.rotation.x = 0;
      } else {
        ref.current.rotation.x = Math.PI / 4;
      }
    }
    onClick(data, data.trigger && !rotated);
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

export default Book;
