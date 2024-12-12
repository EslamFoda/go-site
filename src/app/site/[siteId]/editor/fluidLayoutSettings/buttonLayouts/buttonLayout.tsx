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
  const buttonTypes = ["Text only", "Text and icon", "Icon only", "Nothing"];
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
    <div>
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
      <div>
        {/* <Align
          alignValue={cardStyle.designSettings?.align}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  align: value,
                },
              })
            );
          }}
        /> */}
      </div>
    </div>
  );
}

export default ButtonLayout;
