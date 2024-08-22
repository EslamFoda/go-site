import React, { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateDesignSettings } from "@/reduxStore/action";

type ShapeOption = "square" | "rounded-sm" | "rounded-full";

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

const Shape: React.FC = () => {
  const dispatch = useAppDispatch();
  const designSettings = useAppSelector((state) => state.editor.designSettings);

  const shapeValue = useCallback((radius: string): ShapeOption => {
    switch (radius) {
      case "0":
        return "square";
      case "0.5rem":
        return "rounded-sm";
      case "1.3rem":
        return "rounded-full";
      default:
        return "square";
    }
  }, []);

  const updateCSSVariable = useCallback((shape: ShapeOption) => {
    const pageContainer = document.querySelector(".page-container");
    if (pageContainer) {
      let radiusValue = "0";
      switch (shape) {
        case "rounded-sm":
          radiusValue = "0.5rem";
          break;
        case "rounded-full":
          radiusValue = "1.3rem";
          break;
      }
      (pageContainer as HTMLElement).style.setProperty("--radius", radiusValue);
    }
  }, []);

  const handleShapeChange = (shape: ShapeOption) => {
    let radiusValue = "0";
    switch (shape) {
      case "rounded-sm":
        radiusValue = "0.5rem";
        break;
      case "rounded-full":
        radiusValue = "1.3rem";
        break;
    }
    dispatch(
      updateDesignSettings({ ...designSettings, borderRadius: radiusValue })
    );
    updateCSSVariable(shape);
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
              shapeValue(designSettings.borderRadius) === shape && "bg-muted-bg"
            )}
            aria-label={`Select ${shape} shape`}
            aria-pressed={shapeValue(designSettings.borderRadius) === shape}
          >
            <ShapeIcon
              active={shapeValue(designSettings.borderRadius) === shape}
              shape={shape}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shape;
