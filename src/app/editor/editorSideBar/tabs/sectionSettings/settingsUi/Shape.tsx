import { Label } from "@/components/ui/label";
import React from "react";
interface ShapeProps {
  shapeValue: "square" | "rounded";
  onValueChange: (value: "square" | "rounded") => void;
}
function Shape({ shapeValue, onValueChange }: ShapeProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Align</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["square", "rounded"].map((shape) => (
          <div
            key={shape}
            onClick={() => {
              onValueChange(shape as "square" | "rounded");
            }}
            className={`${
              shapeValue === shape ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {shape === "square" && (
              <SquareIcon active={shapeValue === shape} />
            )}
            {shape === "rounded" && (
              <RoundedIcon active={shapeValue === shape} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shape;
const SquareIcon = ({ active }: { active: boolean }) => {
  return (
    <div
      className={`w-4 h-4 rounded-sm ${
        active ? "bg-foreground" : "bg-muted"
      }`}
    ></div>
  );
};
const RoundedIcon = ({ active }: { active: boolean }) => {
  return (
    <div
      className={`w-4 h-4 rounded-full ${
        active ? "bg-foreground" : "bg-muted"
      }`}
    ></div>
  );
};
