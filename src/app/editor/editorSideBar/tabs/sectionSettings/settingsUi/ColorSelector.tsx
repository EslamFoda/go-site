import React from "react";
import { Label } from "@/components/ui/label";
import { NoColorIcon } from "@/icons/common";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/reduxStore/hooks";

type Color = "none" | "gray" | "primary";

interface ColorSelectorProps {
  selectedColor: Color | undefined;
  handleChangeColor: (color: Color) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  handleChangeColor,
}) => {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
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

  return (
    <div
      className={`${selectedPallet} space-y-1 flex items-center justify-between`}
    >
      <Label>Color</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
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
