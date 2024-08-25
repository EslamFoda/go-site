import { Label } from "@/components/ui/label";
import React from "react";
interface AnnouncementPosProps {
  positionValue: "above" | "below";
  onValueChange: (value: "above" | "below") => void;
}
function AnnouncementPos({
  positionValue,
  onValueChange,
}: AnnouncementPosProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Position</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["above", "below"].map((position) => (
          <div
            key={position}
            onClick={() => {
              onValueChange(position as "above" | "below");
            }}
            className={`${
              positionValue === position ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {position === "above" && <span>above</span>}
            {position === "below" && <span>below</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementPos;
