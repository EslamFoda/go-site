import { ImagePlaceHolder } from "@/icons/common";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardStyle } from "@/types/sectionsTypes/cards";
import useEditor from "@/store/editorStore";
import { useTheme } from "next-themes";

interface DesignProps {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
  handleSelectedItem: (item: Card | null) => void;
}
function Design2({
  section,
  handleSelectedSection,
  handleSelectedItem,
}: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { selectedPallet } = useEditor();
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const cardStyle = section?.style as CardStyle;
  const autoScroll = cardStyle?.designSettings?.cardSlider?.autoScroll;
  const scrollSpeed = cardStyle?.designSettings?.cardSlider?.scrollSpeed;
  const autoScrollPlugin = autoScroll
    ? [
        AutoScroll({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
          playOnInit: true,
          speed: scrollSpeed || 2,
        }),
      ]
    : [];
  const titleAndSubtitleClassName = cn(
    dynamicTextColor && "text-textColor",
    theme === "light" &&
      selectedPallet === "default-theme" &&
      section.style.designSettings.sectionBackground.color === "primary" &&
      "text-white"
  );

  const titleClassName = cn(
    cardStyle.designSettings.titleSize === "s" && "text-sm font-medium",
    cardStyle.designSettings.titleSize === "m" && "text-base font-semibold",
    cardStyle.designSettings.titleSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn("text-gray-400");
  const gridClassNames = cn(
    "grid gap-5",
    cardStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    cardStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    cardStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    cardStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    cardStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const alignClassNames = cn(
    "container gap-10 w-full py-12",
    cardStyle.designSettings.align === "start" && "text-start",
    cardStyle.designSettings.align === "center" && "text-center",
    cardStyle.designSettings.align === "end" && "text-end"
  );

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md relative p-5 bg-muted p-5",
    bgMuted && "bg-background",
    cardStyle.designSettings.layoutV2 === "top" && "justify-start",
    cardStyle.designSettings.layoutV2 === "center" && "justify-center",
    cardStyle.designSettings.layoutV2 === "bottom" && "justify-end",
    !cardStyle.designSettings.cardBackground &&
      !cardStyle.designSettings.cardBorder &&
      "bg-muted"
  );

  const imagePlaceholderClassNames = cn(
    " absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    cardStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-[1fr_2fr] grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn(
    " flex flex-col",
    section.style.designSettings.sectionBackground.color === "primary" &&
      "bg-primary",
    section.style.designSettings.sectionBackground.color === "gray" &&
      "bg-muted",
    section.style.designSettings.sectionBackground.color === "none" &&
      "bg-none",
    section.style.designSettings.sectionBackground.height === "fill" &&
      "h-screen",
    section.style.designSettings.sectionBackground.height === "fit" && "h-auto",
    section.style.designSettings.sectionBackground.align === "start" &&
      "justify-start",
    section.style.designSettings.sectionBackground.align === "center" &&
      "justify-center",
    section.style.designSettings.sectionBackground.align === "end" &&
      "justify-end"
  );

  const cardContentClasses = cn(
    "z-10 rounded-md p-5",
    cardStyle.designSettings.glassEffect &&
      bgMuted &&
      "bg-muted/30  backdrop-blur-lg",
    cardStyle.designSettings.glassEffect &&
      !bgMuted &&
      "bg-background/30 backdrop-blur-lg",
    !cardStyle.designSettings.glassEffect && bgMuted && "bg-muted",
    !cardStyle.designSettings.glassEffect && !bgMuted && "bg-background"
  );

  return (
    <section className={sectionBgClassName}>
      <div
        className={alignClassNames}
        onClick={() => {
          handleSelectedSection(section.id);
          handleSelectedItem(null);
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{section.content.title}</h1>
            <p>{section.content.subtitle}</p>
          </div>
          {cardStyle.designSettings.displayType === "grid" ? (
            <div className={gridClassNames}>
              {section.content.cards.map((card: any, index: number) => (
                <div
                  style={{
                    minHeight: isDesktop
                      ? cardStyle.designSettings.height.desktop
                      : cardStyle.designSettings.height.mobile,
                    backgroundImage: `url(${card.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  key={index}
                  className={cardClassNames}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedSection(section.id);
                    handleSelectedItem(card);
                  }}
                >
                  <div className={cardContentClasses}>
                    <h5 className={titleClassName}>{card.title}</h5>
                    <p className={textOrderClassName}>{card.text}</p>
                  </div>
                  {!card.image && (
                    <div className={imagePlaceholderClassNames}>
                      <ImagePlaceHolder
                        fillColor={bgMuted ? "fill-muted" : "fill-background"}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              plugins={autoScrollPlugin}
              opts={{
                skipSnaps: true,
                loop: autoScroll ? true : false,
              }}
              className="w-full"
            >
              <CarouselContent className="items-stretch">
                {section.content.cards.map((card: any, index: number) => (
                  <CarouselItem
                    className="h-full"
                    key={index}
                    style={{
                      flexBasis: isDesktop
                        ? cardStyle.designSettings.cardSlider.desktopWidth
                        : cardStyle.designSettings.cardSlider.mobileWidth,
                    }}
                  >
                    <div
                      style={{
                        minHeight: isDesktop
                          ? cardStyle.designSettings.height.desktop
                          : cardStyle.designSettings.height.mobile,
                        backgroundImage: `url(${card.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      key={index}
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectedSection(section.id);
                        handleSelectedItem(card);
                      }}
                    >
                      <div className={cardContentClasses}>
                        <h5 className={titleClassName}>{card.title}</h5>
                        <p className={textOrderClassName}>{card.text}</p>
                      </div>
                      {!card.image && (
                        <div className={imagePlaceholderClassNames}>
                          <ImagePlaceHolder
                            fillColor={
                              bgMuted ? "fill-muted" : "fill-background"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}

export default Design2;
