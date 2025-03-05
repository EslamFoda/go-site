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
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";
import { Logo, LogosContent, LogosStyle } from "@/types/sectionsTypes/logos";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector(
    (state) => state.editor.present.selectedPallet
  );
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const logoStyle = section?.style as LogosStyle;
  const logoContent = section?.content as LogosContent;
  const autoScroll = logoStyle?.designSettings?.carouselSettings?.autoScroll;
  const scrollSpeed = logoStyle?.designSettings?.carouselSettings?.scrollSpeed;
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
    logoStyle.designSettings.align === "start" && "text-start",
    logoStyle.designSettings.align === "center" && "text-center",
    logoStyle.designSettings.align === "end" && "text-end"
  );

  const gridClassNames = cn(
    "grid gap-5",
    logoStyle.designSettings.grid.desktop === 4 && "lg:grid-cols-4",
    logoStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    logoStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    logoStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    logoStyle.designSettings.grid.mobile === 4 && "grid-cols-4",
    logoStyle.designSettings.grid.mobile === 3 && "grid-cols-3",
    logoStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    logoStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md overflow-hidden relative",
    logoStyle.designSettings.background && "bg-muted p-5",
    logoStyle.designSettings.border &&
      "outline outline-[1px] outline-muted p-5",
    bgMuted && logoStyle.designSettings.background && "bg-background",
    bgMuted &&
      logoStyle.designSettings.border &&
      "outline outline-[1px] outline-background"
    // bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    logoStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn(
    " flex flex-col",
    logoStyle.designSettings.sectionBackground.color === "primary" &&
      "bg-primary",
    logoStyle.designSettings.sectionBackground.color === "gray" && "bg-muted",
    logoStyle.designSettings.sectionBackground.color === "none" &&
      "bg-background",
    logoStyle.designSettings.sectionBackground.height === "fill" && "h-screen",
    logoStyle.designSettings.sectionBackground.height === "fit" && "h-auto",
    logoStyle.designSettings.sectionBackground.align === "start" &&
      "justify-start",
    logoStyle.designSettings.sectionBackground.align === "center" &&
      "justify-center",
    logoStyle.designSettings.sectionBackground.align === "end" && "justify-end"
  );

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
      }}
    >
      <div className="container max-w-container gap-10 w-full py-12">
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{logoContent.title}</h1>
            <p>{logoContent.subtitle}</p>
          </div>
          <div className="md:col-span-2">
            {logoStyle.designSettings.displayType === "grid" ? (
              <div className={gridClassNames}>
                <AnimatePresence>
                  {logoContent.logos.map((logo: Logo, index: number) => (
                    <motion.div
                      layout
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "tween" }}
                      style={{
                        minHeight: isDesktop
                          ? logoStyle.designSettings.height.desktop
                          : logoStyle.designSettings.height.mobile,
                      }}
                      key={logo.id || index} // Ensure this key is unique and stable
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(logo));
                        dispatch(closePagesTab());
                      }}
                    >
                      <div
                        className="absolute top-0 right-0"
                        style={{
                          transform: `scale(${
                            isDesktop ? logo.size.desktop : logo.size.mobile
                          })`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${
                            theme === "dark"
                              ? logo.urlDark || logo.urlLight
                              : logo.urlLight || logo.urlDark
                          })`,
                        }}
                      ></div>
                      {!logo.urlDark && !logo.urlLight && (
                        <div className={imagePlaceholderClassNames}>
                          <ImagePlaceHolder
                            height={30}
                            width={30}
                            fillColor={
                              logoStyle.designSettings.background && !bgMuted
                                ? "fill-background"
                                : !logoStyle.designSettings.background &&
                                  bgMuted
                                ? "fill-background"
                                : "fill-muted"
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
                className="w-full"
              >
                <CarouselContent className="items-stretch">
                  {logoContent.logos.map((logo: Logo, index: number) => (
                    <CarouselItem
                      className="h-full"
                      key={logo.id || index} // Ensure this key is unique and stable
                      style={{
                        flexBasis: isDesktop
                          ? logoStyle.designSettings.carouselSettings
                              .desktopWidth
                          : logoStyle.designSettings.carouselSettings
                              .mobileWidth,
                      }}
                    >
                      <div
                        style={{
                          minHeight: isDesktop
                            ? logoStyle.designSettings.height.desktop
                            : logoStyle.designSettings.height.mobile,
                        }}
                        key={index}
                        className={cardClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(logo));
                          dispatch(closePagesTab());
                        }}
                      >
                        <div
                          className="absolute top-0 right-0"
                          style={{
                            transform: `scale(${
                              isDesktop ? logo.size.desktop : logo.size.mobile
                            })`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${
                              theme === "dark"
                                ? logo.urlDark || logo.urlLight
                                : logo.urlLight || logo.urlDark
                            })`,
                          }}
                        ></div>
                        {!logo.urlDark && (
                          <div className={imagePlaceholderClassNames}>
                            <ImagePlaceHolder
                              height={30}
                              width={30}
                              fillColor={
                                logoStyle.designSettings.background && !bgMuted
                                  ? "fill-background"
                                  : !logoStyle.designSettings.background &&
                                    bgMuted
                                  ? "fill-background"
                                  : "fill-muted"
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

export default Design1;
