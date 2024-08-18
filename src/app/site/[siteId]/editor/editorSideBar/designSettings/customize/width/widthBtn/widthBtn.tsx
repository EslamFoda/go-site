import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import React from "react";
interface WidthBtnProps {
  setOpenWidth: React.Dispatch<React.SetStateAction<boolean>>;
}
function WidthBtn({ setOpenWidth }: WidthBtnProps) {
  return (
    <div className="flex flex-col w-full divide-y  border border-solid border-muted-bg rounded-sm hover:bg-muted">
      <div
        className="flex w-full cursor-pointer h-10 px-2 items-center justify-between"
        onClick={() => {
          setOpenWidth(true);
        }}
      >
        <span className="text-sm">Width</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
}

export default WidthBtn;
