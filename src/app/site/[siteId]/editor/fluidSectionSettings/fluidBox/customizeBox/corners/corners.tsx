import { useState } from "react";
import { Label } from "@/components/ui/label";
import { BorderLocked, BorderUnlocked } from "@/icons/common";
import { CornerRadius, FluidBoxSettings } from "@/types/sectionsTypes/fluid";
import { Shape } from "@/utlis/shapes";
import { cn } from "@/lib/utils";

interface CornersProps {
  fluidCardSettings: FluidBoxSettings;
  selectedShape: Shape;
  handleSettingChange: (settings: Partial<FluidBoxSettings>) => void;
}
function Corners({
  fluidCardSettings,
  selectedShape,
  handleSettingChange,
}: CornersProps) {
  const [borderLocked, setBorderLocked] = useState(true);
  const { bottomLeft, bottomRight, topLeft, topRight } =
    fluidCardSettings.corners || {};
  const defaultRounded = selectedShape.defaultRounded;

  const handleCornerChange = (corner: keyof CornerRadius, value: number) => {
    if (value < 0 || isNaN(value)) value = 0; // Ensure the value is not negative

    if (borderLocked) {
      const currentCornerValue =
        fluidCardSettings.corners?.[corner] || defaultRounded!;
      const delta = value - currentCornerValue; // Calculate the difference

      handleSettingChange({
        corners: {
          topLeft:
            (fluidCardSettings.corners?.topLeft || defaultRounded!) + delta,
          topRight:
            (fluidCardSettings.corners?.topRight || defaultRounded!) + delta,
          bottomLeft:
            (fluidCardSettings.corners?.bottomLeft || defaultRounded!) + delta,
          bottomRight:
            (fluidCardSettings.corners?.bottomRight || defaultRounded!) + delta,
        },
      });
      return;
    }

    handleSettingChange({
      corners: {
        ...fluidCardSettings.corners,
        [corner]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-md mb-3">Corners</Label>

      <span className="text-sm">Radius (px)</span>

      <div className="relative w-64 h-64">
        {/* Corner Visual Elements with dynamic border radius */}
        <div
          className="absolute top-16 left-16 w-12 h-12 border-t-2 border-l border-muted-foreground"
          style={{ borderTopLeftRadius: `${topLeft ?? defaultRounded}px` }}
        ></div>
        <div
          className="absolute top-16 right-16 w-12 h-12 border-t-2 border-r border-muted-foreground"
          style={{ borderTopRightRadius: `${topRight ?? defaultRounded}px` }}
        ></div>
        <div
          className="absolute bottom-16 left-16 w-12 h-12 border-b-2 border-l border-muted-foreground"
          style={{
            borderBottomLeftRadius: `${bottomLeft ?? defaultRounded}px`,
          }}
        ></div>
        <div
          className="absolute bottom-16 right-16 w-12 h-12 border-b-2 border-r border-muted-foreground"
          style={{
            borderBottomRightRadius: `${bottomRight ?? defaultRounded}px`,
          }}
        ></div>

        {/* Inputs - Better aligned with corners */}
        {/* Top Left Input */}
        <div className="absolute top-3 left-16 -ml-8">
          <input
            type="number"
            value={topLeft ?? defaultRounded}
            onChange={(e) => {
              handleCornerChange("topLeft", parseInt(e.target.value));
            }}
            className="w-16 border border-gray-300 rounded p-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Top Right Input */}
        <div className="absolute top-3 right-16 -mr-8">
          <input
            type="number"
            value={topRight ?? defaultRounded}
            onChange={(e) => {
              handleCornerChange("topRight", parseInt(e.target.value));
            }}
            className="w-16 border border-gray-300 rounded p-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Center Icon */}
        <div
          className={cn(
            "absolute cursor-pointer select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded",
            {
              "bg-foreground text-background": !borderLocked,
            }
          )}
          onClick={() => setBorderLocked(!borderLocked)}
        >
          {borderLocked ? <BorderLocked /> : <BorderUnlocked />}
        </div>

        {/* Bottom Left Input */}
        <div className="absolute bottom-3 left-16 -ml-8">
          <input
            type="number"
            value={bottomLeft ?? defaultRounded}
            onChange={(e) => {
              handleCornerChange("bottomLeft", parseInt(e.target.value));
            }}
            className="w-16 border border-gray-300 rounded p-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Bottom Right Input */}
        <div className="absolute bottom-3 right-16 -mr-8">
          <input
            type="number"
            value={bottomRight ?? defaultRounded}
            onChange={(e) => {
              handleCornerChange("bottomRight", parseInt(e.target.value));
            }}
            className="w-16 border border-gray-300 rounded p-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Corners;
