import { ImagePlaceHolder } from "@/icons/common";
import Image from "next/image";
import React from "react";
import { Card, CardStyle } from "../../store/editorStore";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import autoPlay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";

interface DesignProps {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
  handleSelectedItem: (item: Card | null) => void;
}
function Design1({
  section,
  handleSelectedSection,
  handleSelectedItem,
}: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

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

  const imageOrderClassName = cn(
    cardStyle.designSettings.layout === "top" && "order-1",
    cardStyle.designSettings.layout === "center" && "order-2",
    cardStyle.designSettings.layout === "bottom" && "order-3"
  );
  const titleClassName = cn(
    cardStyle.designSettings.layout === "top" && "order-2",
    cardStyle.designSettings.layout === "center" && "order-1",
    cardStyle.designSettings.layout === "bottom" && "order-1",
    cardStyle.designSettings.titleSize === "s" && "text-sm font-medium",
    cardStyle.designSettings.titleSize === "m" && "text-base font-semibold",
    cardStyle.designSettings.titleSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn(
    "text-gray-400",
    cardStyle.designSettings.layout === "top" && "order-3",
    cardStyle.designSettings.layout === "center" && "order-3",
    cardStyle.designSettings.layout === "bottom" && "order-2"
  );
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
    "flex flex-col  gap-2 rounded-md",
    cardStyle.designSettings.cardBackground && "bg-[#222] p-5",
    cardStyle.designSettings.cardBorder && "border border-[#222] p-5"
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    cardStyle.designSettings.cardBackground ? "bg-background" : "bg-[#222]"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    cardStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-[1fr_2fr] grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  return (
    <section>
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
                  key={index}
                  className={cardClassNames}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedItem(card);
                  }}
                >
                  <h5 className={titleClassName}>{card.title}</h5>
                  <p className={textOrderClassName}>{card.text}</p>
                  {cardStyle.designSettings.image && (
                    <div className={imageOrderClassName}>
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
                              cardStyle.designSettings.cardBackground
                                ? "fill-[#222]"
                                : "fill-background"
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              plugins={autoScrollPlugin}
              opts={{
                align: "start",
                skipSnaps: true,
                loop: autoScroll ? true : false,
              }}
              className="w-full"
            >
              <CarouselContent>
                {section.content.cards.map((card: any, index: number) => (
                  <CarouselItem
                    key={index}
                    style={{
                      flexBasis: isDesktop
                        ? cardStyle.designSettings.cardSlider.desktopWidth
                        : cardStyle.designSettings.cardSlider.mobileWidth,
                    }}
                  >
                    <div
                      key={index}
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectedItem(card);
                      }}
                    >
                      <h5 className={titleClassName}>{card.title}</h5>
                      <p className={textOrderClassName}>{card.text}</p>
                      {cardStyle.designSettings.image && (
                        <div className={imageOrderClassName}>
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
                                  cardStyle.designSettings.cardBackground
                                    ? "fill-[#222]"
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

export default Design1;
