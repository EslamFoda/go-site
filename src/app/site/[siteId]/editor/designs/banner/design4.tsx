import { ImagePlaceHolder, VideoPlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import React, { useRef, useState } from "react";
import BannerButtons from "./bannerButtons";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
interface Design4Props {
  section: any;
  pageId: string;
}
function Design4({ section, pageId }: Design4Props) {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const bannerContent = section?.content as BannerContent;
  const bannerStyle = section?.style as BannerStyle;

  // State for video player
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  const {
    showButtons,
    showForm,
    align,
    titleSize,
    imageSetting,
    sectionBackground,
    height,
    subtitleWidth,
    showVideo,
  } = bannerStyle.designSettings;
  const showImage = imageSetting.showImage;
  const bgMuted = bannerStyle.designSettings.sectionBackground.color === "gray";

  // Handle play button click
  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent section click
    setPlaying(true);
    setMuted(false);
    setShowPlayButton(false);
    setShowControls(true);
  };

  // Handle video end
  const handleVideoEnd = () => {
    setPlaying(false);
    setMuted(true);
    setShowPlayButton(true);
  };

  const sectionBgClassName = cn("flex flex-col", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "h-screen": sectionBackground.height === "fill",
    "h-auto": sectionBackground.height === "fit",
    "justify-start": sectionBackground.align === "start",
    "justify-center": sectionBackground.align === "center",
    "justify-end": sectionBackground.align === "end",
  });

  const titleClassName = cn({
    "text-7xl": titleSize === "xl",
    "text-6xl": titleSize === "l",
    "text-5xl": titleSize === "m",
    "text-4xl": titleSize === "s",
    "text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
  });

  const TitleAndSubtitleClassName = cn("w-full flex space-y-3 flex-col", {
    "items-start text-start": align === "start",
    "items-center text-center": align === "center",
    "items-end text-end": align === "end",
  });

  const subAndButtonClassName = cn("w-full flex space-y-3 flex-col", {
    "items-start": align === "start",
    "items-center": align === "center",
    "items-end": align === "end",
  });

  const subTitleColor = cn("text-lg ", {
    "text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      bannerStyle.designSettings.sectionBackground.color !== "primary",
  });

  const formBtnClassName = cn("whitespace-normal", {
    "border-primary-foreground border-solid border text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
  });

  const getImageClassName = cn(
    "bg-cover bg-no-repeat bg-center rounded-md w-full",
    {
      "bg-primary": imageSetting.backgroundColor === "primary",
      "bg-muted": imageSetting.backgroundColor === "gray",
      "bg-none": imageSetting.backgroundColor === "none",
    }
  );

  const placeholderClassName = cn(
    "w-full flex justify-center items-center rounded-md",
    bgMuted ? "bg-background" : "bg-muted"
  );

  const playBtnClassName = cn(
    "absolute w-16 h-16 rounded-md bg-background flex items-center justify-center focus:outline-none transition-transform hover:scale-110",
    {
      "bottom-4 left-4": align === "start",
      "bottom-4 right-4": align === "end",
      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2": align === "center",
    }
  );

  const renderFormFields = () => {
    if (!showForm) return null;

    return (
      <div className="space-y-3 w-full">
        {bannerContent?.form.fields.map((field) => {
          if (!field.active) return null;

          if (field.type === "textarea") {
            return (
              <div key={field.id} className="w-full">
                <Textarea
                  id={field.id}
                  className={cn(
                    "w-full !h-52 !max-h-52 !min-h-52 resize-none",
                    bgMuted ? "bg-background" : "bg-muted"
                  )}
                  placeholder={field.value || field.placeholder}
                />
              </div>
            );
          }
          return (
            <div key={field.id} className="w-full">
              <Input
                className={cn(
                  "w-full h-12",
                  bgMuted ? "bg-background" : "bg-muted"
                )}
                placeholder={field.value || field.placeholder}
                type={field.type}
              />
            </div>
          );
        })}
        {bannerContent?.form.button.text && (
          <Button className={formBtnClassName}>
            {bannerContent?.form.button.text}
          </Button>
        )}
      </div>
    );
  };

  const renderImage = () => {
    if (!showImage) return null;

    if (bannerContent?.imageSetting?.imageUrl) {
      return (
        <div
          style={{
            height: isDesktop
              ? bannerStyle.designSettings.height.desktop
              : bannerStyle.designSettings.height.mobile,
            backgroundImage: `url(${bannerContent?.imageSetting.imageUrl})`,
            backgroundSize: imageSetting.objectFit,
          }}
          className={getImageClassName}
        />
      );
    }

    return (
      <div
        style={{
          height: isDesktop
            ? bannerStyle.designSettings.height.desktop
            : bannerStyle.designSettings.height.mobile,
        }}
        className={placeholderClassName}
      >
        <ImagePlaceHolder
          fillColor={bgMuted ? "fill-muted" : "fill-background"}
        />
      </div>
    );
  };

  // Updated video renderer using ReactPlayer with custom play button
  const renderVideo = () => {
    if (!showVideo) return null;

    if (bannerContent?.videoSetting?.videoUrl) {
      return (
        <div
          className="relative rounded-md overflow-hidden w-full"
          style={{ maxWidth: "100%" }}
        >
          {/* Aspect ratio box (16:9) */}
          <div
            className={cn("relative", {
              "pointer-events-auto": showControls,
              "pointer-events-none": showPlayButton,
            })}
            style={{ paddingTop: "56.25%" }}
          >
            <ReactPlayer
              key={showControls ? "controls-on" : "controls-off"}
              ref={playerRef}
              url={bannerContent?.videoSetting.videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              muted={muted}
              loop={false}
              controls={showControls}
              onEnded={handleVideoEnd}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          {/* Play Button */}
          {showPlayButton && (
            <button
              className={playBtnClassName}
              onClick={handlePlayButtonClick}
              aria-label="Play video"
            >
              <svg
                className="w-6 h-6 text-primary fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        style={{
          height: isDesktop
            ? bannerStyle.designSettings.height.desktop
            : bannerStyle.designSettings.height.mobile,
        }}
        className={placeholderClassName}
      >
        <VideoPlaceHolder
          fillColor={bgMuted ? "fill-muted" : "fill-background"}
        />
      </div>
    );
  };

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
      }}
    >
      <div className="flex max-lg:flex-col container max-w-container gap-10 w-full py-12 text-center justify-center items-center">
        {renderImage()}
        {renderVideo()}
        <div className={TitleAndSubtitleClassName}>
          <div>
            <h1 className={titleClassName}>{bannerContent?.title}</h1>
          </div>
          <div
            className={subAndButtonClassName}
            style={{ width: showImage || showVideo ? "100%" : subtitleWidth }}
          >
            <p className={subTitleColor}>{bannerContent?.subtitle}</p>

            {showButtons && (
              <BannerButtons
                buttons={bannerContent.buttons}
                sectionBackground={
                  bannerStyle.designSettings.sectionBackground.color
                }
              />
            )}
            {renderFormFields()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design4;
