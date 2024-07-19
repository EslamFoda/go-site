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
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
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
    "flex flex-col  gap-2 rounded-md relative p-5",
    cardStyle.designSettings.cardBackground && "bg-muted p-5",
    cardStyle.designSettings.cardBorder && "border border-muted",
    bgMuted && "bg-background",
    cardStyle.designSettings.layoutV2 === "top" && "justify-start",
    cardStyle.designSettings.layoutV2 === "center" && "justify-center",
    cardStyle.designSettings.layoutV2 === "bottom" && "justify-end",
    !cardStyle.designSettings.cardBackground &&
      !cardStyle.designSettings.cardBorder &&
      "bg-muted"
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    cardStyle.designSettings.cardBackground ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    cardStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-[1fr_2fr] grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn(
    " flex flex-col",
    section.style.designSettings.sectionBackground.color === "primary"
      ? "bg-primary"
      : "",
    section.style.designSettings.sectionBackground.color === "gray"
      ? "bg-muted"
      : "",
    section.style.designSettings.sectionBackground.color === "none"
      ? "bg-none"
      : "",
    section.style.designSettings.sectionBackground.height === "fill"
      ? "h-screen"
      : "",
    section.style.designSettings.sectionBackground.height === "fit"
      ? "h-auto"
      : "",
    section.style.designSettings.sectionBackground.align === "start"
      ? "justify-start"
      : "",
    section.style.designSettings.sectionBackground.align === "center"
      ? "justify-center"
      : "",
    section.style.designSettings.sectionBackground.align === "end"
      ? "justify-end"
      : ""
  );

  const cardContentClasses = cn(
    "z-10 rounded-md p-5 ",
    !cardStyle.designSettings.cardBackground &&
      !cardStyle.designSettings.cardBorder
      ? "bg-background"
      : "bg-muted",
    cardStyle.designSettings.cardBorder && "bg-muted",
    cardStyle.designSettings.cardBackground && "bg-background"
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
          <div>
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
                    // backgroundImage: `url(${card.image})`,
                  }}
                  key={index}
                  className={cardClassNames}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedItem(card);
                  }}
                >
                  <div className={cardContentClasses}>
                    <h5 className={titleClassName}>{card.title}</h5>
                    <p className={textOrderClassName}>{card.text}</p>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ImagePlaceHolder />
                  </div>
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
                      key={index}
                      className={cardClassNames + " h-full"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectedItem(card);
                      }}
                    >
                      <h5 className={titleClassName}>{card.title}</h5>
                      <p className={textOrderClassName}>{card.text}</p>
                      {cardStyle.designSettings.image && (
                        <div>
                          {card.image.length ? (
                            <div
                              className="relative w-full rounded-md"
                              style={{
                                height: isDesktop
                                  ? cardStyle.designSettings.height.desktop
                                  : cardStyle.designSettings.height.mobile,
                                // backgroundImage: `url(${card.image})`,
                              }}
                            >
                              <Image
                                alt={card.image}
                                src={card.image}
                                fill
                                objectFit="cover"
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                height: isDesktop
                                  ? cardStyle.designSettings.height.desktop
                                  : cardStyle.designSettings.height.mobile,
                                // backgroundImage: `url(${card.image})`,
                              }}
                              className={imagePlaceholderClassNames}
                            >
                              <ImagePlaceHolder
                                fillColor={
                                  cardStyle.designSettings.cardBackground &&
                                  !bgMuted
                                    ? "fill-muted"
                                    : "fill-background"
                                }
                              />
                            </div>
                          )}
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
