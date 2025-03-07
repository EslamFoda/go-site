import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
import BannerButtons from "./bannerButtons";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
interface Design6Props {
  section: any;
  pageId: string;
}
function Design6({ section, pageId }: Design6Props) {
  const dispatch = useAppDispatch();
  const bannerContent = section?.content as BannerContent;
  const bannerStyle = section?.style as BannerStyle;
  const titleSize = bannerStyle.designSettings.titleSize;
  const showImage = section?.style.designSettings.imageSetting.showImage;
  const showButtons = section?.style.designSettings.showButtons;
  const subTitleWidth = section?.style.designSettings.subtitleWidth;
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const sectionBgClassName = cn(" flex flex-col", {
    "bg-primary":
      bannerStyle.designSettings.sectionBackground.color === "primary",
    "bg-muted": bannerStyle.designSettings.sectionBackground.color === "gray",
    "bg-background":
      bannerStyle.designSettings.sectionBackground.color === "none",
    "h-screen": bannerStyle.designSettings.sectionBackground.height === "fill",
    "h-auto": bannerStyle.designSettings.sectionBackground.height === "fit",
    "justify-start":
      bannerStyle.designSettings.sectionBackground.align === "start",
    "justify-center":
      bannerStyle.designSettings.sectionBackground.align === "center",
    "justify-end": bannerStyle.designSettings.sectionBackground.align === "end",
  });
  const imageClassName = cn(" bg-cover bg-no-repeat bg-center w-full", {
    "bg-primary":
      bannerStyle.designSettings.imageSetting.backgroundColor === "primary",
    "bg-muted":
      bannerStyle.designSettings.imageSetting.backgroundColor === "gray",
    "bg-none":
      bannerStyle.designSettings.imageSetting.backgroundColor === "none",
  });

  const titleClassName = cn({
    "text-7xl": titleSize === "xl",
    "text-6xl": titleSize === "l",
    "text-5xl": titleSize === "m",
    "text-4xl": titleSize === "s",
    "text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
  });

  const TitleAndSubtitleClassName = cn(
    "w-full flex space-y-7 flex-col text-start"
  );

  const subAndButtonClassName = cn(
    "w-full flex space-y-7 flex-col items-start"
  );
  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center",
    bgMuted ? "bg-background" : "bg-muted"
  );
  const subTitleColor = cn("text-lg", {
    "text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      bannerStyle.designSettings.sectionBackground.color !== "primary",
  });
  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
      }}
    >
      <div className="container max-w-container py-12">
        <div className="mb-8">
          <h1 className={titleClassName}>{bannerContent.title}</h1>
        </div>
        <div className="flex max-lg:flex-col  gap-10 w-full  text-center justify-center">
          <div className={TitleAndSubtitleClassName}>
            <div className={subAndButtonClassName}>
              <p
                style={{ width: showImage ? "100%" : subTitleWidth }}
                className={subTitleColor}
              >
                {bannerContent.subtitle}
              </p>

              {showButtons && (
                <BannerButtons
                  buttons={bannerContent.buttons}
                  sectionBackground={
                    bannerStyle.designSettings.sectionBackground.color
                  }
                />
              )}
            </div>
          </div>
          {showImage && (
            <>
              {bannerContent?.imageSetting?.imageUrl ? (
                <div
                  style={{
                    height: bannerStyle.designSettings.height,
                    backgroundImage: `url(${bannerContent.imageSetting.imageUrl})`,
                    backgroundSize:
                      bannerStyle.designSettings.imageSetting.objectFit,
                  }}
                  className={imageClassName}
                ></div>
              ) : (
                <div
                  style={{ height: bannerStyle.designSettings.height }}
                  className={imagePlaceholderClassNames}
                >
                  <ImagePlaceHolder
                    fillColor={bgMuted ? "fill-muted" : "fill-background"}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Design6;
