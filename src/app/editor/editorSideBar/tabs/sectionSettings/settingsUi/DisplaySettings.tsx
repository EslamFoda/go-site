import { Label } from "@/components/ui/label";
import React from "react";

interface DisplaySettingsProps {
  label: string;
  displayValue: "grid" | "carousel";
  onValueChange: (value: "grid" | "carousel") => void;
}

const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  label,
  displayValue,
  onValueChange,
}) => {
  const displayTypes = ["grid", "carousel"];

  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {displayTypes.map((type) => (
          <div
            key={type}
            onClick={() => onValueChange(type as "grid" | "carousel")}
            className={`${
              displayValue === type ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplaySettings;
