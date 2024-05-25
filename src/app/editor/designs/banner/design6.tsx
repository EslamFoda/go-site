import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import useEditor from "@/store/editorStore";
import React from "react";
interface Design6Props {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
}
function Design6({ section, handleSelectedSection }: Design6Props) {
  const { selectedPallet } = useEditor();
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const titleSize = section.style.designSettings.titleSize;
  const showImage = section?.style.designSettings.imageSetting.showImage;
  const showButtons = section?.style.designSettings.showButtons;
  const subTitleWidth = section?.style.designSettings.subtitleWidth;
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const sectionBgClassName = cn(
    " flex flex-col",
    section.style.designSettings.sectionBackground.color === "primary"
      ? "bg-primary"
      : "",
    section.style.designSettings.sectionBackground.color === "gray"
      ? "bg-muted"
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
    "w-full flex space-y-7 flex-col text-start"
  );

  const subAndButtonClassName = cn(
    "w-full flex space-y-7 flex-col items-start"
  );
  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center",
    bgMuted ? "bg-background" : "bg-muted"
  );
  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        handleSelectedSection(section.id);
      }}
    >
      <div className="container py-12">
        <div className="mb-8">
          <h1 className={titleClassName}>{section.content.title}</h1>
        </div>
        <div className="flex max-lg:flex-col  gap-10 w-full  text-center justify-center">
          <div className={TitleAndSubtitleClassName}>
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
        </div>
      </div>
    </section>
  );
}

export default Design6;
