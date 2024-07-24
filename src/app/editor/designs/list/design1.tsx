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
import useEditor from "@/store/editorStore";
import { useTheme } from "next-themes";
import { ListItem, ListStyle } from "@/types/sectionsTypes/list";
import * as PhosphorIcons from "@phosphor-icons/react";

interface DesignProps {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
  handleSelectedItem: (item: ListItem | null) => void;
  closeChooseIcon: () => void;
}
function Design1({
  section,
  handleSelectedSection,
  handleSelectedItem,
  closeChooseIcon,
}: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { selectedPallet } = useEditor();
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
          delay: 3000,
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
      "text-white"
  );

  const titleClassName = cn(
    listStyle.designSettings.textSize === "s" && "text-sm font-medium",
    listStyle.designSettings.textSize === "m" && "text-base font-semibold",
    listStyle.designSettings.textSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn("text-gray-400");
  const gridClassNames = cn(
    "grid gap-5 items-start",
    listStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    listStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    listStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    listStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    listStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const alignClassNames = cn(
    "container gap-10 w-full py-12",
    listStyle.designSettings.align === "start" && "text-start",
    listStyle.designSettings.align === "center" && "text-center",
    listStyle.designSettings.align === "end" && "text-end"
  );

  const cardClassNames = cn("flex gap-5 gap-y-3  rounded-md", {
    "bg-muted p-5": listStyle.designSettings.background,
    "border border-muted p-5": listStyle.designSettings.border,
    "bg-background": bgMuted,
    "flex-row items-start": listStyle.designSettings.layout === "row",
    "flex-col": listStyle.designSettings.layout === "col",
  });

  const listItemTextClassNames = cn("self-center", {
    "self-start": listStyle.designSettings.layout === "col",
  });

  const iconContainerClassNames = cn(
    "flex items-center justify-center shrink-0",
    {
      "rounded-md": listStyle.designSettings.shape === "square",
      "rounded-full": listStyle.designSettings.shape === "rounded",
      "bg-background": listStyle.designSettings.iconColor === "none",
      "bg-primary": listStyle.designSettings.iconColor === "primary",
    }
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    listStyle.designSettings.background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-[1fr_2fr] grid-cols-1 gap-4 md:space-y-0 space-y-4":
      listStyle.designSettings.leftTitlePosition,
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

  return (
    <section className={sectionBgClassName}>
      <div
        className={alignClassNames}
        onClick={() => {
          handleSelectedSection(section.id);
          handleSelectedItem(null);
          closeChooseIcon();
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{section.content.title}</h1>
            <p>{section.content.subtitle}</p>
          </div>
          {listStyle.designSettings.displayType === "grid" ? (
            <div className={gridClassNames}>
              {section.content.list.map((listItem: any, index: number) => {
                const ListIcon = PhosphorIcons[
                  listItem.icon as keyof typeof PhosphorIcons
                ] as PhosphorIcons.Icon;
                return (
                  <div
                    key={index}
                    className={cardClassNames}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectedSection(section.id);
                      handleSelectedItem(listItem);
                      closeChooseIcon();
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
                        />
                      ) : (
                        <ImagePlaceHolder
                          fillColor="fill-muted"
                          height={listStyle.designSettings.height / 2.5}
                          width={listStyle.designSettings.height / 2.5}
                        />
                      )}
                    </div>
                    <div className={listItemTextClassNames}>
                      <h5 className={titleClassName}>{listItem.title}</h5>
                      <p className={textOrderClassName}>{listItem.text}</p>
                    </div>
                  </div>
                );
              })}
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
                        className={cardClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectedSection(section.id);
                          handleSelectedItem(listItem);
                          closeChooseIcon();
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
                            <ListIcon />
                          ) : (
                            <ImagePlaceHolder
                              fillColor="fill-muted"
                              height={listStyle.designSettings.height / 2.5}
                              width={listStyle.designSettings.height / 2.5}
                            />
                          )}
                        </div>
                        <div className={listItemTextClassNames}>
                          <h5 className={titleClassName}>{listItem.title}</h5>
                          <p className={textOrderClassName}>{listItem.text}</p>
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
    </section>
  );
}

export default Design1;
