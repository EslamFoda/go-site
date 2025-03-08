import React from "react";
import { ChevronRight } from "lucide-react";
interface NavigationItemProps {
  label?: string;
  onClick: () => void;
}
const NavigationItem = ({
  label = "Subscription",
  onClick,
}: NavigationItemProps) => {
  return (
    <div className="flex items-center justify-end">
      <div
        className="w-4/6 px-3 h-10 border flex items-center justify-between cursor-pointer hover:bg-muted/50"
        onClick={onClick}
      >
        <span>{label}</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default NavigationItem;
