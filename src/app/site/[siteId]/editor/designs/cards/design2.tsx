import { ImagePlaceHolder } from "@/icons/common";
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
function Design2({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const cardStyle = section?.style as CardStyle;
  const cardContent = section?.content as CardsContent;
  const {
    spacing,
    sectionBackground,
    grid,
    align,
    titleSize,
    cardBackground,
    cardBorder,
    cardSlider,
    displayType,
    height,
    layoutV2,
    leftTitlePosition,
    glassEffect,
  } = cardStyle.designSettings;
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

  const titleClassName = cn(
    titleSize === "s" && "text-sm font-medium",
    titleSize === "m" && "text-base font-semibold",
    titleSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn("text-muted-foreground", {
    "text-foreground": glassEffect,
  });
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
    "flex flex-col  gap-2 rounded-md relative bg-muted",
    bgMuted && "bg-background",
    layoutV2 === "top" && "justify-start",
    layoutV2 === "center" && "justify-center",
    layoutV2 === "bottom" && "justify-end",
    !cardBackground && !cardBorder && "bg-muted"
  );

  const imagePlaceholderClassNames = cn(
    " absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn(
    " flex flex-col relative overflow-hidden",
    sectionBackground.color === "primary" && "bg-primary",
    sectionBackground.color === "gray" && "bg-muted",
    sectionBackground.color === "none" && "bg-background",
    sectionBackground.height === "fill" && "min-h-screen",
    sectionBackground.height === "fit" && "h-auto",
    sectionBackground.align === "start" && "justify-start",
    sectionBackground.align === "center" && "justify-center",
    sectionBackground.align === "end" && "justify-end"
  );

  const cardContentClasses = cn(
    "z-10 rounded-md space-y-3 ",
    glassEffect && bgMuted && "bg-muted/30  backdrop-blur-lg",
    glassEffect && !bgMuted && "bg-background/30 backdrop-blur-lg",
    !glassEffect && bgMuted && "bg-muted",
    !glassEffect && !bgMuted && "bg-background"
  );

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
                      style={{
                        minHeight: isDesktop ? height.desktop : height.mobile,
                        backgroundImage: `url(${card.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        padding: isDesktop
                          ? spacing.padding.desktop
                          : spacing.padding.mobile,
                      }}
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(card));
                        dispatch(closePagesTab());
                      }}
                    >
                      <div
                        className={cn(cardContentClasses, {
                          hidden: !card.title && !card.text && !card.button,
                        })}
                        style={{
                          padding: isDesktop
                            ? `clamp(10px, ${spacing.padding.desktop}px, 20px)`
                            : `clamp(10px, ${spacing.padding.mobile}px, 20px)`,
                        }}
                      >
                        <h5
                          className={titleClassName}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {card.title}
                        </h5>
                        <p
                          className={cn(textOrderClassName, {
                            hidden: !card.text,
                          })}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {card.text}
                        </p>
                        {card.button && (
                          <Button className="order-4 w-full">
                            {card.button}
                          </Button>
                        )}
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
                <CarouselContent className="items-stretch py-1">
                  {section.content.cards.map((card: any, index: number) => (
                    <CarouselItem
                      className="h-full"
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
                        style={{
                          minHeight: isDesktop ? height.desktop : height.mobile,
                          backgroundImage: `url(${card.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          padding: isDesktop
                            ? spacing.padding.desktop
                            : spacing.padding.mobile,
                        }}
                        key={index}
                        className={cardClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(card));
                          dispatch(closePagesTab());
                        }}
                      >
                        <div
                          className={cn(cardContentClasses, {
                            hidden: !card.title && !card.text && !card.button,
                          })}
                        >
                          <h5
                            className={titleClassName}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {card.title}
                          </h5>
                          <p
                            className={cn(textOrderClassName, {
                              hidden: !card.text,
                            })}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {card.text}
                          </p>
                          {card.button && (
                            <Button className="order-4 w-full">
                              {card.button}
                            </Button>
                          )}
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
      </div>
    </section>
  );
}

export default Design2;
