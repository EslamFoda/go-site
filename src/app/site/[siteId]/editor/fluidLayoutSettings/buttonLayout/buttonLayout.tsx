import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setFluidCard, updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidButtonSettings, GridCard } from "@/types/sectionsTypes/fluid";
import React from "react";
import Align from "../../editorSideBar/sectionSettings/settingsUi/Align";
import { Slider } from "@/components/ui/slider";
import IconPosition from "../../editorSideBar/sectionSettings/settingsUi/IconPosition";
interface ButtonLayoutProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function ButtonLayout({
  activePageId,
  fluidCard,
  selectedSection,
}: ButtonLayoutProps) {
  const dispatch = useAppDispatch();
  const buttonTypes = ["Text only", "Text and icon", "Icon only"];
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text-input">Choose what displays</Label>
        <Select
          defaultValue="Text only"
          value={fluidCardSettings?.buttonDisplay}
          onValueChange={(value) => handleSettingChange("buttonDisplay", value)}
        >
          <SelectTrigger>
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
      {fluidCardSettings.buttonDisplay === "Text and icon" && (
        <>
          <div className="space-y-2">
            <Label>Icon position</Label>
            <IconPosition
              positionValue={fluidCardSettings.iconPosition}
              onValueChange={(value) =>
                handleSettingChange("iconPosition", value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Spacing between text and icon</Label>
            <Slider
              className="border-muted-bg flex border-solid border-[1px] rounded-sm"
              min={0}
              max={50}
              customText={`${fluidCardSettings.textIconGap} px`}
              value={[fluidCardSettings.textIconGap]}
              onValueChange={(value) =>
                handleSettingChange("textIconGap", value[0])
              }
            />
          </div>
        </>
      )}
      <div className="space-y-2">
        <Label>Alignment</Label>
        <Align
          noLabel
          alignValue={fluidCardSettings?.alignment}
          onValueChange={(value) => {
            handleSettingChange("alignment", value);
          }}
        />
      </div>
    </div>
  );
}

export default ButtonLayout;
