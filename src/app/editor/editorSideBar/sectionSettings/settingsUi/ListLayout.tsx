import { Label } from "@/components/ui/label";
import React from "react";
interface ListLayoutProps {
  layoutValue: "row" | "col";
  onValueChange: (value: "row" | "col") => void;
}
function ListLayout({ layoutValue, onValueChange }: ListLayoutProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Align</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["row", "col"].map((alignment) => (
          <div
            key={alignment}
            onClick={() => {
              onValueChange(alignment as "row" | "col");
            }}
            className={`${
              layoutValue === alignment ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {alignment === "row" && (
              <RowIcon active={layoutValue === alignment} />
            )}
            {alignment === "col" && (
              <ColIcon active={layoutValue === alignment} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListLayout;
const RowIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-v-606de803=""
      width={16}
      height={16}
    >
      <path
        d="m14 8h8v2h-8v-2z"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
      ></path>
      <path
        d="m14 14h8v2h-8v-2z"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
      ></path>
      <path
        d="m2 8h8v8h-8v-8z"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
      ></path>
    </svg>
  );
};
const ColIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-v-606de803=""
      width={16}
      height={16}
    >
      <path
        d="M2 20H22V22H2V20Z"
        clipRule="evenodd"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
        fillRule="evenodd"
      ></path>
      <path
        d="M2 14H22V16H2V14Z"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
      ></path>
      <path
        d="m2 2h8v8h-8v-8z"
        className={`${active ? "fill-foreground" : "fill-primary"}`}
      ></path>
    </svg>
  );
};
