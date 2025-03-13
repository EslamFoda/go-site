import { Label } from "@/components/ui/label";
import React from "react";

interface ToggleOptionProps<T extends string> {
  value: T;
  label: string | React.ReactNode;
}

interface ToggleGroupProps<T extends string> {
  label?: string;
  options: ToggleOptionProps<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  toggleClassName?: string;
  activeClassName?: string;
}

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onValueChange,
  className = "space-y-1 flex items-center justify-between",
  toggleClassName = "border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6",
  activeClassName = "bg-muted-bg",
}: ToggleGroupProps<T>) {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className={toggleClassName}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`${
              value === option.value ? activeClassName : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToggleGroup;
