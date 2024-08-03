import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
import React from "react";
interface BackBtnProps {
  label: string;
  handleBack: () => void;
}
function BackBtn({ label, handleBack }: BackBtnProps) {
  return (
    <div
      className="flex p-5 items-center gap-4 cursor-pointer border-b-[1px] border-b-muted-bg mb-3"
      onClick={handleBack}
    >
      <ChevronLeft size={18} />
      <Label>{label}</Label>
    </div>
  );
}

export default BackBtn;
