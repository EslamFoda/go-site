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
import { ListStyle } from "@/types/sectionsTypes/list";
import * as PhosphorIcons from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
  closePageSettings,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { AnimatePresence, motion } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const listStyle = section?.style as ListStyle;
  const autoScroll = listStyle?.designSettings?.carouselSettings?.autoScroll;
  const scrollSpeed = listStyle?.designSettings?.carouselSettings?.scrollSpeed;
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
    listStyle.designSettings.align === "start" && "text-start",
    listStyle.designSettings.align === "center" && "text-center",
    listStyle.designSettings.align === "end" && "text-end"
  );

  const titleClassName = cn(
    listStyle.designSettings.textSize === "s" && "text-sm",
    listStyle.designSettings.textSize === "m" && "text-base",
    listStyle.designSettings.textSize === "l" && "text-lg"
  );
  const texClassName = cn("text-muted-foreground text-sm");
  const gridClassNames = cn(
    "grid gap-5 items-start",
    listStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    listStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    listStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    listStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    listStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn("flex gap-5 gap-y-3  rounded-md", {
    "bg-muted p-5": listStyle.designSettings.background,
    "outline outline-[1px] outline-muted p-5": listStyle.designSettings.border,
    "bg-background": bgMuted,
    "flex-row items-start": listStyle.designSettings.layout === "row",
    "flex-col": listStyle.designSettings.layout === "col",
  });

  const listItemTextClassNames = cn("self-center", {
    "self-start": listStyle.designSettings.layout === "col",
  });

  const iconContainerClassNames = cn(
    "flex items-center  justify-center shrink-0",
    {
      "rounded-sm": listStyle.designSettings.shape === "square",
      "rounded-full": listStyle.designSettings.shape === "rounded",
      "bg-background": listStyle.designSettings.iconColor === "none",
      "bg-primary": listStyle.designSettings.iconColor === "primary",
      hidden: !listStyle.designSettings.icon,
      "bg-muted":
        (listStyle.designSettings.iconColor === "none" &&
          listStyle.designSettings.border) ||
        bgMuted,
    }
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    listStyle.designSettings.background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      listStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col", {
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

  const iconClassNames = cn("", {
    "text-textColor": listStyle.designSettings.iconColor === "primary",
    "text-white":
      theme === "light" && listStyle.designSettings.iconColor === "primary",
  });

  return (
    <section className={sectionBgClassName}>
      <div
        className="container max-w-container gap-10 w-full py-12"
        onClick={() => {
          dispatch(updateSelectedSection(pageId, section.id));
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
            {listStyle.designSettings.displayType === "grid" ? (
              <div className={gridClassNames}>
                <AnimatePresence>
                  {section.content.list.map((listItem: any, index: number) => {
                    const ListIcon = PhosphorIcons[
                      listItem.icon as keyof typeof PhosphorIcons
                    ] as PhosphorIcons.Icon;
                    return (
                      <motion.div
                        layout
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "tween" }}
                        key={listItem.id || index}
                        className={listItemClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(listItem));
                          dispatch(closeChooseIcon());
                          dispatch(closePageSettings());
                        }}
                      >
                        <div
                          className={iconContainerClassNames}
                          style={{
                            height: listStyle.designSettings.height,
                            width: listStyle.designSettings.height,
                          }}
                        >
                          {listItem.icon ? (
                            <ListIcon
                              size={listStyle.designSettings.height / 2.5}
                              className={iconClassNames}
                            />
                          ) : (
                            <ImagePlaceHolder
                              fillColor={
                                listStyle.designSettings.border || bgMuted
                                  ? "fill-background"
                                  : "fill-muted"
                              }
                              height={listStyle.designSettings.height / 2.5}
                              width={listStyle.designSettings.height / 2.5}
                            />
                          )}
                        </div>
                        <div className={listItemTextClassNames}>
                          <h5 className={titleClassName}>{listItem.title}</h5>
                          <p className={texClassName}>{listItem.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
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
                  {section.content.list.map((listItem: any, index: number) => {
                    const ListIcon = PhosphorIcons[
                      listItem.icon as keyof typeof PhosphorIcons
                    ] as PhosphorIcons.Icon;
                    return (
                      <CarouselItem
                        className="h-full"
                        key={index}
                        style={{
                          flexBasis: isDesktop
                            ? listStyle.designSettings.carouselSettings
                                .desktopWidth
                            : listStyle.designSettings.carouselSettings
                                .mobileWidth,
                        }}
                      >
                        <div
                          key={index}
                          className={listItemClassNames}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateSelectedSection(pageId, section.id));
                            dispatch(updateSelectedItem(listItem));
                            dispatch(closeChooseIcon());
                            dispatch(closePageSettings());
                          }}
                        >
                          <div
                            className={iconContainerClassNames}
                            style={{
                              height: listStyle.designSettings.height,
                              width: listStyle.designSettings.height,
                            }}
                          >
                            {listItem.icon ? (
                              <ListIcon
                                size={listStyle.designSettings.height / 2.5}
                                className={iconClassNames}
                              />
                            ) : (
                              <ImagePlaceHolder
                                fillColor={
                                  listStyle.designSettings.border || bgMuted
                                    ? "fill-background"
                                    : "fill-muted"
                                }
                                height={listStyle.designSettings.height / 2.5}
                                width={listStyle.designSettings.height / 2.5}
                              />
                            )}
                          </div>
                          <div className={listItemTextClassNames}>
                            <h5 className={titleClassName}>{listItem.title}</h5>
                            <p className={texClassName}>{listItem.text}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
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
