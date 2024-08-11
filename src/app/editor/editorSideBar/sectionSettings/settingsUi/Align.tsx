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
      data-v-b69aee76=""
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-b69aee76=""
        d="M2 2V22H4V2H2Z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
      <path
        data-v-b69aee76=""
        d="m22 8.5h-15v7h15v-7z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  );
};

const AlignCenterIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-b69aee76=""
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-b69aee76=""
        d="m11 15.5v6.5h2v-6.5h9v-7h-9v-6.5h-2v6.5h-9v7h9z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  );
};

const AlignEndIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-b69aee76=""
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-b69aee76=""
        d="M20 2V22H22V2H20Z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
      <path
        data-v-b69aee76=""
        d="m17 8.5h-15v7h15v-7z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  );
};
