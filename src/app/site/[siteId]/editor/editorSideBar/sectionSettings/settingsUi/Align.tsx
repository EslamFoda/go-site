import { Label } from "@/components/ui/label";
import React from "react";

interface AlignProps {
  alignValue: string;
  alignments?: readonly string[];
  noLabel?: boolean;
  onValueChange: (value: string) => void;
}

interface IconProps {
  active: boolean;
}

const DEFAULT_ALIGNMENTS = ["start", "center", "end"] as const;

const ICONS: Record<string, React.FC<IconProps>> = {
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

function Align({
  alignValue,
  alignments = DEFAULT_ALIGNMENTS,
  noLabel,
  onValueChange,
}: AlignProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      {!noLabel && <Label>Align</Label>}
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {alignments.map((alignment) => (
          <div
            key={alignment}
            onClick={() => onValueChange(alignment)}
            className={`${
              alignValue === alignment ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {ICONS[alignment]
              ? React.createElement(ICONS[alignment], {
                  active: alignValue === alignment,
                })
              : alignment}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Align;
