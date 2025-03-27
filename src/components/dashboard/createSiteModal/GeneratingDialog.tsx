import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BrainCircuit } from "@/icons/common";

interface GeneratingDialogProps {
  isGenerating: boolean;
  setOpen: (open: boolean) => void;
}

export function GeneratingDialog({
  isGenerating,
  setOpen,
}: GeneratingDialogProps) {
  return (
    <Dialog open={isGenerating} onOpenChange={setOpen}>
      <DialogContent
        hideCloseButton
        aria-describedby={undefined}
        className="sm:max-w-sm space-y-14"
      >
        <DialogHeader className="items-center">
          <DialogTitle>Generating Site</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center justify-center pb-14">
          <BrainCircuit />
          <div className="text-center">
            <p className="text-muted-foreground">Your website is generating</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
