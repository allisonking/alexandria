import * as React from "react";
import Book from "./Book";
import { useThree } from "react-three-fiber";
import { config } from "react-spring";
import { a, useSprings } from "react-spring/three";

const Points = ({ data, layout, selectedPoint, onSelectPoint }) => {
  const texture1 =
    "https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg";
  const texture2 =
    "https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg";

  const bookDimensions = [1, 2, 1];

  const shelf = (i) => {
    const numCols = Math.ceil(Math.sqrt(data.length));
    const numRows = numCols;
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;
    const position = [
      col * bookDimensions[0] * 1.1,
      row * bookDimensions[1] * 1.1,
      0,
    ];
    return {
      position: position,
    };
  };

  const random = (i) => {
    return {
      position: [25 - Math.random() * 50, 25 - Math.random() * 50, i * 0.05],
    };
  };

  let layoutFunc = random;
  if (layout === "shelf") {
    layoutFunc = shelf;
  }
  config.free = { mass: 40, tension: 150, friction: 100 };

  const [springs, set] = useSprings(data.length, (i) => ({
    from: layoutFunc(i),
    ...layoutFunc(i),
    // config: { mass: 40, tension: 150, friction: 100 },
    config: config.free,
  }));

  React.useEffect(() => {
    switch (layout) {
      case "shelf":
        set((i) => {
          return { ...shelf(i), delay: i * 5, config: config.gentle };
        });
        break;
      case "free":
      default: {
        // do once since otherwise have to wait 3 sec
        set((i) => ({ ...random(i), delay: i * 5, config: config.free }));
        const interval = setInterval(
          () =>
            set((i) => ({
              ...random(i),
              delay: i * 5,
              config: config.free,
            })),
          3000
        );
        return () => clearInterval(interval);
      }
    }
  }, [layout]);

  const handleClick = (d) => {
    if (selectedPoint && d.id === selectedPoint.id) {
      onSelectPoint(undefined);
    } else {
      console.log("selecting point d", d);
      onSelectPoint(d);
    }
  };

  return (
    <>
      {data.map((d, i) => {
        return (
          <Book
            key={d.id}
            data={d}
            position={springs[i].position}
            dimensions={bookDimensions}
            onClick={handleClick}
            textureUrl={i % 2 ? texture1 : texture2}
          />
        );
      })}
      {selectedPoint && (
        <a.group position={selectedPoint.position}>
          <pointLight
            distance={9}
            position={[0, 0, 1]}
            intensity={4}
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

export default Points;
