import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
import React from "react";
interface BackBtnProps {
  label: string;
  backBtnClassName?: string;
  handleBack: () => void;
}
function BackBtn({ label, backBtnClassName, handleBack }: BackBtnProps) {
  const classNames = cn(
    "flex p-5 items-center border-b-[1px] gap-4 border-b-muted-bg mb-3",
    backBtnClassName
  );
  return (
    <div className={classNames}>
      <div
        className="cursor-pointer hover:text-muted-foreground"
        onClick={handleBack}
      >
        <ChevronLeft size={18} />
      </div>
      <Label>{label}</Label>
    </div>
  );
}

export default BackBtn;
