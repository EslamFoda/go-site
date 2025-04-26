import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { FluidBoxSettings } from "@/types/sectionsTypes/fluid";
import { Shape } from "@/utlis/shapes";
import React, { useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

interface BackgroundProps {
  selectedShape: Shape;
  fluidCardSettings: FluidBoxSettings;
  handleSettingChange: (settings: Partial<FluidBoxSettings>) => void;
}

function Background({
  selectedShape,
  fluidCardSettings,
  handleSettingChange,
}: BackgroundProps) {
  // Store the original color to restore it when glass effect is disabled
  const [originalColor, setOriginalColor] = useState(
    fluidCardSettings.bgColor || selectedShape.defaultBgColor
  );

  const handleColorChange = (color: string) => {
    setOriginalColor(color); // Update original color when color picker changes
    handleSettingChange({ bgColor: color }); // Apply the color as selected
  };

  const handleGlassEffectChange = (checked: boolean) => {
    if (checked) {
      // Apply 15% opacity when glass effect is enabled, but only if not already set
      const currentColor = fluidCardSettings.bgColor || originalColor;
      const colorWithOpacity = `${currentColor.slice(0, 7)}26`; // 26 in hex is ~15% opacity
      handleSettingChange({ glassEffect: checked, bgColor: colorWithOpacity });
    } else {
      // Restore original color when glass effect is disabled
      handleSettingChange({ glassEffect: checked, bgColor: originalColor });
    }
  };

  return (
    <div className="flex flex-col gap-3 pb-2">
      <Label className="text-md mb-3">Fill color & opacity</Label>

      <span className="text-sm">Background</span>

      <Popover>
        <PopoverTrigger>
          <HexColorInput
            prefixed
            className="px-2 bg-foreground border text-background focus:outline-none focus-within:outline-none outline-none h-10 w-full"
            style={{
              backgroundColor:
                fluidCardSettings.bgColor || selectedShape.defaultBgColor,
            }}
            color={fluidCardSettings.bgColor || selectedShape.defaultBgColor}
            onChange={handleColorChange}
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="border-none w-auto p-0">
          <HexAlphaColorPicker
            color={fluidCardSettings.bgColor || selectedShape.defaultBgColor}
            onChange={handleColorChange}
          />
        </PopoverContent>
      </Popover>

      {selectedShape.id === "square" && (
        <>
          <div className="border-muted-bg flex border-solid border-b border-[1px] w-full" />

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <Label>Apply glass effect</Label>
              <Switch
                defaultChecked={fluidCardSettings.glassEffect}
                checked={fluidCardSettings.glassEffect}
                onCheckedChange={handleGlassEffectChange}
              />
            </div>
            {fluidCardSettings.glassEffect && (
              <>
                <div className="border-muted-bg flex border-solid border-b border-[1px] w-full" />
                <div className="flex flex-col gap-3">
                  <span className="text-sm">Blur intensity</span>
                  <div className="border-muted-bg flex border-solid border-[1px] h-10 w-full">
                    <Slider
                      trackClassName="rounded-none"
                      customText={
                        (fluidCardSettings.blur || selectedShape.defaultBlur!) +
                        "px"
                      }
                      defaultValue={[
                        fluidCardSettings.blur || selectedShape.defaultBlur!,
                      ]}
                      step={1}
                      min={1}
                      max={50}
                      value={[
                        fluidCardSettings.blur || selectedShape.defaultBlur!,
                      ]}
                      onValueChange={(value) =>
                        handleSettingChange({ blur: value[0] })
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Background;
