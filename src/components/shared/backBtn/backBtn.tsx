import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
import React from "react";
interface BackBtnProps {
  label?: string;
  backBtnClassName?: string;
  btnContainerClassName?: string;
  doneBtn?: boolean;
  handleBack: () => void;
  handleDone?: () => void;
}
function BackBtn({
  label,
  backBtnClassName,
  btnContainerClassName,
  doneBtn,
  handleBack,
  handleDone,
}: BackBtnProps) {
  const classNames = cn("flex items-center gap-4", backBtnClassName);
  const containerClassNames = cn(
    "flex items-center justify-between p-5 border-b-[1px] border-b-muted-bg",
    btnContainerClassName
  );
  return (
    <div className={containerClassNames}>
      <div className={classNames}>
        <div
          className="cursor-pointer hover:text-muted-foreground"
          onClick={handleBack}
        >
          <ChevronLeft size={18} />
        </div>
        <Label>{label}</Label>
      </div>
      {doneBtn && (
        <div
          className="bg-foreground text-background px-2 rounded-full cursor-pointer"
          onClick={handleDone}
        >
          done
        </div>
      )}
    </div>
  );
}

export default BackBtn;
