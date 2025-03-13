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
import {
  closeChooseIcon,
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/icons/testimonials";
import { useMotion } from "@/hooks/useMotion";
import BackgroundImage from "@/components/shared/backgroundImage";

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
  const testimonialStyle = section?.style as TestimonialStyle;
  const testimonialsContent = section?.content as TestimonialContent;
  const { avatar, rating, spacing } = testimonialStyle.designSettings;

  const autoScroll =
    testimonialStyle?.designSettings?.carouselSettings?.autoScroll;
  const scrollSpeed =
    testimonialStyle?.designSettings?.carouselSettings?.scrollSpeed;
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

  const titleAndSubtitleClassName = cn(
    testimonialStyle.designSettings.align === "start" && "text-start",
    testimonialStyle.designSettings.align === "center" && "text-center",
    testimonialStyle.designSettings.align === "end" && "text-end"
  );

  const reviewClassNames = cn({
    "text-sm": testimonialStyle.designSettings.textSize === "s",
    "text-sm font-semibold": testimonialStyle.designSettings.textSize === "m",
    "text-md font-semibold": testimonialStyle.designSettings.textSize === "l",
  });

  const gridClassNames = cn(
    "grid items-start",
    testimonialStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    testimonialStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    testimonialStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    testimonialStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    testimonialStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn(
    "flex flex-col justify-between h-full rounded-md min-h-44",
    {
      "bg-muted p-5": testimonialStyle.designSettings.background,
      "outline outline-[1px] outline-muted p-5":
        testimonialStyle.designSettings.border,
      "bg-background": bgMuted,
    }
  );

  const iconContainerClassNames = cn(
    "flex items-center h-10 w-10 bg-background self-baseline  justify-center shrink-0",
    {
      "rounded-md": testimonialStyle.designSettings.shape === "square",
      "rounded-full": testimonialStyle.designSettings.shape === "rounded",
    },
    testimonialStyle.designSettings.background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const imgContainerClassNames = cn(
    "flex items-center h-10 w-10  self-baseline  justify-center shrink-0",
    {
      "rounded-md": testimonialStyle.designSettings.shape === "square",
      "rounded-full": testimonialStyle.designSettings.shape === "rounded",
    }
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      testimonialStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col relative overflow-hidden", {
    "bg-primary":
      section.style.designSettings.sectionBackground.color === "primary",
    "bg-muted": section.style.designSettings.sectionBackground.color === "gray",
    "bg-background":
      section.style.designSettings.sectionBackground.color === "none",
    "h-screen":
      section.style.designSettings.sectionBackground.height === "fill",
    "h-auto": section.style.designSettings.sectionBackground.height === "fit",
    "justify-start":
      section.style.designSettings.sectionBackground.align === "start",
    "justify-center":
      section.style.designSettings.sectionBackground.align === "center",
    "justify-end":
      section.style.designSettings.sectionBackground.align === "end",
  });

  const sectionTitleClassNames = cn("text-4xl", {
    "text-primary-foreground":
      testimonialStyle.designSettings.sectionBackground.color === "primary",
    "text-start": testimonialStyle.designSettings.leftTitlePosition,
    "text-white":
      testimonialStyle.designSettings.sectionBackground.textColor === "light" &&
      testimonialStyle.designSettings.sectionBackground.media.imageUrl,
    "text-black":
      testimonialStyle.designSettings.sectionBackground.textColor === "dark" &&
      testimonialStyle.designSettings.sectionBackground.media.imageUrl,
  });
  const sectionSubTitleClassNames = cn({
    "text-primary-foreground":
      testimonialStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      testimonialStyle.designSettings.sectionBackground.color !== "primary",
    "text-start": testimonialStyle.designSettings.leftTitlePosition,
    "text-white":
      testimonialStyle.designSettings.sectionBackground.textColor === "light" &&
      testimonialStyle.designSettings.sectionBackground.media.imageUrl,
    "text-black":
      testimonialStyle.designSettings.sectionBackground.textColor === "dark" &&
      testimonialStyle.designSettings.sectionBackground.media.imageUrl,
  });

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        dispatch(closeChooseIcon());
      }}
    >
      <BackgroundImage
        imageUrl={
          testimonialStyle.designSettings.sectionBackground.media.imageUrl
        }
        parallax={testimonialStyle.designSettings.sectionBackground.parallax}
        blur={testimonialStyle.designSettings.sectionBackground.blur}
        blurEffect={
          testimonialStyle.designSettings.sectionBackground.blurEffect
        }
        greyScale={testimonialStyle.designSettings.sectionBackground.greyScale}
        overlay={testimonialStyle.designSettings.sectionBackground.overlay}
        overlayEffect={
          testimonialStyle.designSettings.sectionBackground.overlayEffect
        }
        backgroundColor={
          testimonialStyle.designSettings.sectionBackground.color
        }
      />
      <div
        className="container max-w-container z-0 gap-10 w-full"
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className={sectionTitleClassNames}>{section.content.title}</h1>
            <p className={sectionSubTitleClassNames}>
              {section.content.subtitle}
            </p>
          </div>
          <div className="md:col-span-2">
            {testimonialStyle.designSettings.displayType === "grid" ? (
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
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateSelectedSection(pageId, section.id));
                            dispatch(updateSelectedItem(review));
                            dispatch(closeChooseIcon());
                            dispatch(closePagesTab());
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
                                          : "fill-muted-foreground stroke-none"
                                      }
                                    />
                                  ))
                                ) : (
                                  <QuoteIcon />
                                )}
                              </div>
                            )}
                            <p className={reviewClassNames}>{review.review}</p>
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
                                        testimonialStyle.designSettings
                                          .background && !bgMuted
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
                              ? testimonialStyle.designSettings.carouselSettings
                                  .desktopWidth
                              : testimonialStyle.designSettings.carouselSettings
                                  .mobileWidth,
                            marginInlineEnd: isDesktop
                              ? spacing.gap.desktop
                              : spacing.gap.mobile,
                            paddingInlineStart: index !== 0 ? 0 : "",
                          }}
                        >
                          <div
                            key={index}
                            className={listItemClassNames}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                updateSelectedSection(pageId, section.id)
                              );
                              dispatch(updateSelectedItem(review));
                              dispatch(closeChooseIcon());
                              dispatch(closePagesTab());
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
                                            : "fill-muted-foreground stroke-none"
                                        }
                                      />
                                    ))
                                  ) : (
                                    <QuoteIcon />
                                  )}
                                </div>
                              )}
                              <p className={reviewClassNames}>
                                {review.review}
                              </p>
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
                                          testimonialStyle.designSettings
                                            .background && !bgMuted
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
    </section>
  );
}

export default Design1;
