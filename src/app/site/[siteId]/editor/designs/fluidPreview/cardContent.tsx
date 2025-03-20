import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GridCard } from "@/types/sectionsTypes/fluid";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import Image from "next/image";
import { ImagePlaceHolder } from "@/icons/common";
interface renderCardContentProps {
  card: GridCard;
}
export const renderCardContent = ({ card }: renderCardContentProps) => {
  const cardClassNames = cn("relative w-full h-full");

  return (
    <div className={cardClassNames}>
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
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: card.settings.html,
                  }}
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
