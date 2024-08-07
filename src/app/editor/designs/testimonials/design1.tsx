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
import { useTheme } from "next-themes";
import * as PhosphorIcons from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/icons/testimonials";

interface DesignProps {
  section: any;
}
function Design1({ section }: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const testimonialStyle = section?.style as TestimonialStyle;
  const testimonialsContent = section?.content as TestimonialContent;

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
    dynamicTextColor && "text-textColor",
    theme === "light" &&
      selectedPallet === "default-theme" &&
      section.style.designSettings.sectionBackground.color === "primary" &&
      "text-white",
    testimonialStyle.designSettings.align === "start" && "text-start",
    testimonialStyle.designSettings.align === "center" && "text-center",
    testimonialStyle.designSettings.align === "end" && "text-end"
  );

  const titleClassName = cn(
    testimonialStyle.designSettings.textSize === "s" && "text-sm font-medium",
    testimonialStyle.designSettings.textSize === "m" &&
      "text-base font-semibold",
    testimonialStyle.designSettings.textSize === "l" && "text-lg font-bold"
  );
  const texClassName = cn("text-muted-foreground text-sm");
  const gridClassNames = cn(
    "grid gap-5 items-start",
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
      // "flex-row items-start": testimonialStyle.designSettings.layout === "row",
      // "flex-col": testimonialStyle.designSettings.layout === "col",
    }
  );

  const listItemTextClassNames = cn("self-center", {
    // "self-start": testimonialStyle.designSettings.layout === "col",
  });

  const iconContainerClassNames = cn(
    "flex items-center h-10 w-10 bg-background self-baseline  justify-center shrink-0",
    {
      "rounded-md": testimonialStyle.designSettings.shape === "square",
      "rounded-full": testimonialStyle.designSettings.shape === "rounded",
      // "bg-background": testimonialStyle.designSettings.iconColor === "none",
      // "bg-primary": testimonialStyle.designSettings.iconColor === "primary",
      // hidden: !testimonialStyle.designSettings.icon,
      // "bg-muted":
      //   testimonialStyle.designSettings.iconColor === "none" &&
      //   testimonialStyle.designSettings.border,
    }
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    testimonialStyle.designSettings.background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      testimonialStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col", {
    "bg-primary":
      section.style.designSettings.sectionBackground.color === "primary",
    "bg-muted": section.style.designSettings.sectionBackground.color === "gray",
    "bg-none": section.style.designSettings.sectionBackground.color === "none",
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

  // const iconClassNames = cn("", {
  //   "text-textColor": testimonialStyle.designSettings.iconColor === "primary",
  //   "text-white":
  //     theme === "light" && testimonialStyle.designSettings.iconColor === "primary",
  // });

  return (
    <section className={sectionBgClassName}>
      <div
        className="container max-w-container gap-10 w-full py-12"
        onClick={() => {
          dispatch(updateSelectedSection(section.id));
          dispatch(updateSelectedItem(null));
          dispatch(closeChooseIcon());
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{section.content.title}</h1>
            <p>{section.content.subtitle}</p>
          </div>
          <div className="md:col-span-2">
            {testimonialStyle.designSettings.displayType === "grid" ? (
              <div className={gridClassNames}>
                {section.content.testimonials.map(
                  (listItem: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={listItemClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(section.id));
                          dispatch(updateSelectedItem(listItem));
                          dispatch(closeChooseIcon());
                        }}
                      >
                        <div>
                          <div className="flex gap-1 mb-2">
                            {testimonialsContent.iconType === "star" ? (
                              [...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={24}
                                  className={
                                    i < listItem.rating
                                      ? "fill-primary stroke-none"
                                      : "fill-muted-foreground stroke-none"
                                  }
                                />
                              ))
                            ) : (
                              <QuoteIcon />
                            )}
                          </div>
                          <p>{listItem.review}</p>
                        </div>
                        <div className="flex items-center mt-10 gap-2">
                          <div className={iconContainerClassNames}>
                            <ImagePlaceHolder
                              fillColor={"fill-muted"}
                              height={20}
                              width={20}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs">{listItem.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {listItem.bio}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
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
                  {section.content.testimonials.map(
                    (listItem: any, index: number) => {
                      return (
                        <CarouselItem
                          className="h-full"
                          key={index}
                          style={{
                            flexBasis: isDesktop
                              ? testimonialStyle.designSettings.carouselSettings
                                  .desktopWidth
                              : testimonialStyle.designSettings.carouselSettings
                                  .mobileWidth,
                          }}
                        >
                          <div
                            key={index}
                            className={listItemClassNames}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(updateSelectedSection(section.id));
                              dispatch(updateSelectedItem(listItem));
                              dispatch(closeChooseIcon());
                            }}
                          >
                            <div>
                              <div className="flex gap-1 mb-2">
                                {testimonialsContent.iconType === "star" ? (
                                  [...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={21}
                                      className={
                                        i < listItem.rating
                                          ? "fill-primary stroke-none"
                                          : "fill-muted-foreground stroke-none"
                                      }
                                    />
                                  ))
                                ) : (
                                  <QuoteIcon />
                                )}
                              </div>
                              <p>{listItem.review}</p>
                            </div>
                            <div className="flex items-center mt-10 gap-2">
                              <div className={iconContainerClassNames}>
                                <ImagePlaceHolder
                                  fillColor={"fill-muted"}
                                  height={20}
                                  width={20}
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-xs">{listItem.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {listItem.bio}
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
