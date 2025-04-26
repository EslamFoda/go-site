"use client";

import type React from "react";
import { useState } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import type {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import type { FluidBoxSettings, GridCard } from "@/types/sectionsTypes/fluid";
import { cn } from "@/lib/utils";
import { setFluidCard, updateContent } from "@/reduxStore/action";
import { Check, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shapes } from "@/utlis/shapes";
import CustomizeBox from "./customizeBox";

interface FluidBoxProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

const FluidBox: React.FC<FluidBoxProps> = ({
  fluidCard,
  activePageId,
  selectedSection,
}) => {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<"shapes" | "settings">("shapes");
  const fluidCardSettings = fluidCard?.settings as FluidBoxSettings;
  const fluidSection = selectedSection?.content as SectionContentTypes["fluid"];
  const selectedShape = shapes.find(
    (shape) => shape.id === fluidCardSettings.boxDesign
  );

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

  const handleSettingChange = (settings: Partial<FluidBoxSettings>) => {
    if (!fluidCard) return;

    let updatedSettings = { ...fluidCard.settings, ...settings };

    // Handle special cases
    if (settings.boxDesign) {
      updatedSettings.bgColor = ""; // Reset bgColor when changing boxDesign
    }

    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i ? { ...card, settings: updatedSettings } : card
    ) as GridCard[];

    handleUpdateContent(updatedCards);

    const updatedFluidCard = {
      ...fluidCard,
      settings: updatedSettings,
    } as GridCard;

    handleSetFluidCard(updatedFluidCard);
  };

  if (view === "settings") {
    return (
      <CustomizeBox
        fluidCardSettings={fluidCardSettings}
        setView={setView}
        handleSettingChange={handleSettingChange}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="p-4 space-y-2">
        <span>My box</span>
        <div
          className={cn(
            "h-40 w-40 p-1 flex items-center justify-center relative",
            {
              "outline outline-primary outline-1": selectedShape,
            }
          )}
        >
          {fluidCardSettings.boxDesign &&
            selectedShape?.component({
              bgColor: selectedShape ? fluidCardSettings.bgColor : undefined,
              borderColor: selectedShape
                ? fluidCardSettings.border?.color
                : undefined,
              borderWidth: selectedShape
                ? fluidCardSettings.border?.width
                : undefined,
              corners: selectedShape ? fluidCardSettings.corners : undefined,
            })}
          {selectedShape && (
            <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-primary border-background border">
              <Check className="stroke-background" size={16} />
            </div>
          )}
        </div>
      </div>
      <div className="h-96 overflow-y-auto rounded-md p-4 grid grid-cols-3 gap-4">
        {shapes.map((shape) => {
          const selectedShape = fluidCardSettings.boxDesign === shape.id;
          return (
            <div
              key={shape.id}
              className={cn("cursor-pointer relative", {
                "outline outline-primary outline-1": selectedShape,
              })}
              onClick={() =>
                handleSettingChange({
                  boxDesign: shape.id,
                  border: {
                    width: 0,
                    color: "",
                  },
                  corners: {
                    bottomLeft: shape.defaultRounded,
                    bottomRight: shape.defaultRounded,
                    topLeft: shape.defaultRounded,
                    topRight: shape.defaultRounded,
                  },
                })
              }
            >
              <div className="h-20 flex items-center justify-center p-1">
                {shape.component({})}
              </div>
              {selectedShape && (
                <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-primary border-background border">
                  <Check className="stroke-background" size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center py-2">
        <Button
          className="w-3/4  gap-2"
          onClick={() => setView("settings")}
          disabled={!fluidCardSettings.boxDesign}
        >
          <Droplet size={18} />
          Customize Design
        </Button>
      </div>
    </div>
  );
};

export default FluidBox;
