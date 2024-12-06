import React from "react";
import { Button, ButtonVariantProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { setFluidCard, updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidButtonSettings, GridCard } from "@/types/sectionsTypes/fluid";

interface FluidButtonProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

const FluidButton: React.FC<FluidButtonProps> = ({
  fluidCard,
  activePageId,
  selectedSection,
}) => {
  const dispatch = useAppDispatch();
  const btnVariants: ButtonVariantProps["variant"][] = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "link",
    "destructive",
  ];

  const fluidCardSettings = fluidCard?.settings as FluidButtonSettings;
  const fluidSection = selectedSection?.content as SectionContentTypes["fluid"];

  const handleUpdateContent = (updatedCards: GridCard[]) => {
    dispatch(
      updateContent(activePageId, selectedSection.id, {
        gridCards: updatedCards,
      })
    );
  };

  const handleSetFluidCard = (updatedCard: GridCard) => {
    dispatch(setFluidCard(updatedCard));
  };

  const handleTextChange = (value: string) => {
    if (!fluidCard) return;
    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i ? { ...card, content: value } : card
    );
    handleUpdateContent(updatedCards);
    handleSetFluidCard({ ...fluidCard, content: value });
  };

  const handleVariantChange = (variant: ButtonVariantProps["variant"]) => {
    if (!fluidCard) return;
    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i
        ? { ...card, settings: { ...card.settings, variant } }
        : card
    ) as GridCard[];
    handleUpdateContent(updatedCards);
    const updatedFluidCard = {
      ...fluidCard,
      settings: { ...fluidCard.settings, variant },
    } as GridCard;
    handleSetFluidCard(updatedFluidCard);
  };

  return (
    <div className="space-y-4">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="text-input">Text</Label>
        <Input
          id="text-input"
          value={fluidCard?.content || ""}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>

      <hr />

      {/* Button Variants */}
      <div className="space-y-2">
        <Label>Designs</Label>
        <div className="grid grid-cols-2 gap-4">
          {btnVariants.map((variant) => {
            const isSelected = fluidCardSettings?.variant === variant;
            return (
              <Button
                key={variant}
                size="sm"
                variant={variant}
                onClick={() => handleVariantChange(variant)}
                className="relative"
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-primary border-background border">
                    <Check className="stroke-background" size={16} />
                  </div>
                )}
                {variant}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FluidButton;
