import * as React from "react";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import "./styles.css";

const data = new Array(200).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState("free");
  const [selectedPoint, setSelectedPoint] = React.useState(null);
  console.log("selected point", selectedPoint);

  const visRef = React.useRef();
  const handleResetCamera = () => {
    visRef.current.resetCamera();
  };

  return (
    <div className="App">
      <div className="vis-container">
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
          onClick={() => setLayout("free")}
          className={layout === "free" ? "active" : undefined}
        >
          Free
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
