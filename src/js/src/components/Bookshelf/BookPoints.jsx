import * as React from "react";
import Book from "./Book";
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
    const position = [col * 1.05, row * 1.2, 0];
    return {
      // position: [10 - Math.random() * 20, 10 - Math.random() * 20, i * 0.5],
      position: position,
    };
  };

  const random = (i) => {
    const r = Math.random();
    return {
      position: [10 - Math.random() * 20, 10 - Math.random() * 20, i * 0.5],
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

  return (
    <>
      {data.map((d, i) => {
        return (
          <Book
            key={d.id}
            position={springs[i].position}
            dimensions={bookDimensions}
            textureUrl={i % 2 ? texture1 : texture2}
          />
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
