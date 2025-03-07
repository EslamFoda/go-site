import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import BannerButtons from "./bannerButtons";
interface Design1Props {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: Design1Props) {
  const dispatch = useAppDispatch();
  const bannerContent = section?.content as BannerContent;
  const bannerStyle = section?.style as BannerStyle;

  const leftTitlePosition = bannerStyle.designSettings.leftTitlePosition;
  const titleSize = bannerStyle.designSettings.titleSize;
  const align = bannerStyle.designSettings.align;
  const showImage = bannerStyle.designSettings.imageSetting.showImage;
  const leftTitleWidth = bannerStyle.designSettings.leftTitleWidth;
  const showButtons = bannerStyle.designSettings.showButtons;
  const bgMuted =
    bannerStyle.designSettings.sectionBackground.color === "gray";

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
    "w-full flex space-y-7",
    align === "start" ? "items-start text-start" : "",
    align === "center" ? "items-center text-center" : "",
    align === "end" ? "items-end text-end" : "",
    leftTitlePosition
      ? "flex-row text-start items-start gap-4 lg:flex md:block  block"
      : "flex-col"
  );

  const subAndButtonClassName = cn(
    "flex space-y-7 flex-col  max-lg:!w-full ",
    align === "start" ? "items-start" : "",
    align === "center" ? "items-center " : "",
    align === "end" ? "items-end" : "",
    leftTitlePosition ? " text-start items-start" : ""
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center",
    bgMuted ? "bg-background" : "bg-muted"
  );

  const subTitleColor = cn("text-lg  max-lg:!w-full", {
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
      <div className=" flex container max-w-container gap-10 w-full py-12 flex-col text-center justify-center items-center">
        <div className={`${TitleAndSubtitleClassName}`}>
          <div
            className="max-lg:!w-full"
            style={{
              width: leftTitlePosition ? `calc(${leftTitleWidth} - 50px)` : "",
            }}
          >
            <h1 className={titleClassName}>{bannerContent?.title}</h1>
          </div>
          <div
            style={{
              width: leftTitlePosition
                ? `${100 - parseInt(leftTitleWidth)}%`
                : "",
            }}
            className={subAndButtonClassName}
          >
            <p
              style={{
                width: leftTitlePosition
                  ? ""
                  : bannerStyle.designSettings.subtitleWidth,
              }}
              className={subTitleColor}
            >
              {bannerContent?.subtitle}
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
                  backgroundImage: `url(${bannerContent?.imageSetting.imageUrl})`,
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
    </section>
  );
}

export default Design1;
