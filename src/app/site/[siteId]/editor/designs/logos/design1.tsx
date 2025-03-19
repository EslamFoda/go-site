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
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useMotion } from "@/hooks/useMotion";
import { Logo, LogosContent, LogosStyle } from "@/types/sectionsTypes/logos";
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

  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";

  const logoStyle = section?.style as LogosStyle;
  const logoContent = section?.content as LogosContent;
  const {
    spacing,
    align,
    background,
    border,
    carouselSettings,
    displayType,
    grid,
    height,
    leftTitlePosition,
    sectionBackground,
  } = logoStyle.designSettings;

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
  const titleAndSubtitleClassName = cn("space-y-3", {
    "text-start": align === "start" || leftTitlePosition,
    "text-center": align === "center" && !leftTitlePosition,
    "text-end": align === "end" && !leftTitlePosition,
  });

  const gridClassNames = cn("grid", {
    "lg:grid-cols-4": grid.desktop === 4,
    "lg:grid-cols-3": grid.desktop === 3,
    "lg:grid-cols-2": grid.desktop === 2,
    "lg:grid-cols-1": grid.desktop === 1,
    "grid-cols-4": grid.mobile === 4,
    "grid-cols-3": grid.mobile === 3,
    "grid-cols-2": grid.mobile === 2,
    "grid-cols-1": grid.mobile === 1,
  });

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md overflow-hidden relative",
    background && "bg-muted p-5",
    border && "outline outline-[1px] outline-muted p-5",
    bgMuted && background && "bg-background",
    bgMuted && border && "outline outline-[1px] outline-background"
    // bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
    "text-start": leftTitlePosition,
    "text-muted-foreground": sectionBackground.color !== "primary",
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
            <DesignLabel
              text={logoContent.label}
              sectionBackground={sectionBackground.color}
            />
            <h1
              className={sectionTitleClassNames}
              style={{ whiteSpace: "pre-line" }}
            >
              {logoContent.title}
            </h1>
            <p
              className={sectionSubTitleClassNames}
              style={{ whiteSpace: "pre-line" }}
            >
              {logoContent.subtitle}
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
                  {logoContent.logos.map((logo: Logo, index: number) => (
                    <motion.div
                      layout
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "tween" }}
                      style={{
                        minHeight: isDesktop ? height.desktop : height.mobile,
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
                              background && !bgMuted
                                ? "fill-background"
                                : !background && bgMuted
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
                          ? carouselSettings.desktopWidth
                          : carouselSettings.mobileWidth,
                        marginInlineEnd: isDesktop
                          ? spacing.gap.desktop
                          : spacing.gap.mobile,
                        paddingInlineStart: index !== 0 ? 0 : "",
                      }}
                    >
                      <div
                        style={{
                          minHeight: isDesktop ? height.desktop : height.mobile,
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
                                background && !bgMuted
                                  ? "fill-background"
                                  : !background && bgMuted
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
