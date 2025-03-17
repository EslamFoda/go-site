import React from "react";
import { cn } from "@/lib/utils";
import { ImagePlaceHolder } from "@/icons/common";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeaderLogo } from "@/types/sectionsTypes/header";

interface LogoProps {
  logoType: string;
  logoSize: {
    desktop: number;
    mobile: number;
  };
  className?: string;
  placeholderSize?: number;
  placeholderFillColor?: string;
  logo: HeaderLogo;
}

const Logo: React.FC<LogoProps> = ({
  logoType,
  logoSize,
  className,
  placeholderSize = 30,
  placeholderFillColor = "fill-muted",
  logo,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { theme } = useTheme();
  const { siteId } = useParams();

  const imageLogoClassNames = cn(className, {
    "cursor-pointer": logo.externalLink,
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (logo.linkType === "internal" && logo.pageId) {
      // For internal links, let Next.js handle navigation through the Link component
      return;
    }

    if (logo.linkType === "external" && logo.externalLink) {
      let finalLink = logo.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on logo. prop
      if (logo.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  if (logoType === "text") return;

  // Create the logo content
  const logoContent = () => {
    if (!logo.logoImage.urlDark && !logo.logoImage.urlLight) {
      return (
        <div
          className={cn("flex items-center justify-center", {
            "cursor-pointer": logo.externalLink,
          })}
        >
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
                ? logo.logoImage.urlDark || logo.logoImage.urlLight
                : logo.logoImage.urlLight || logo.logoImage.urlDark
            })`,
          }}
        ></div>
      </div>
    );
  };

  // Render logic with link handling
  if (!logo.pageId && !logo.externalLink) {
    return logoContent();
  }

  if (logo.linkType === "external") {
    return (
      <div className={imageLogoClassNames} onClick={handleLinkClick}>
        {logoContent()}
      </div>
    );
  }

  // Only use Link for internal links with a valid logo.pageId
  if (logo.linkType === "internal" && logo.pageId) {
    return (
      <Link href={`/site/${siteId}/editor/${logo.pageId}`}>
        {logoContent()}
      </Link>
    );
  }

  // Fallback for any other cases
  return logoContent();
};

export default Logo;
