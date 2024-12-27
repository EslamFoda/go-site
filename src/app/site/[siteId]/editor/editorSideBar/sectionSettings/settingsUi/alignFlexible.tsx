import { Label } from "@/components/ui/label";
import React from "react";
type AlignmentType = "start" | "center" | "end";
interface AlignProps {
  alignments?:
    | readonly [
        {
          readonly value: "start";
          readonly icon: "start";
        },
        {
          readonly value: "center";
          readonly icon: "center";
        },
        {
          readonly value: "end";
          readonly icon: "end";
        }
      ]
    | readonly [
        {
          readonly value: "end";
          readonly icon: "start";
        },
        {
          readonly value: "center";
          readonly icon: "center";
        },
        {
          readonly value: "start";
          readonly icon: "end";
        }
      ]; // Pass alignments that could be in any order
  alignValue: AlignmentType;
  noLabel?: boolean;
  onValueChange: (value: AlignmentType) => void;
}

interface IconProps {
  active: boolean;
}

const DEFAULT_ALIGNMENTS = [
  { value: "start", icon: "start" },
  { value: "center", icon: "center" },
  { value: "end", icon: "end" },
] as const;

const ICONS = {
  start: ({ active }: IconProps) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2V22H4V2H2Z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
      <path
        d="m22 8.5h-15v7h15v-7z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  ),
  center: ({ active }: IconProps) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11 15.5v6.5h2v-6.5h9v-7h-9v-6.5h-2v6.5h-9v7h9z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  ),
  end: ({ active }: IconProps) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2V22H22V2H20Z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
      <path
        d="m17 8.5h-15v7h15v-7z"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
      ></path>
    </svg>
  ),
};

function AlignFlexible({
  alignments = DEFAULT_ALIGNMENTS,
  alignValue,
  noLabel,
  onValueChange,
}: AlignProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      {!noLabel && <Label>Align</Label>}
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {alignments.map((alignment) => (
          <div
            key={alignment.value}
            onClick={() => onValueChange(alignment.value)}
            className={`${
              alignValue === alignment.value ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {React.createElement(ICONS[alignment.icon], {
              active: alignValue === alignment.value,
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlignFlexible;
