import * as React from "react";
import ThreePointVis from "./components/ThreePointVis/ThreePointVis";
import "./styles.css";

const data = new Array(1000).fill(0).map((d, id) => ({ id }));

export default function App() {
  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointVis data={data} />
      </div>
    </div>
  );
}
