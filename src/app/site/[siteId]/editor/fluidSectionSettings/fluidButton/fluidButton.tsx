import { Button, ButtonVariantProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardData } from "@/types/common";
import React from "react";
interface FluidButtonProps {
  fluidCard: CardData | null;
}
function FluidButton({ fluidCard }: FluidButtonProps) {
  const btnVariants = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "link",
    "destructive",
  ] as ButtonVariantProps["variant"][];
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input value={fluidCard?.content} />
      </div>
      <hr />
      <div className="space-y-2">
        <Label>Designs</Label>
        <div className="grid grid-cols-2 gap-4">
          {btnVariants.map((variant) => (
            <Button size="sm" key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FluidButton;
