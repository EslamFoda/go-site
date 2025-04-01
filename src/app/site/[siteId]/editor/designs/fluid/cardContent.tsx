import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FluidTextSettings, GridCard } from "@/types/sectionsTypes/fluid";
import { Layouts } from "react-grid-layout";
import TextComp from "./textComp";
import { updateSelectedSection } from "@/reduxStore/action";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import Image from "next/image";
import { ImagePlaceHolder } from "@/icons/common";
interface renderCardContentProps {
  card: GridCard;
  pageId: string;
  section: any;
  selectedItemId: string | null;
  isEditing: boolean;
  setSelectedItemId: React.Dispatch<React.SetStateAction<string | null>>;
  updateSectionContent: (newGridCards: GridCard[], newLayouts: Layouts) => void;
  dispatch: any;
  setCardType: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export const renderCardContent = ({
  card,
  isEditing,
  section,
  selectedItemId,
  pageId,
  setSelectedItemId,
  updateSectionContent,
  setCardType,
  setIsEditing,
  dispatch,
}: renderCardContentProps) => {
  const isSelected = card.i === selectedItemId;
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
    "outline outline-1 outline-primary cursor-move": isSelected,
    "cursor-default": isEditing,
  });

  return (
    <div
      className={cardClassNames}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItemId(card.i);
        setCardType(card.type);
        dispatch(updateSelectedSection(pageId, section.id));
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
                      className="w-full h-full object-cover"
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
                  isSelected={isSelected}
                  textSettings={card.settings}
                  onTextChange={handleTextChange}
                  onFocus={() => setIsEditing(true)} // Set editing state on focus
                  onBlur={() => setIsEditing(false)} // Reset editing state on blur
                />
              );
            default:
              return <div>default</div>;
          }
        })()}
      </div>
    </div>
  );
};
