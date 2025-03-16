import React from "react";
import { cn } from "@/lib/utils";
import { ImagePlaceHolder } from "@/icons/common";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";

interface LogoProps {
  logoType: string;
  logoText?: string;
  logoImage: {
    urlLight: string;
    urlDark: string;
  };
  logoSize: {
    desktop: number;
    mobile: number;
  };
  className?: string;
  placeholderSize?: number;
  placeholderFillColor?: string;
}

const Logo: React.FC<LogoProps> = ({
  logoType,
  logoText,
  logoImage,
  logoSize,
  className,
  placeholderSize = 30,
  placeholderFillColor = "fill-muted",
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { theme } = useTheme();

  const imageLogoClassNames = cn(className, {
    hidden: logoType === "text",
  });

  if (!logoImage.urlDark && !logoImage.urlLight) {
    return (
      <div className="flex items-center justify-center">
        <ImagePlaceHolder
          fillColor={placeholderFillColor}
          height={placeholderSize}
          width={placeholderSize}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        height: isDesktop ? logoSize.desktop : logoSize.mobile,
        width: isDesktop ? logoSize.desktop : logoSize.mobile,
      }}
      className={imageLogoClassNames}
    >
      <div
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${
            theme === "dark"
              ? logoImage.urlDark || logoImage.urlLight
              : logoImage.urlLight || logoImage.urlDark
          })`,
        }}
      ></div>
    </div>
  );
};

export default Logo;
