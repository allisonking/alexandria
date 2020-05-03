import * as React from "react";
import * as THREE from "three";

const SELECTED_COLOR = "#6f6";
const DEFAULT_COLOR = "#888";

// re-use for instance computations
const scratchColor = new THREE.Color();

export const usePointColors = ({ data, selectedPoint }) => {
  const numPoints = data.length;
  const colorAttrib = React.useRef();
  const colorArray = React.useMemo(() => new Float32Array(numPoints * 3), [
    numPoints,
  ]);

  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      scratchColor.set(
        data[i] === selectedPoint ? SELECTED_COLOR : DEFAULT_COLOR
      );
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [data, selectedPoint, colorArray]);

  return { colorAttrib, colorArray };
};

export const useMousePointInteraction = ({
  data,
  selectedPoint,
  onSelectPoint,
}) => {
  // track mousedown position to skip click handlers on drags
  const mouseDownRef = React.useRef([0, 0]);
  const handlePointerDown = (e) => {
    mouseDownRef.current[0] = e.clientX;
    mouseDownRef.current[1] = e.clientY;
  };

  const handleClick = (event) => {
    const { instanceId, clientX, clientY } = event;
    const downDistance = Math.sqrt(
      Math.pow(mouseDownRef.current[0] - clientX, 2) +
        Math.pow(mouseDownRef.current[1] - clientY, 2)
    );

    // skip click if we dragged more than 5px distance
    if (downDistance > 5) {
      event.stopPropagation();
      return;
    }

    // index is instanceId if we never change sort order
    console.log("instanceId", instanceId);
    console.log("event", event);
    const index = instanceId;
    const point = data[index];

    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    } else {
      onSelectPoint(point);
    }
  };
  return { handlePointerDown, handleClick };
};

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
