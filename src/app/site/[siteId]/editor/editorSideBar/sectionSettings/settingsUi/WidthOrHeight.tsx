import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";
interface WidthOrHeightProps {
  label: string;
  min: number;
  max: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  customText: string;
}
function WidthOrHeight({
  label,
  min,
  max,
  value,
  onValueChange,
  customText,
}: WidthOrHeightProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        <Slider
          customText={customText}
          min={min}
          max={max}
          value={value}
          defaultValue={value}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
}

export default WidthOrHeight;
