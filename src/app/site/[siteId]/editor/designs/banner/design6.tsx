import { ImagePlaceHolder, VideoPlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React, { useRef, useState } from "react";
import BannerButtons from "./bannerButtons";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import ReactPlayer from "react-player";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import BackgroundImage from "@/components/shared/backgroundImage";
interface Design6Props {
  section: any;
  pageId: string;
}
function Design6({ section, pageId }: Design6Props) {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const bannerContent = section?.content as BannerContent;
  const bannerStyle = section?.style as BannerStyle;
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
    spacing,
  } = bannerStyle.designSettings;
  const showImage = imageSetting.showImage;
  const bgMuted = bannerStyle.designSettings.sectionBackground.color === "gray";

  // State for video player
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

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

  const sectionBgClassName = cn("flex flex-col relative overflow-hidden", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "min-h-screen": sectionBackground.height === "fill",
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
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const TitleAndSubtitleClassName = cn(
    "w-full flex space-y-3 flex-col text-start"
  );

  const subAndButtonClassName = cn(
    "w-full flex space-y-3 flex-col items-start"
  );

  const subTitleColor = cn("text-lg", {
    "text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      bannerStyle.designSettings.sectionBackground.color !== "primary",
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
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

  const formBtnClassName = cn("whitespace-normal", {
    "border-primary-foreground border-solid border text-primary-foreground":
      bannerStyle.designSettings.sectionBackground.color === "primary",
  });

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
      <BackgroundImage
        imageUrl={bannerStyle.designSettings.sectionBackground.media.imageUrl}
        parallax={bannerStyle.designSettings.sectionBackground.parallax}
        blur={bannerStyle.designSettings.sectionBackground.blur}
        blurEffect={bannerStyle.designSettings.sectionBackground.blurEffect}
        greyScale={bannerStyle.designSettings.sectionBackground.greyScale}
        overlay={bannerStyle.designSettings.sectionBackground.overlay}
        overlayEffect={
          bannerStyle.designSettings.sectionBackground.overlayEffect
        }
        backgroundColor={bannerStyle.designSettings.sectionBackground.color}
      />
      <div
        className="container max-w-container z-0 space-y-3"
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div>
          <h1 className={titleClassName}>{bannerContent?.title}</h1>
        </div>
        <div
          className="flex max-lg:flex-col w-full text-center justify-center"
          style={{ gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile }}
        >
          <div className={TitleAndSubtitleClassName}>
            <div className={subAndButtonClassName}>
              <p
                style={{
                  width: showImage || showVideo ? "100%" : subtitleWidth,
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
              {renderFormFields()}
            </div>
          </div>
          {renderImage()}
          {renderVideo()}
        </div>
      </div>
    </section>
  );
}

export default Design6;
