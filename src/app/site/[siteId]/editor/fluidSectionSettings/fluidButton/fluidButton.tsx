import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconList from "../../editorSideBar/sectionSettings/list/comps/iconList";
import { getPhosphorIcon } from "@/helper/phosphorIcons";

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
  const [isIconListOpen, setIsIconListOpen] = useState(false); // State to control IconList visibility
  const btnVariants: ButtonVariantProps["variant"][] = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "link",
    "destructive",
  ];
  const buttonTypes = ["Text only", "Text and icon", "Icon only"];
  const fluidCardSettings = fluidCard?.settings as FluidButtonSettings;
  const fluidSection = selectedSection?.content as SectionContentTypes["fluid"];
  const ButtonIcon = getPhosphorIcon(fluidCardSettings.buttonIcon);
  const isTextAndIcon =
    fluidCardSettings.buttonDisplay === "Text and icon" ||
    fluidCardSettings.buttonDisplay === "Icon only";
  const isIconOnly = fluidCardSettings.buttonDisplay === "Icon only";

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

  const handleSettingChange = (key: keyof FluidButtonSettings, value: any) => {
    if (!fluidCard) return;
    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i
        ? { ...card, settings: { ...card.settings, [key]: value } }
        : card
    ) as GridCard[];
    handleUpdateContent(updatedCards);
    const updatedFluidCard = {
      ...fluidCard,
      settings: { ...fluidCard.settings, [key]: value },
    } as GridCard;
    handleSetFluidCard(updatedFluidCard);
  };

  if (isIconListOpen) {
    // Render only the IconList if it is open
    return (
      <IconList
        backBtnLabel="Back"
        listHeight="350px"
        icon={fluidCardSettings?.buttonIcon}
        handleBack={() => setIsIconListOpen(false)} // Close IconList on back
        handlePropertyChange={(icon) => handleSettingChange("buttonIcon", icon)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* button type */}
      <div className="space-y-2">
        <Label htmlFor="button-display">Choose what displays</Label>
        <Select
          defaultValue="Text only"
          value={fluidCardSettings?.buttonDisplay}
          onValueChange={(value) => handleSettingChange("buttonDisplay", value)}
        >
          <SelectTrigger id="button-display">
            <SelectValue placeholder="Select button type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {buttonTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Text Input */}
      {!isIconOnly && (
        <div className="space-y-2">
          <Label htmlFor="text-input">Text</Label>
          <Input
            id="text-input"
            value={fluidCardSettings?.text || ""}
            onChange={(e) => handleSettingChange("text", e.target.value)}
          />
        </div>
      )}

      <hr />

      {/* Icon */}
      {isTextAndIcon && (
        <>
          <div className="space-y-2">
            <Label className="block">Icon</Label>
            <Button
              className="h-10 w-20"
              size="icon"
              variant="outline"
              onClick={() => setIsIconListOpen(true)}
            >
              <ButtonIcon size={20} />
            </Button>
          </div>
          <hr />
        </>
      )}

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
                onClick={() => handleSettingChange("variant", variant)}
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
