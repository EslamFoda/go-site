import { Label } from "@/components/ui/label";
import { getCSSVariableValueByClassName } from "@/helper";
import { useAppSelector } from "@/reduxStore/hooks";
import React from "react";
interface ListIconColorProps {
  iconColorValue: "none" | "primary";
  onValueChange: (value: "none" | "primary") => void;
}
function ListIconColor({ iconColorValue, onValueChange }: ListIconColorProps) {
  const selectedPallet = useAppSelector(
    (state) => state.editor.present.selectedPallet
  );
  const primaryColor = getCSSVariableValueByClassName(
    "page-container",
    "--primary"
  );
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Color</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["none", "primary"].map((iconColor) => (
          <div
            key={iconColor}
            onClick={() => {
              onValueChange(iconColor as "none" | "primary");
            }}
            className={`${
              iconColorValue === iconColor ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <div>
              {iconColor === "none" && <RoundedIcon color="bg-muted" />}
            </div>
            <div
              className={selectedPallet}
              style={{ "--primary": primaryColor } as React.CSSProperties}
            >
              {iconColor === "primary" && <RoundedIcon color="bg-primary" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListIconColor;

const RoundedIcon = ({ color }: { color: string }) => {
  return <div className={`w-4 h-4 rounded-full ${color}`}></div>;
};
