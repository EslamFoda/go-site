import { Label } from "@/components/ui/label";
import React from "react";

interface TextSizeProps {
  label: string;
  titleSizeValue: "s" | "m" | "l";
  onValueChange: (value: "s" | "m" | "l") => void;
}

const TextSize: React.FC<TextSizeProps> = ({
  label,
  titleSizeValue,
  onValueChange,
}) => {
  const sizes = ["s", "m", "l"];

  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => onValueChange(size as "s" | "m" | "l")}
            className={`${
              titleSizeValue === size ? "bg-muted-bg" : "text-muted-foreground"
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <span>{size.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSize;
