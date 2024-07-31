import React, { useMemo } from "react";
import ColorPicker from "./colorPicker";
import Shape from "./shape";
import { getCSSVariableValueByClassName } from "@/helper";

function Customize() {
  const radiusValue = getCSSVariableValueByClassName(
    "page-container",
    "--radius"
  );

  const initialShape = useMemo(() => {
    switch (radiusValue) {
      case "none":
      case "0":
        return "square";
      case "0.5rem":
        return "rounded-sm";
      case "1.5rem":
        return "rounded-full";
      default:
        return "square"; // Default to square if the value is unexpected
    }
  }, [radiusValue]);

  return (
    <div className="space-y-4">
      <ColorPicker />
      <Shape initialShape={initialShape} />
    </div>
  );
}

export default Customize;
