import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FluidTextSettings, GridCard } from "@/types/sectionsTypes/fluid";
import { Layouts } from "react-grid-layout";
import TextComp from "./textComp";
import {
  updateSelectedItemId,
  updateSelectedSection,
} from "@/reduxStore/action";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import Image from "next/image";
import { ImagePlaceHolder } from "@/icons/common";
import { shapes } from "@/utlis/shapes";

interface renderCardContentProps {
  card: GridCard;
  pageId: string;
  section: any;
  isEditing: boolean;
  dispatch: any;
  isCardSelected: boolean;
  updateSectionContent: (newGridCards: GridCard[], newLayouts: Layouts) => void;
  setCardType: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const renderCardContent = ({
  card,
  isEditing,
  section,
  pageId,
  isCardSelected,
  updateSectionContent,
  setCardType,
  setIsEditing,
  dispatch,
}: renderCardContentProps) => {
  const handleTextChange = (key: keyof FluidTextSettings, value: any) => {
    const updatedGridCards = section.content.gridCards.map((c: GridCard) => {
      if (c.i === card.i) {
        return {
          ...c,
          settings: {
            ...c.settings,
            [key]: value,
          },
        };
      }
      return c;
    });

    updateSectionContent(updatedGridCards, section.content.gridLayout);
  };

  const cardClassNames = cn("relative w-full h-full", {
    "outline outline-1 outline-primary cursor-move": isCardSelected,
    "cursor-default": isEditing,
  });

  return (
    <div
      className={cardClassNames}
      onMouseDown={() => {
        dispatch(updateSelectedSection(pageId, section.id));
      }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(updateSelectedItemId(card.i));
        setCardType(card.type);
      }}
    >
      <div className="w-full h-full">
        {(() => {
          switch (card.type) {
            case "button":
              const ButtonIcon = getPhosphorIcon(card.settings.buttonIcon);
              const isIconOnly = card.settings.buttonDisplay === "Icon only";
              const isTextAndIcon =
                card.settings.buttonDisplay === "Text and icon" ||
                card.settings.buttonDisplay === "Icon only";
              const iconPositionAboveOrBelowText =
                card.settings.iconPosition === "above" ||
                card.settings.iconPosition === "below";
              return (
                <Button
                  className="w-full h-full"
                  style={{ gap: card.settings.textIconGap }}
                  variant={card.settings.variant}
                  justifyItems={
                    !iconPositionAboveOrBelowText
                      ? card.settings.alignment
                      : "center"
                  }
                  alignItems={
                    iconPositionAboveOrBelowText
                      ? card.settings.alignment
                      : "center"
                  }
                  iconPosition={card.settings.iconPosition}
                >
                  {!isIconOnly && (
                    <span className="truncate">{card.settings.text}</span>
                  )}
                  {isTextAndIcon && (
                    <ButtonIcon className="min-w-max min-h-max" size={18} />
                  )}
                </Button>
              );
            case "image":
              return (
                <>
                  {card.settings.src ? (
                    <Image
                      alt={card.settings.imageId}
                      src={card.settings.src}
                      className="w-full rounded-md h-full object-cover"
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex justify-center items-center rounded-md">
                      <ImagePlaceHolder fillColor={"fill-background"} />
                    </div>
                  )}
                </>
              );
            case "text":
              return (
                <TextComp
                  isEditing={isEditing}
                  isSelected={isCardSelected}
                  textSettings={card.settings}
                  onTextChange={handleTextChange}
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                />
              );
            case "box":
              const selectedShape = shapes.find(
                (shape) => shape.id === card.settings.boxDesign
              );
              return selectedShape?.component({
                bgColor: card.settings.bgColor,
                borderColor: card.settings.border?.color,
                borderWidth: card.settings.border?.width,
                corners: card.settings.corners,
                blur: card.settings.blur,
                glassEffect: card.settings.glassEffect,
              });
            default:
              return <div>default</div>;
          }
        })()}
      </div>
    </div>
  );
};
