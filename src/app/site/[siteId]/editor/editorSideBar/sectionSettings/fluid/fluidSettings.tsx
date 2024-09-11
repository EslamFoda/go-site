import React, { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";

function FluidSettings() {
  useEffect(() => {
    var grid = GridStack.init({
      float: true,
      resizable: { handles: "e, se, s, sw, w" },
      acceptWidgets: true,
    });
  });
  return (
    <div className="grid-stack">
      <div
        className="grid-stack-item border-dark bg-primary"
        data-gs-width="4"
        data-gs-height="4"
      >
        <div className="grid-stack-item-content">drag me 1</div>
      </div>
      <div
        className="grid-stack-item border-dark bg-muted"
        data-gs-width="4"
        data-gs-height="4"
      >
        <div className="grid-stack-item-content">drag me 2</div>
      </div>
      <div
        className="grid-stack-item border-dark bg-gray-500"
        data-gs-width="4"
        data-gs-height="4"
      >
        <div className="grid-stack-item-content">drag me 3</div>
      </div>
    </div>
  );
}

export default FluidSettings;
