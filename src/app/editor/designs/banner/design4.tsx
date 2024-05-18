import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import React from "react";
interface Design4Props {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
}
function Design4({ section, handleSelectedSection }: Design4Props) {
  const titleSize = section.style.designSettings.titleSize;
  const align = section.style.designSettings.align;
  const showImage = section?.style.designSettings.imageSetting.showImage;
  const showButtons = section?.style.designSettings.showButtons;
  const subTitleWidth = section?.style.designSettings.subtitleWidth;

  const sectionBgClassName = cn(
    " flex flex-col",
    section.style.designSettings.sectionBackground.color === "primary"
      ? "bg-primary"
      : "",
    section.style.designSettings.sectionBackground.color === "gray"
      ? "bg-gray-500"
      : "",
    section.style.designSettings.sectionBackground.color === "none"
      ? "bg-none"
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
      ? "bg-gray-500"
      : "",
    section.style.designSettings.imageSetting.backgroundColor === "none"
      ? "bg-none"
      : ""
  );

  const titleClassName = cn(
    titleSize === "xl" ? "text-7xl" : "",
    titleSize === "l" ? "text-6xl" : "",
    titleSize === "m" ? "text-5xl" : "",
    titleSize === "s" ? "text-4xl" : ""
  );

  const TitleAndSubtitleClassName = cn(
    "w-full flex space-y-7 flex-col",
    align === "start" ? "items-start text-start" : "",
    align === "center" ? "items-center text-center" : "",
    align === "end" ? "items-end text-end" : ""
  );

  const subAndButtonClassName = cn(
    "w-full flex space-y-7 flex-col",
    align === "start" ? "items-start" : "",
    align === "center" ? "items-center " : "",
    align === "end" ? "items-end" : ""
  );

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        handleSelectedSection(section.id);
      }}
    >
      <div className="flex max-lg:flex-col container gap-10 w-full py-12 text-center justify-center items-center">
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
                className="bg-[#222]  w-full flex justify-center items-center"
              >
                <ImagePlaceHolder />
              </div>
            )}
          </>
        )}
        <div className={TitleAndSubtitleClassName}>
          <div>
            <h1 className={titleClassName}>{section.content.title}</h1>
          </div>
          <div className={subAndButtonClassName}>
            <p
              style={{ width: showImage ? "100%" : subTitleWidth }}
              className="text-lg text-gray-400"
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

export default Design4;
