import { Label } from "@/components/ui/label";
import React from "react";

interface FillOrFitProps {
  label: string;
  widthValue: "fill" | "fit";
  onValueChange: (value: "fill" | "fit") => void;
}

const FillOrFit: React.FC<FillOrFitProps> = ({
  label,
  widthValue,
  onValueChange,
}) => {
  const displayTypes = ["fill", "fit"];

  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {displayTypes.map((type) => (
          <div
            key={type}
            onClick={() => onValueChange(type as "fill" | "fit")}
            className={`${
              widthValue === type ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FillOrFit;
