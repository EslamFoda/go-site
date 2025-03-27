import React from "react";
import { cn } from "@/lib/utils";
import useScrollParallax from "@/hooks/useScrollParallax";

interface BackgroundImageProps {
  imageUrl?: string;
  parallax?: boolean;
  blur?: boolean;
  blurEffect?: "s" | "m" | "l";
  greyScale?: boolean;
  overlay?: boolean;
  overlayEffect?: "s" | "m" | "l";
  backgroundColor?: "primary" | "gray" | "none";
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  parallax = false,
  blur = false,
  blurEffect = "s",
  greyScale = false,
  overlay = false,
  overlayEffect = "s",
  backgroundColor = "none",
}) => {
  const { Parallax } = useScrollParallax();
  if (!imageUrl) return null;

  return (
    <Parallax
      speed={parallax ? -25 : 0}
      className={cn("absolute inset-0", parallax && "min-h-screen")}
      style={{
        ...(parallax && {
          top: "-20px",
          left: "-20px",
          right: "-20px",
          bottom: "-20px",
        }),
      }}
    >
      <div
        className={cn("absolute inset-0", parallax && "min-h-screen")}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          ...(blur && { transform: "scale(1.1)" }),
          ...(parallax && { transform: "scale(1.2)" }),
          filter: `
            ${
              blur
                ? blurEffect === "s"
                  ? "blur(2px)"
                  : blurEffect === "m"
                  ? "blur(5px)"
                  : "blur(8px)"
                : ""
            }
            ${greyScale ? "grayscale(100%)" : ""}
          `,
        }}
      />
      {overlay && (
        <div
          className={cn(
            "absolute inset-0",
            backgroundColor === "primary" &&
              cn(
                overlayEffect === "s" && "bg-primary/30",
                overlayEffect === "m" && "bg-primary/50",
                overlayEffect === "l" && "bg-primary/70"
              ),
            backgroundColor === "gray" &&
              cn(
                overlayEffect === "s" && "bg-muted/30",
                overlayEffect === "m" && "bg-muted/50",
                overlayEffect === "l" && "bg-muted/70"
              )
          )}
        />
      )}
    </Parallax>
  );
};

export default BackgroundImage;
