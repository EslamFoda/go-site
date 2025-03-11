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
import { CardStyle } from "@/types/sectionsTypes/cards";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";

  const cardStyle = section?.style as CardStyle;
  const autoScroll = cardStyle?.designSettings?.cardSlider?.autoScroll;
  const scrollSpeed = cardStyle?.designSettings?.cardSlider?.scrollSpeed;
  const autoScrollPlugin = autoScroll
    ? [
        AutoScroll({
          startDelay: 3000,
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
    "text-muted-foreground",
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
    "container max-w-container gap-10 w-full py-12",
    cardStyle.designSettings.align === "start" && "text-start",
    cardStyle.designSettings.align === "center" && "text-center",
    cardStyle.designSettings.align === "end" && "text-end"
  );

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md",
    cardStyle.designSettings.cardBackground && "bg-muted p-5",
    cardStyle.designSettings.cardBorder &&
      "outline outline-[1px] outline-muted p-5",
    bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    cardStyle.designSettings.cardBackground ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    cardStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn("flex flex-col", {
    "bg-primary":
      cardStyle.designSettings.sectionBackground.color === "primary",
    "bg-muted": cardStyle.designSettings.sectionBackground.color === "gray",
    "bg-background":
      cardStyle.designSettings.sectionBackground.color === "none",
    "h-screen": cardStyle.designSettings.sectionBackground.height === "fill",
    "h-auto": cardStyle.designSettings.sectionBackground.height === "fit",
    "justify-start":
      cardStyle.designSettings.sectionBackground.align === "start",
    "justify-center":
      cardStyle.designSettings.sectionBackground.align === "center",
    "justify-end": cardStyle.designSettings.sectionBackground.align === "end",
  });

  const sectionTitleClassNames = cn("text-4xl", {
    "text-primary-foreground":
      section.style.designSettings.sectionBackground.color === "primary",
    "text-start": cardStyle.designSettings.leftTitlePosition,
  });
  const sectionSubTitleClassNames = cn({
    "text-primary-foreground":
      cardStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      cardStyle.designSettings.sectionBackground.color !== "primary",
    "text-start": cardStyle.designSettings.leftTitlePosition,
  });

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
      }}
    >
      <div className={alignClassNames}>
        <div className={containerClassNames}>
          <div>
            <h1 className={sectionTitleClassNames}>{section.content.title}</h1>
            <p className={sectionSubTitleClassNames}>
              {section.content.subtitle}
            </p>
          </div>
          <div className="md:col-span-2">
            {cardStyle.designSettings.displayType === "grid" ? (
              <div className={gridClassNames}>
                <AnimatePresence>
                  {section.content.cards.map((card: any, index: number) => (
                    <motion.div
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "tween" }}
                      key={card.id || index}
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(card));
                        dispatch(closePagesTab());
                      }}
                    >
                      <h5 className={titleClassName}>{card.title}</h5>
                      <p className={textOrderClassName}>{card.text}</p>
                      {cardStyle.designSettings.image && (
                        <div className={imageOrderClassName}>
                          {card.image?.length ? (
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
                    </motion.div>
                  ))}
                </AnimatePresence>
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
                      key={card.id || index}
                      className="h-full"
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
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(card));
                          dispatch(closePagesTab());
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
      </div>
    </section>
  );
}

export default Design1;
