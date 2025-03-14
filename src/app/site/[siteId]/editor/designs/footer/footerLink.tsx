// components/FooterLink.tsx
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils"; // Adjust the import path based on where cn is defined in your project

interface FooterLinkProps {
  subLink: {
    id: string;
    text: string;
    link?: string;
    externalLink?: string;
    linkType: string;
    openNewTab?: boolean;
    pageId?: string;
  };
  isAccordion?: boolean; // Optional prop to distinguish accordion usage
  className?: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  subLink,
  isAccordion = false,
  className,
}) => {
  const { siteId } = useParams();

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent accordion from toggling if in accordion context
    if (isAccordion) {
      e.stopPropagation();
    }

    if (subLink.linkType === "internal" && subLink.link) {
      // For internal links, let Next.js handle navigation through the Link component
      return;
    }

    if (subLink.linkType === "external" && subLink.externalLink) {
      let finalLink = subLink.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on newTab prop
      if (subLink.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  // Base classes for all cases
  const baseClasses = "cursor-pointer min-w-max";

  // Conditional classes for accordion vs normal link
  const conditionalClasses = cn({
    "flex items-center h-12 w-full hover:bg-muted/50 px-3": isAccordion,
    "": !isAccordion, // No extra classes for non-accordion case by default
  });

  const combinedClasses = cn(baseClasses, conditionalClasses, className);

  // Render logic
  if (!subLink.link && !subLink.externalLink) {
    return (
      <div className={combinedClasses} onClick={handleLinkClick}>
        <span>{subLink.text}</span>
      </div>
    );
  }

  if (subLink.linkType === "external") {
    return (
      <div className={combinedClasses} onClick={handleLinkClick}>
        <span>{subLink.text}</span>
      </div>
    );
  }

  return (
    <Link href={`/site/${siteId}/editor/${subLink.pageId}`}>
      <div className={combinedClasses}>
        <span>{subLink.text}</span>
      </div>
    </Link>
  );
};
