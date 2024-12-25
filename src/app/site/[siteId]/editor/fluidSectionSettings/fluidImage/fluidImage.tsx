import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidImageSettings, GridCard } from "@/types/sectionsTypes/fluid";
import React from "react";
import UnsplashTab from "../../editorSideBar/sectionSettings/gallery/chooseImage/unsplashTab";
import { useAppDispatch } from "@/reduxStore/hooks";
import { setFluidCard, updateContent } from "@/reduxStore/action";
import { UnsplashImage } from "@/types/common";
interface FluidImageProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function FluidImage({
  fluidCard,
  activePageId,
  selectedSection,
}: FluidImageProps) {
  const dispatch = useAppDispatch();
  const fluidImageSettings = fluidCard?.settings as FluidImageSettings;
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

  const handleSettingChange = (key: keyof FluidImageSettings, value: any) => {
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

  const handleMultipleSettingChanges = (
    settings: Partial<FluidImageSettings>
  ) => {
    if (!fluidCard) return;
    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i
        ? { ...card, settings: { ...card.settings, ...settings } }
        : card
    ) as GridCard[];
    handleUpdateContent(updatedCards);
    const updatedFluidCard = {
      ...fluidCard,
      settings: { ...fluidCard.settings, ...settings },
    } as GridCard;
    handleSetFluidCard(updatedFluidCard);
  };

  return (
    <div>
      <UnsplashTab
        handleUpdate={(image: UnsplashImage) => {
          handleMultipleSettingChanges({
            imageId: image.id,
            src: image.urls.regular,
          });
        }}
        selectedImgId={fluidImageSettings.imageId || ""}
      />
    </div>
  );
}

export default FluidImage;
