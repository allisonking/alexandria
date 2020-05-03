import * as React from "react";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import "./styles.css";

const data = new Array(200).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState("shelf");
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const visRef = React.useRef();
  const handleResetCamera = () => {
    visRef.current.resetCamera();
  };

  return (
    <div className="App">
      <div className="vis-container">
        {/* <ThreePointVis
          ref={visRef}
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
        /> */}

        <Bookshelf
          ref={visRef}
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
        />
      </div>
      <button className="reset-button" onClick={handleResetCamera}>
        Reset Camera
      </button>
      <div className="controls">
        <strong>Layouts</strong>{" "}
        <button
          onClick={() => setLayout("grid")}
          className={layout === "grid" ? "active" : undefined}
        >
          Grid
        </button>
        <button
          onClick={() => setLayout("spiral")}
          className={layout === "spiral" ? "active" : undefined}
        >
          Spiral
        </button>
        <button
          onClick={() => setLayout("shelf")}
          className={layout === "shelf" ? "active" : undefined}
        >
          Shelf
        </button>
        {selectedPoint && (
          <div className="selected-point">
            You selected <strong>{selectedPoint.id}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
