import { Label } from "@/components/ui/label";
import React from "react";
interface AlignProps {
  alignValue: "start" | "center" | "end";
  onValueChange: (value: "start" | "center" | "end") => void;
}
function Align({ alignValue, onValueChange }: AlignProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Align</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["start", "center", "end"].map((alignment) => (
          <div
            key={alignment}
            onClick={() => {
              onValueChange(alignment as "start" | "center" | "end");
            }}
            className={`${
              alignValue === alignment ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {alignment === "start" && (
              <AlignStartIcon active={alignValue === alignment} />
            )}
            {alignment === "center" && (
              <AlignCenterIcon active={alignValue === alignment} />
            )}
            {alignment === "end" && (
              <AlignEndIcon active={alignValue === alignment} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Align;
const AlignStartIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-62352d9f=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-62352d9f=""
        d="M2 2V22M7 9H22V15H7V9Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
      ></path>
    </svg>
  );
};
const AlignCenterIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-62352d9f=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-62352d9f=""
        d="M12 2V9M12 15V22M3 9H21V15H3V9Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
      ></path>
    </svg>
  );
};
const AlignEndIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-62352d9f=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-62352d9f=""
        d="M22 2V22M2 9H17V15H2V9Z"
        className={`${active ? "stroke-primary" : "stroke-primary"}`}
      ></path>
    </svg>
  );
};
