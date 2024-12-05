import { Button, ButtonVariantProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridCard } from "@/types/sectionsTypes/fluid";
import { Check } from "lucide-react";
import React from "react";
interface FluidButtonProps {
  fluidCard: GridCard | null;
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
  console.log(fluidCard,'fluidCard')

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
            <Button
              className="relative"
              size="sm"
              key={variant}
              variant={variant}
            >
              <div className="h-6 w-6 absolute flex items-center justify-center -top-2 -right-2 rounded-full bg-primary border-background border">
                <Check className="stroke-background" size='16' />
              </div>
              {variant}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FluidButton;
