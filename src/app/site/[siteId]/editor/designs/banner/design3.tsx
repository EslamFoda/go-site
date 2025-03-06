import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
interface Design3Props {
  section: any;
  pageId: string;
}
function Design3({ section, pageId }: Design3Props) {
  const dispatch = useAppDispatch();

  const titleSize = section.style.designSettings.titleSize;
  const align = section.style.designSettings.align;
  const showImage = section?.style.designSettings.imageSetting.showImage;
  const showButtons = section?.style.designSettings.showButtons;
  const subTitleWidth = section?.style.designSettings.subtitleWidth;
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";

  const sectionBgClassName = cn(" flex flex-col", {
    "bg-primary":
      section.style.designSettings.sectionBackground.color === "primary",
    "bg-muted": section.style.designSettings.sectionBackground.color === "gray",
    "bg-background":
      section.style.designSettings.sectionBackground.color === "none",
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

  const imageClassName = cn(" bg-cover bg-no-repeat bg-center w-full", {
    "bg-primary":
      section.style.designSettings.imageSetting.backgroundColor === "primary",
    "bg-muted":
      section.style.designSettings.imageSetting.backgroundColor === "gray",
    "bg-none":
      section.style.designSettings.imageSetting.backgroundColor === "none",
  });

  const titleClassName = cn({
    "text-7xl": titleSize === "xl",
    "text-6xl": titleSize === "l",
    "text-5xl": titleSize === "m",
    "text-4xl": titleSize === "s",
    "text-primary-foreground":
      section.style.designSettings.sectionBackground.color === "primary",
  });

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
  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center",
    bgMuted ? "bg-background" : "bg-muted"
  );
  const subTitleColor = cn("text-lg ", {
    "text-primary-foreground":
      section.style.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      section.style.designSettings.sectionBackground.color !== "primary",
  });

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
      }}
    >
      <div className="flex max-lg:flex-col container max-w-container gap-10 w-full py-12 text-center justify-center items-center">
        <div className={TitleAndSubtitleClassName}>
          <div>
            <h1 className={titleClassName}>{section.content.title}</h1>
          </div>
          <div className={subAndButtonClassName}>
            <p
              className={subTitleColor}
              style={{ width: showImage ? "100%" : subTitleWidth }}
            >
              {section.content.subtitle}
            </p>

            {showButtons && (
              <div className="flex justify-center gap-2">
                <Button
                  className={cn({
                    "border-primary-foreground border-solid border text-primary-foreground":
                      section.style.designSettings.sectionBackground.color ===
                      "primary",
                  })}
                >
                  {section.content.buttons.primaryButton.text}
                </Button>
                <Button
                  variant="outline"
                  className={cn({
                    "bg-background hover:bg-background":
                      section.style.designSettings.sectionBackground.color ===
                      "gray",
                    "bg-muted":
                      section.style.designSettings.sectionBackground.color ===
                      "none",
                  })}
                >
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
    </section>
  );
}

export default Design3;
