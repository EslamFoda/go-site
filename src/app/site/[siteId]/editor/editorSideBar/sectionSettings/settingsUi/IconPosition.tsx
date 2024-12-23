import { IconPositionTypes } from "@/types/sectionsTypes/fluid";
import React from "react";
interface IconPositionProps {
  positionValue: IconPositionTypes;
  onValueChange: (value: IconPositionTypes) => void;
}
function IconPosition({ positionValue, onValueChange }: IconPositionProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-full">
        {["right", "left", "below", "above"].map((alignment) => (
          <div
            key={alignment}
            onClick={() => {
              onValueChange(alignment as IconPositionTypes);
            }}
            className={`${
              positionValue === alignment ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {alignment === "right" && (
              <RightIcon active={positionValue === alignment} />
            )}
            {alignment === "left" && (
              <LeftIcon active={positionValue === alignment} />
            )}
            {alignment === "below" && (
              <BelowIcon active={positionValue === alignment} />
            )}
            {alignment === "above" && (
              <AboveIcon active={positionValue === alignment} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconPosition;
const RightIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="51"
      height="51"
      fill="none"
      viewBox="0 0 51 51"
      className="symbol symbol-ButtonDirectionRow"
    >
      <g className="Thumbnail_Components Popover Menu Layout_Button Position_Right">
        <path
          d="M10 27h17v-3H10v3z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
        <path
          d="M32 25.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
      </g>
    </svg>
  );
};

const LeftIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="51"
      height="51"
      fill="none"
      viewBox="0 0 51 51"
      className="symbol symbol-ButtonDirectionRowReverse"
    >
      <g className="Thumbnail_Components Popover Menu Layout_Button Position_Left">
        <path
          d="M41 24H24v3h17v-3z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
        <path
          d="M19 25.5a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
      </g>
    </svg>
  );
};

const BelowIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="51"
      height="51"
      fill="none"
      viewBox="0 0 51 51"
      className="symbol symbol-ButtonDirectionColumn"
    >
      <g className="Thumbnail_Components Popover Menu Layout_Button Position_Bottom">
        <path
          d="M36 18H15v3h21v-3z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
        <path
          d="M30 29.5a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
      </g>
    </svg>
  );
};

const AboveIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="51"
      height="51"
      fill="none"
      viewBox="0 0 51 51"
      className="symbol symbol-ButtonDirectionColumnReverse"
    >
      <g className="Thumbnail_Components Popover Menu Layout_Button Position_Top">
        <path
          d="M36 31H15v3h21v-3z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
        <path
          d="M21 22.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z"
          className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        ></path>
      </g>
    </svg>
  );
};
