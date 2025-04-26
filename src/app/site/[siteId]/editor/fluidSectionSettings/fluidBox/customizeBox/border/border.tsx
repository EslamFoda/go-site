import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { FluidBoxSettings } from "@/types/sectionsTypes/fluid";
import { Shape } from "@/utlis/shapes";
import React from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
interface BorderProps {
  selectedShape: Shape;
  fluidCardSettings: FluidBoxSettings;
  handleSettingChange: (settings: Partial<FluidBoxSettings>) => void;
}
function Border({
  selectedShape,
  fluidCardSettings,
  handleSettingChange,
}: BorderProps) {
  const handleBorderColorChange = (color: string) => {
    handleSettingChange({
      border: { color, width: fluidCardSettings.border?.width },
    });
  };
  const handleBorderWidthChange = (value: number[]) => {
    handleSettingChange({
      border: { width: value[0], color: fluidCardSettings.border?.color },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <Label className="text-md mb-3">Border</Label>

        <span className="text-sm">Opacity & color</span>
        <Popover>
          <PopoverTrigger>
            <HexColorInput
              prefixed
              className="px-2 bg-foreground border text-background focus:outline-none focus-within:outline-none outline-none h-10 w-full"
              style={{
                backgroundColor:
                  fluidCardSettings.border?.color ||
                  selectedShape.defaultBorderColor,
              }}
              color={
                fluidCardSettings.border?.color ||
                selectedShape.defaultBorderColor
              }
              onChange={handleBorderColorChange}
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="border-none w-auto p-0">
            <HexAlphaColorPicker
              color={
                fluidCardSettings.border?.color ||
                selectedShape.defaultBorderColor
              }
              onChange={handleBorderColorChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="border-muted-bg flex border-solid border-b border-[1px] w-full" />

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">Border width</span>
        </div>
        <div className="border-muted-bg flex border-solid border-[1px] h-10 w-full">
          <Slider
            trackClassName="rounded-none"
            customText={
              (fluidCardSettings.border?.width || selectedShape.defaultRounded!) +
              "px"
            }
            defaultValue={[fluidCardSettings.border?.width ?? 0]}
            max={15}
            step={1}
            value={[fluidCardSettings.border?.width ?? 0]}
            onValueChange={handleBorderWidthChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Border;
