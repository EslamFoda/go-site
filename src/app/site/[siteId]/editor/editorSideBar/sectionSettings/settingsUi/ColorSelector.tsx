import React from "react";
import { Label } from "@/components/ui/label";
import { NoColorIcon } from "@/icons/common";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/reduxStore/hooks";
import { getCSSVariableValueByClassName } from "@/helper/index";

type Color = "none" | "gray" | "primary";

interface ColorSelectorProps {
  selectedColor: Color | undefined;
  handleChangeColor: (color: Color) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  handleChangeColor,
}) => {
  const selectedPallet = useAppSelector(
    (state) => state.editor.present.selectedPallet
  );
  const colors: Color[] = ["none", "gray", "primary"];

  const colorsHandler = (color: Color) => {
    return cn(
      "w-4 h-4 rounded-full",
      color === "gray" && "bg-muted",
      color === "primary" && "bg-primary"
    );
  };

  const handleColorClick = (color: Color) => {
    handleChangeColor(color);
  };

  const primaryColor = getCSSVariableValueByClassName(
    "page-container",
    "--primary"
  );

  return (
    <div
      className={`${selectedPallet} space-y-1 flex items-center justify-between`}
      style={{ "--primary": primaryColor } as React.CSSProperties}
    >
      <Label>Color</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-[4px] h-10 w-4/6">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorClick(color)}
            className={`${
              selectedColor === color ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <div>
              {color === "none" ? (
                <NoColorIcon />
              ) : (
                <div className={colorsHandler(color)}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
