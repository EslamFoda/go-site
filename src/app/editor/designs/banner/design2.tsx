import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";

import React from "react";
interface Design2Props {
  section: any;
  pageId: string;
}
function Design2({ section, pageId }: Design2Props) {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const dispatch = useAppDispatch();

  const leftTitlePosition = section.style.designSettings.leftTitlePosition;
  const titleSize = section.style.designSettings.titleSize;
  const align = section.style.designSettings.align;
  const showImage = section?.style.designSettings.imageSetting.showImage;
  const leftTitleWidth = section?.style.designSettings.leftTitleWidth;
  const showButtons = section?.style.designSettings.showButtons;
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";

  const sectionBgClassName = cn(
    " flex flex-col",
    section.style.designSettings.sectionBackground.color === "primary"
      ? "bg-primary"
      : "",
    section.style.designSettings.sectionBackground.color === "gray"
      ? "bg-muted"
      : "",
    section.style.designSettings.sectionBackground.color === "none"
      ? "bg-background"
      : "",
    section.style.designSettings.sectionBackground.height === "fill"
      ? "h-screen"
      : "",
    section.style.designSettings.sectionBackground.height === "fit"
      ? "h-auto"
      : "",
    section.style.designSettings.sectionBackground.align === "start"
      ? "justify-start"
      : "",
    section.style.designSettings.sectionBackground.align === "center"
      ? "justify-center"
      : "",
    section.style.designSettings.sectionBackground.align === "end"
      ? "justify-end"
      : ""
  );

  const imageClassName = cn(
    " bg-cover bg-no-repeat bg-center w-full",
    section.style.designSettings.imageSetting.backgroundColor === "primary"
      ? "bg-primary"
      : "",
    section.style.designSettings.imageSetting.backgroundColor === "gray"
      ? "bg-muted"
      : "",
    section.style.designSettings.imageSetting.backgroundColor === "none"
      ? "bg-none"
      : ""
  );

  const titleClassName = cn(
    dynamicTextColor && "text-textColor",
    titleSize === "xl" ? "text-7xl" : "",
    titleSize === "l" ? "text-6xl" : "",
    titleSize === "m" ? "text-5xl" : "",
    titleSize === "s" ? "text-4xl" : ""
  );

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
  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
      }}
    >
      <div className=" flex container max-w-container w-full gap-10 py-12 flex-col text-center justify-center items-center">
        {showImage && (
          <>
            {section.content.imageSetting.altText ? (
              <div
                style={{
                  height: section.style.designSettings.height,
                  backgroundImage: `url(${section.content.imageSetting.altText})`,
                  backgroundSize:
                    section.style.designSettings.imageSetting.objectFit,
                }}
                className={imageClassName}
              ></div>
            ) : (
              <div
                style={{ height: section.style.designSettings.height }}
                className={imagePlaceholderClassNames}
              >
                <ImagePlaceHolder
                  fillColor={bgMuted ? "fill-muted" : "fill-background"}
                />
              </div>
            )}
          </>
        )}
        <div className={TitleAndSubtitleClassName}>
          <div
            className="max-lg:!w-full"
            style={{
              width: leftTitlePosition ? `calc(${leftTitleWidth} - 50px)` : "",
            }}
          >
            <h1 className={titleClassName}>{section.content.title}</h1>
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
                  : section.style.designSettings.subtitleWidth,
              }}
              className="text-lg text-gray-400 max-lg:!w-full"
            >
              {section.content.subtitle}
            </p>

            {showButtons && (
              <div className="flex justify-center gap-2">
                <Button>{section.content.buttons.primaryButton.text}</Button>
                <Button variant="outline">
                  {section.content.buttons.secondaryButton.text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design2;
