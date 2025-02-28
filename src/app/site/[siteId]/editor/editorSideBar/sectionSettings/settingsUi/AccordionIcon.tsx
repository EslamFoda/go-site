import { Label } from "@/components/ui/label";
import { AccordionIconType } from "@/types/sectionsTypes/accordion/accordion";
import { ChevronDown, Plus } from "lucide-react";
import React from "react";
interface AccordionIconProps {
  iconValue: AccordionIconType;
  onValueChange: (value: AccordionIconType) => void;
}
function AccordionIcon({ iconValue, onValueChange }: AccordionIconProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Icon</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {[AccordionIconType.ARROW, AccordionIconType.PLUS].map((icon) => (
          <div
            key={icon}
            onClick={() => {
              onValueChange(icon as AccordionIconType);
            }}
            className={`${
              iconValue === icon ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {icon === AccordionIconType.ARROW && <ChevronDown size={18} />}
            {icon === AccordionIconType.PLUS && <Plus size={18} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccordionIcon;
