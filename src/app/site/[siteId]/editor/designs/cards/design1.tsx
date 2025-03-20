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
import { CardsContent, CardStyle } from "@/types/sectionsTypes/cards";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/components/shared/backgroundImage";
import DesignLabel from "@/components/shared/label";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();

  const cardStyle = section?.style as CardStyle;
  const cardContent = section?.content as CardsContent;
  const { cards } = cardContent;
  const {
    spacing,
    sectionBackground,
    layout,
    grid,
    align,
    titleSize,
    cardBackground,
    cardBorder,
    cardSlider,
    displayType,
    height,
    image,
    leftTitlePosition,
  } = cardStyle.designSettings;
  const bgMuted = sectionBackground.color === "gray";
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
    layout === "top" && "order-1",
    layout === "center" && "order-2",
    layout === "bottom" && "order-3"
  );
  const titleClassName = cn(
    layout === "top" && "order-2",
    layout === "center" && "order-1",
    layout === "bottom" && "order-1",
    titleSize === "s" && "text-sm font-medium",
    titleSize === "m" && "text-base font-semibold",
    titleSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn(
    "text-muted-foreground",
    layout === "top" && "order-3",
    layout === "center" && "order-3",
    layout === "bottom" && "order-2"
  );
  const gridClassNames = cn(
    "grid",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const alignClassNames = cn(
    "container max-w-container gap-10 w-full z-0",
    align === "start" && "text-start",
    align === "center" && "text-center",
    align === "end" && "text-end"
  );

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md",
    cardBackground && "bg-muted",
    cardBorder && "outline outline-[1px] outline-muted",
    bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    cardBackground ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn("flex flex-col relative overflow-hidden", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "min-h-screen": sectionBackground.height === "fill",
    "h-auto": sectionBackground.height === "fit",
    "justify-start": sectionBackground.align === "start",
    "justify-center": sectionBackground.align === "center",
    "justify-end": sectionBackground.align === "end",
  });

  const sectionTitleClassNames = cn("text-4xl", {
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-start": leftTitlePosition,
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });
  const sectionSubTitleClassNames = cn({
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-muted-foreground": sectionBackground.color !== "primary",
    "text-start": leftTitlePosition,
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const sectionTitleAndSubTitleClassNames = cn("space-y-3", {
    "text-start": leftTitlePosition,
  });

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
      }}
    >
      <BackgroundImage
        imageUrl={sectionBackground.media.imageUrl}
        parallax={sectionBackground.parallax}
        blur={sectionBackground.blur}
        blurEffect={sectionBackground.blurEffect}
        greyScale={sectionBackground.greyScale}
        overlay={sectionBackground.overlay}
        overlayEffect={sectionBackground.overlayEffect}
        backgroundColor={sectionBackground.color}
      />
      <div
        className={alignClassNames}
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div className={containerClassNames}>
          <div className={sectionTitleAndSubTitleClassNames}>
            <DesignLabel
              text={cardContent.label}
              sectionBackground={sectionBackground.color}
            />
            <h1
              className={sectionTitleClassNames}
              style={{ whiteSpace: "pre-line" }}
            >
              {section.content.title}
            </h1>
            <p
              className={sectionSubTitleClassNames}
              style={{ whiteSpace: "pre-line" }}
            >
              {section.content.subtitle}
            </p>
          </div>
          <div className="md:col-span-2">
            {displayType === "grid" ? (
              <div
                className={gridClassNames}
                style={{
                  gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
                }}
              >
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
                      style={{
                        padding: isDesktop
                          ? spacing.padding.desktop
                          : spacing.padding.mobile,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(card));
                        dispatch(closePagesTab());
                      }}
                    >
                      <h5
                        className={titleClassName}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {card.title}
                      </h5>
                      <p
                        className={textOrderClassName}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {card.text}
                      </p>
                      {image && (
                        <div className={imageOrderClassName}>
                          {card.image?.length ? (
                            <div
                              className="relative w-full rounded-md"
                              style={{
                                height: isDesktop
                                  ? height.desktop
                                  : height.mobile,
                              }}
                            >
                              <Image
                                alt={card.image}
                                src={card.image}
                                fill
                                sizes="100%"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                height: isDesktop
                                  ? height.desktop
                                  : height.mobile,
                              }}
                              className={imagePlaceholderClassNames}
                            >
                              <ImagePlaceHolder
                                fillColor={
                                  cardBackground && !bgMuted
                                    ? "fill-muted"
                                    : "fill-background"
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {card.button && (
                        <Button className="order-4 mt-2">{card.button}</Button>
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
                className="w-full items-stretch"
              >
                <CarouselContent className="py-1">
                  {cards.map((card, index) => (
                    <CarouselItem
                      key={card.id || index}
                      style={{
                        flexBasis: isDesktop
                          ? cardSlider.desktopWidth
                          : cardSlider.mobileWidth,
                        marginInlineEnd: isDesktop
                          ? spacing.gap.desktop
                          : spacing.gap.mobile,
                        paddingInlineStart: index !== 0 ? 0 : "",
                      }}
                    >
                      <div
                        key={index}
                        className={cardClassNames + " h-full"}
                        style={{
                          padding: isDesktop
                            ? spacing.padding.desktop
                            : spacing.padding.mobile,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(card));
                          dispatch(closePagesTab());
                        }}
                      >
                        <h5
                          className={titleClassName}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {card.title}
                        </h5>
                        <p
                          className={textOrderClassName}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {card.text}
                        </p>
                        {image && (
                          <div className={imageOrderClassName}>
                            {card.image.length ? (
                              <div
                                className="relative w-full rounded-md"
                                style={{
                                  height: isDesktop
                                    ? height.desktop
                                    : height.mobile,
                                }}
                              >
                                <Image
                                  alt={card.image}
                                  src={card.image}
                                  fill
                                  sizes="100%"
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  height: isDesktop
                                    ? height.desktop
                                    : height.mobile,
                                }}
                                className={imagePlaceholderClassNames}
                              >
                                <ImagePlaceHolder
                                  fillColor={
                                    cardBackground && !bgMuted
                                      ? "fill-muted"
                                      : "fill-background"
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {card.button && (
                          <Button className="order-4 mt-2">
                            {card.button}
                          </Button>
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
