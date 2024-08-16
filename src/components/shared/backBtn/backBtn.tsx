import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
import React from "react";
interface BackBtnProps {
  label: string;
  handleBack: () => void;
}
function BackBtn({ label, handleBack }: BackBtnProps) {
  return (
    <div className="flex p-5 items-center border-b-[1px] border-b-muted-bg mb-3">
      <div
        className="cursor-pointer hover:text-muted-foreground w-9"
        onClick={handleBack}
      >
        <ChevronLeft size={18} />
      </div>
      <Label>{label}</Label>
    </div>
  );
}

export default BackBtn;
