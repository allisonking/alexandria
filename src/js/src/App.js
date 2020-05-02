import * as React from "react";
import ThreePointVis from "./components/ThreePointVis/ThreePointVis";
import "./styles.css";

const data = new Array(10000).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState("grid");
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointVis
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
        />
      </div>
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
        {selectedPoint && (
          <div className="selected-point">
            You selected <strong>{selectedPoint.id}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
