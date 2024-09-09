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
  closePageSettings,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  GalleryContent,
  GalleryStyle,
  Photo,
} from "@/types/sectionsTypes/gallery";
import { useMotion } from "@/hooks/useMotion";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { motion, AnimatePresence } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const galleryStyle = section?.style as GalleryStyle;
  const galleryContent = section?.content as GalleryContent;
  const autoScroll = galleryStyle?.designSettings?.carouselSettings?.autoScroll;
  const scrollSpeed =
    galleryStyle?.designSettings?.carouselSettings?.scrollSpeed;
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
      "text-white"
  );

  const gridClassNames = cn(
    "grid gap-5",
    galleryStyle.designSettings.grid.desktop === 4 && "lg:grid-cols-4",
    galleryStyle.designSettings.grid.desktop === 3 && "lg:grid-cols-3",
    galleryStyle.designSettings.grid.desktop === 2 && "lg:grid-cols-2",
    galleryStyle.designSettings.grid.desktop === 1 && "lg:grid-cols-1",
    galleryStyle.designSettings.grid.mobile === 2 && "grid-cols-2",
    galleryStyle.designSettings.grid.mobile === 1 && "grid-cols-1"
  );

  const cardClassNames = cn(
    "flex flex-col  gap-2 rounded-md relative p-5 bg-muted p-5",
    bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    " absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  );

  const containerClassNames = cn(
    " grid grid-cols-1 space-y-4",
    galleryStyle.designSettings.leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionBgClassName = cn(
    " flex flex-col",
    galleryStyle.designSettings.sectionBackground.color === "primary" &&
      "bg-primary",
    galleryStyle.designSettings.sectionBackground.color === "gray" &&
      "bg-muted",
    galleryStyle.designSettings.sectionBackground.color === "none" &&
      "bg-background",
    galleryStyle.designSettings.sectionBackground.height === "fill" &&
      "h-screen",
    galleryStyle.designSettings.sectionBackground.height === "fit" && "h-auto",
    galleryStyle.designSettings.sectionBackground.align === "start" &&
      "justify-start",
    galleryStyle.designSettings.sectionBackground.align === "center" &&
      "justify-center",
    galleryStyle.designSettings.sectionBackground.align === "end" &&
      "justify-end"
  );

  return (
    <section className={sectionBgClassName}>
      <div
        className="container max-w-container gap-10 w-full py-12"
        onClick={() => {
          dispatch(updateSelectedSection(pageId, section.id));
          dispatch(updateSelectedItem(null));
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{galleryContent.title}</h1>
            <p>{galleryContent.subtitle}</p>
          </div>
          <div className="md:col-span-2">
            {galleryStyle.designSettings.displayType === "grid" ? (
              <div className={gridClassNames}>
                <AnimatePresence mode={"popLayout"}>
                  {galleryContent.photos.map((photo: Photo, index: number) => (
                    <motion.div
                      layout="preserve-aspect"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "tween" }}
                      style={{
                        minHeight: isDesktop
                          ? galleryStyle.designSettings.height.desktop
                          : galleryStyle.designSettings.height.mobile,
                        backgroundImage: `url(${photo.url})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      key={photo.id || index} // Ensure this key is unique and stable
                      className={cardClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(photo));
                        dispatch(closePageSettings());
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
                  {galleryContent.photos.map((photo: Photo, index: number) => (
                    <CarouselItem
                      className="h-full"
                      key={index}
                      style={{
                        flexBasis: isDesktop
                          ? galleryStyle.designSettings.carouselSettings
                              .desktopWidth
                          : galleryStyle.designSettings.carouselSettings
                              .mobileWidth,
                      }}
                    >
                      <div
                        style={{
                          minHeight: isDesktop
                            ? galleryStyle.designSettings.height.desktop
                            : galleryStyle.designSettings.height.mobile,
                          backgroundImage: `url(${photo.url})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        key={index}
                        className={cardClassNames}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateSelectedSection(pageId, section.id));
                          dispatch(updateSelectedItem(photo));
                          dispatch(closePageSettings());
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
