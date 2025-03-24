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
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateSelectedItem, updateSelectedSection } from "@/reduxStore/action";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/icons/testimonials";
import { useMotion } from "@/hooks/useMotion";
import BackgroundImage from "@/components/shared/backgroundImage";
import SectionHeader from "@/components/shared/sectionHeader";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const testimonialStyle = section?.style as TestimonialStyle;
  const testimonialsContent = section?.content as TestimonialContent;
  const {
    avatar,
    rating,
    spacing,
    align,
    background,
    border,
    carouselSettings,
    displayType,
    grid,
    leftTitlePosition,
    sectionBackground,
    shape,
    textSize,
  } = testimonialStyle?.designSettings;

  const bgMuted = sectionBackground.color === "gray";
  const bgPrimary = sectionBackground.color === "primary";
  const autoScroll = carouselSettings?.autoScroll;
  const scrollSpeed = carouselSettings?.scrollSpeed;
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

  const reviewClassNames = cn({
    "text-sm": textSize === "s",
    "text-md": textSize === "m",
    "text-lg": textSize === "l",
  });

  const gridClassNames = cn(
    "grid items-start",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn(
    "flex flex-col justify-between h-full rounded-md min-h-44",
    {
      "bg-muted": background,
      "outline outline-[1px] outline-muted": border,
      "bg-background": bgMuted || bgPrimary,
    }
  );

  const iconContainerClassNames = cn(
    "flex items-center h-10 w-10 bg-background self-baseline  justify-center shrink-0",
    {
      "rounded-md": shape === "square",
      "rounded-full": shape === "rounded",
    },
    background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted",
    bgPrimary && "bg-muted"
  );

  const imgContainerClassNames = cn(
    "flex items-center h-10 w-10  self-baseline  justify-center shrink-0",
    {
      "rounded-md": shape === "square",
      "rounded-full": shape === "rounded",
    }
  );

  const containerClassNames = cn("grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      leftTitlePosition,
  });

  const sectionBgClassName = cn("flex flex-col relative overflow-hidden", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "min-h-screen": sectionBackground.height === "fill",
    "h-auto": sectionBackground.height === "fit",
    "justify-start": sectionBackground.align === "start",
    "justify-center": sectionBackground.align === "center",
    "justify-end": sectionBackground.align === "end",
    "container max-w-container rounded-md": sectionBackground.width === "fit",
  });
  const mainSection = cn("flex flex-col overflow-hidden", {
    "container max-w-container my-4": sectionBackground.width === "fit",
  });

  const sectionInnerContainer = cn("z-0 gap-10 w-full", {
    "container max-w-container": sectionBackground.width === "fill",
  });

  return (
    <section className={mainSection}>
      <div className={sectionBgClassName}>
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
          className={sectionInnerContainer}
          style={{
            paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
            paddingBottom: isDesktop
              ? spacing.bottom.desktop
              : spacing.bottom.mobile,
          }}
        >
          <div className={containerClassNames}>
            <SectionHeader
              content={testimonialsContent}
              sectionBackground={sectionBackground}
              align={align}
              leftTitlePosition={leftTitlePosition}
            />
            <div className="md:col-span-2">
              {displayType === "grid" ? (
                <div
                  className={gridClassNames}
                  style={{
                    gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
                  }}
                >
                  <AnimatePresence>
                    {section.content.testimonials.map(
                      (review: any, index: number) => {
                        return (
                          <motion.div
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "tween" }}
                            key={review.id || index}
                            className={listItemClassNames}
                            style={{
                              padding: isDesktop
                                ? spacing.padding.desktop
                                : spacing.padding.mobile,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                updateSelectedSection(pageId, section.id)
                              );
                              dispatch(updateSelectedItem(review));
                            }}
                          >
                            <div>
                              {rating && (
                                <div className="flex gap-1 mb-2">
                                  {testimonialsContent.iconType === "star" ? (
                                    [...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={24}
                                        className={
                                          i < review.rating
                                            ? "fill-primary stroke-none"
                                            : "fill-muted-foreground/50 stroke-none"
                                        }
                                      />
                                    ))
                                  ) : (
                                    <QuoteIcon />
                                  )}
                                </div>
                              )}
                              <h5
                                className={reviewClassNames}
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {review.review}
                              </h5>
                            </div>
                            <div className="flex items-center mt-10 gap-2">
                              {avatar && (
                                <>
                                  {review.avatar ? (
                                    <div
                                      className={imgContainerClassNames}
                                      style={{
                                        backgroundImage: `url(${review.avatar})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                      }}
                                    ></div>
                                  ) : (
                                    <div className={iconContainerClassNames}>
                                      <ImagePlaceHolder
                                        fillColor={
                                          background && !bgMuted && !bgPrimary
                                            ? "fill-muted"
                                            : "fill-background"
                                        }
                                        height={20}
                                        width={20}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                              <div className="flex flex-col gap-1">
                                <span
                                  className="text-xs"
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {review.name}
                                </span>
                                <span
                                  className="text-xs text-muted-foreground"
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {review.bio}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      }
                    )}
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
                  <CarouselContent className="py-1">
                    {section.content.testimonials.map(
                      (review: any, index: number) => {
                        return (
                          <CarouselItem
                            key={review.id || index}
                            style={{
                              flexBasis: isDesktop
                                ? carouselSettings.desktopWidth
                                : carouselSettings.mobileWidth,
                              marginInlineEnd: isDesktop
                                ? spacing.gap.desktop
                                : spacing.gap.mobile,
                              paddingInlineStart: index !== 0 ? 0 : "",
                            }}
                          >
                            <div
                              key={index}
                              className={listItemClassNames}
                              style={{
                                padding: isDesktop
                                  ? spacing.padding.desktop
                                  : spacing.padding.mobile,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(
                                  updateSelectedSection(pageId, section.id)
                                );
                                dispatch(updateSelectedItem(review));
                              }}
                            >
                              <div>
                                {rating && (
                                  <div className="flex gap-1 mb-2">
                                    {testimonialsContent.iconType === "star" ? (
                                      [...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          size={21}
                                          className={
                                            i < review.rating
                                              ? "fill-primary stroke-none"
                                              : "fill-muted-foreground/50 stroke-none"
                                          }
                                        />
                                      ))
                                    ) : (
                                      <QuoteIcon />
                                    )}
                                  </div>
                                )}
                                <h5 className={reviewClassNames}>
                                  {review.review}
                                </h5>
                              </div>
                              <div className="flex items-center mt-10 gap-2">
                                {avatar && (
                                  <>
                                    {review.avatar ? (
                                      <div
                                        className={imgContainerClassNames}
                                        style={{
                                          backgroundImage: `url(${review.avatar})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                          backgroundRepeat: "no-repeat",
                                        }}
                                      ></div>
                                    ) : (
                                      <div className={iconContainerClassNames}>
                                        <ImagePlaceHolder
                                          fillColor={
                                            background && !bgMuted && !bgPrimary
                                              ? "fill-muted"
                                              : "fill-background"
                                          }
                                          height={20}
                                          width={20}
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs">{review.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {review.bio}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      }
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
