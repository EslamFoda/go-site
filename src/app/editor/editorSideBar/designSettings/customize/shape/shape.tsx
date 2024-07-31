import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Adjust this import path as needed

type ShapeOption = "square" | "rounded-sm" | "rounded-full";

interface ShapeProps {
  initialShape?: ShapeOption;
  onChange?: (shape: ShapeOption) => void;
}

interface ShapeIconProps {
  active: boolean;
  shape: ShapeOption;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ active, shape }) => {
  return (
    <div
      className={cn("w-5 h-3 bg-muted", {
        "bg-foreground": active,
        "rounded-none": shape === "square",
        "rounded-sm": shape === "rounded-sm",
        "rounded-full": shape === "rounded-full",
      })}
    />
  );
};

const Shape: React.FC<ShapeProps> = ({ initialShape = "square", onChange }) => {
  const [shapeValue, setShapeValue] = useState<ShapeOption>(initialShape);

  const updateCSSVariable = useCallback((shape: ShapeOption) => {
    const pageContainer = document.querySelector(".page-container");
    if (pageContainer) {
      let radiusValue = "none";
      switch (shape) {
        case "rounded-sm":
          radiusValue = "0.5rem";
          break;
        case "rounded-full":
          radiusValue = "1.5rem";
          break;
        default:
          radiusValue = "0";
      }
      (pageContainer as HTMLElement).style.setProperty("--radius", radiusValue);
    }
  }, []);

  const handleShapeChange = (shape: ShapeOption) => {
    setShapeValue(shape);
    updateCSSVariable(shape);
    onChange?.(shape);
  };

  return (
    <div className="flex items-center justify-between space-y-1">
      <Label htmlFor="shape-selector">Shape</Label>
      <div
        id="shape-selector"
        className="flex w-4/6 h-10 border border-solid border-muted-bg rounded-sm"
      >
        {(["square", "rounded-sm", "rounded-full"] as const).map((shape) => (
          <button
            key={shape}
            onClick={() => handleShapeChange(shape)}
            className={cn(
              "flex items-center justify-center w-full cursor-pointer",
              shapeValue === shape && "bg-muted-bg"
            )}
            aria-label={`Select ${shape} shape`}
            aria-pressed={shapeValue === shape}
          >
            <ShapeIcon active={shapeValue === shape} shape={shape} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shape;
