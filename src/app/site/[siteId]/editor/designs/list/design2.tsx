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
import { ListContent, ListStyle } from "@/types/sectionsTypes/list";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import BackgroundImage from "@/components/shared/backgroundImage";
import DesignLabel from "@/components/shared/label";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design2({ section, pageId }: DesignProps) {
  const { AnimatePresence, motion } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const listStyle = section?.style as ListStyle;
  const listContent = section?.content as ListContent;

  const {
    spacing,
    align,
    background,
    border,
    carouselSettings,
    displayType,
    grid,
    height,
    icon,
    iconColor,
    layout,
    leftTitlePosition,
    sectionBackground,
    shape,
    textSize,
  } = listStyle.designSettings;
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

  const titleAndSubtitleClassName = cn('space-y-3',{
    "text-start": align === "start" || leftTitlePosition,
    "text-center": align === "center" && !leftTitlePosition,
    "text-end": align === "end" && !leftTitlePosition,
  });

  const titleClassName = cn(
    textSize === "s" && "text-sm",
    textSize === "m" && "text-base",
    textSize === "l" && "text-lg"
  );
  const texClassName = cn("text-muted-foreground text-sm");
  const gridClassNames = cn(
    "grid items-start",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn(
    "flex justify-between gap-5 gap-y-3 rounded-md",
    {
      "bg-muted": background,
      "outline outline-[1px] outline-muted": border,
      "bg-background": bgMuted,
      "flex-row items-start": layout === "row",
      "flex-col-reverse": layout === "col",
    }
  );

  const listItemTextClassNames = cn("self-center", {
    "self-start": layout === "col",
  });

  const iconContainerClassNames = cn(
    "flex items-center justify-center shrink-0",
    {
      "rounded-md": shape === "square",
      "rounded-full": shape === "rounded",
      "bg-background": iconColor === "none",
      "bg-primary": iconColor === "primary",
      hidden: !icon,
      "self-end": layout === "col",
      "bg-muted": (iconColor === "none" && border) || bgMuted,
    }
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col relative overflow-hidden", {
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
        className="container max-w-container gap-10 z-0 w-full"
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <DesignLabel
              text={listContent.label}
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
                  {section.content.list.map((listItem: any, index: number) => {
                    const ListIcon = getPhosphorIcon(listItem.icon);
                    return (
                      <motion.div
                        layout
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "tween" }}
                        key={listItem.id || index}
                        className={listItemClassNames}
                        style={{
                          padding: isDesktop
                            ? spacing.padding.desktop
                            : spacing.padding.mobile,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(listItem));
                          dispatch(closeChooseIcon());
                          dispatch(closePagesTab());
                        }}
                      >
                        <div className={listItemTextClassNames}>
                          <h5
                            className={titleClassName}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {listItem.title}
                          </h5>
                          <p
                            className={texClassName}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {listItem.text}
                          </p>
                        </div>
                        <div
                          className={iconContainerClassNames}
                          style={{
                            height: height,
                            width: height,
                          }}
                        >
                          {listItem.icon ? (
                            <ListIcon
                              size={height / 2.5}
                              className="text-primary-foreground"
                            />
                          ) : (
                            <ImagePlaceHolder
                              fillColor={
                                border || bgMuted
                                  ? "fill-background"
                                  : "fill-muted"
                              }
                              height={height / 2.5}
                              width={height / 2.5}
                            />
                          )}
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
                <CarouselContent className="items-stretch py-1">
                  {section.content.list.map((listItem: any, index: number) => {
                    const ListIcon = getPhosphorIcon(listItem.icon);
                    return (
                      <CarouselItem
                        className="h-full"
                        key={index}
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
                            dispatch(updateSelectedSection(pageId, section.id));
                            dispatch(updateSelectedItem(listItem));
                            dispatch(closeChooseIcon());
                            dispatch(closePagesTab());
                          }}
                        >
                          <div className={listItemTextClassNames}>
                            <h5
                              className={titleClassName}
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {listItem.title}
                            </h5>
                            <p
                              className={texClassName}
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {listItem.text}
                            </p>
                          </div>
                          <div
                            className={iconContainerClassNames}
                            style={{
                              height: height,
                              width: height,
                            }}
                          >
                            {listItem.icon ? (
                              <ListIcon
                                size={height / 2.5}
                                className="text-primary-foreground"
                              />
                            ) : (
                              <ImagePlaceHolder
                                fillColor={
                                  border || bgMuted
                                    ? "fill-background"
                                    : "fill-muted"
                                }
                                height={height / 2.5}
                                width={height / 2.5}
                              />
                            )}
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

export default Design2;
