import { cn } from "@/lib/utils";
import { HeaderLogo } from "@/types/sectionsTypes/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface LogoTextProps {
  logo: HeaderLogo;
  logoClassNames?: string;
}

export const LogoText: React.FC<LogoTextProps> = ({ logo, logoClassNames }) => {
  const { siteId } = useParams();

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

      // Open in new tab or same tab based on openNewTab prop
      if (logo.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  if (logo.logoType === "image") return null;

  // Render logic
  if (!logo.pageId && !logo.externalLink) {
    return (
      <h5 className={logoClassNames} onClick={handleLinkClick}>
        {logo.text}
      </h5>
    );
  }

  if (logo.linkType === "external") {
    return (
      <h5
        className={cn(logoClassNames, { "cursor-pointer": logo.externalLink })}
        onClick={handleLinkClick}
      >
        {logo.text}
      </h5>
    );
  }

  // Only use Link for internal links with a valid pageId
  if (logo.linkType === "internal" && logo.pageId) {
    return (
      <Link
        className={logoClassNames}
        href={`/site/${siteId}/editor/${logo.pageId}`}
      >
        <h5>{logo.text}</h5>
      </Link>
    );
  }

  // Fallback for any other cases
  return (
    <h5 className={logoClassNames} onClick={handleLinkClick}>
      {logo.text}
    </h5>
  );
};
