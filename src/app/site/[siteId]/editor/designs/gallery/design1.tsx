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
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  GalleryContent,
  GalleryStyle,
  Photo,
} from "@/types/sectionsTypes/gallery";
import { useMotion } from "@/hooks/useMotion";
import BackgroundImage from "@/components/shared/backgroundImage";
import DesignLabel from "@/components/shared/label";
import SectionHeader from "@/components/shared/sectionHeader";

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
  const galleryStyle = section?.style as GalleryStyle;
  const {
    spacing,
    carouselSettings,
    displayType,
    grid,
    height,
    leftTitlePosition,
    sectionBackground,
  } = galleryStyle.designSettings;
  const galleryContent = section?.content as GalleryContent;
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

  const gridClassNames = cn("grid", {
    "lg:grid-cols-10": grid.desktop === 10,
    "lg:grid-cols-9": grid.desktop === 9,
    "lg:grid-cols-8": grid.desktop === 8,
    "lg:grid-cols-7": grid.desktop === 7,
    "lg:grid-cols-6": grid.desktop === 6,
    "lg:grid-cols-5": grid.desktop === 5,
    "lg:grid-cols-4": grid.desktop === 4,
    "lg:grid-cols-3": grid.desktop === 3,
    "lg:grid-cols-2": grid.desktop === 2,
    "lg:grid-cols-1": grid.desktop === 1,
    "grid-cols-5": grid.mobile === 5,
    "grid-cols-4": grid.mobile === 4,
    "grid-cols-3": grid.mobile === 3,
    "grid-cols-2": grid.mobile === 2,
    "grid-cols-1": grid.mobile === 1,
  });

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md relative p-5 bg-muted p-5",
    bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    " absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
              content={galleryContent}
              sectionBackground={sectionBackground}
              leftTitlePosition={leftTitlePosition}
              containerClassName="space-y-3 text-start"
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
                    {galleryContent.photos.map(
                      (photo: Photo, index: number) => (
                        <motion.div
                          key={photo.id || index} // Ensure this key is unique and stable
                          layout
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: 'keyframes' }}
                          style={{
                            minHeight: isDesktop
                              ? height.desktop
                              : height.mobile,
                            backgroundImage: `url(${photo.url})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          className={cardClassNames}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(updateSelectedSection(pageId, section.id));
                            dispatch(updateSelectedItem(photo));
                            dispatch(closePagesTab());
                          }}
                        >
                          {!photo.url && (
                            <div className={imagePlaceholderClassNames}>
                              <ImagePlaceHolder
                                fillColor={
                                  bgMuted ? "fill-muted" : "fill-background"
                                }
                              />
                            </div>
                          )}
                        </motion.div>
                      )
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
                  <CarouselContent className="items-stretch">
                    {galleryContent.photos.map(
                      (photo: Photo, index: number) => (
                        <CarouselItem
                          className="h-full"
                          key={photo.id || index} // Ensure this key is unique and stable
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
                              minHeight: isDesktop
                                ? height.desktop
                                : height.mobile,
                              backgroundImage: `url(${photo.url})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                            key={index}
                            className={cardClassNames}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                updateSelectedSection(pageId, section.id)
                              );
                              dispatch(updateSelectedItem(photo));
                              dispatch(closePagesTab());
                            }}
                          >
                            {!photo.url && (
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
                      )
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
