import { cn } from "@/lib/utils";
import { Announcement as AnnouncementTypes } from "@/types/sectionsTypes/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface AnnouncementProps {
  announcement: AnnouncementTypes;
  headerFloat: boolean;
  glassEffect: boolean;
  headerWidth: "fill" | "fit";
}

function Announcement({
  announcement,
  headerFloat,
  glassEffect,
  headerWidth,
}: AnnouncementProps) {
  const { siteId } = useParams();

  const outerAnnouncementClassNames = cn("w-full bg-background", {
    "rounded-t-md": announcement.position === "above" && headerFloat,
    "rounded-b-md": announcement.position === "below" && headerFloat,
    "bg-transparent backdrop-blur-lg": glassEffect,
    "bg-background/50 backdrop-blur-lg": headerWidth === "fit" && glassEffect,
  });

  const innerAnnouncementClassNames = cn(
    "w-full flex items-center justify-center bg-primary/15 p-1",
    {
      "rounded-t-md": announcement.position === "above" && headerFloat,
      "rounded-b-md": announcement.position === "below" && headerFloat,
      "cursor-pointer":
        announcement.linkType === "external" && announcement.externalLink,
      " bg-primary/15 backdrop-blur-lg": glassEffect,
    }
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!announcement.linkType) return;

    if (announcement.linkType === "internal" && announcement.pageId) {
      // For internal links, let Next.js handle navigation through the Link component
      return;
    }

    if (announcement.linkType === "external" && announcement.externalLink) {
      let finalLink = announcement.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on openNewTab prop
      if (announcement.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  // Case 1: No link
  if (!announcement.pageId && !announcement.externalLink) {
    return (
      <div className={outerAnnouncementClassNames}>
        <div className={innerAnnouncementClassNames}>
          <span className="text-sm">{announcement.text}</span>
        </div>
      </div>
    );
  }

  // Case 2: External link
  if (announcement.linkType === "external" && announcement.externalLink) {
    return (
      <div className={outerAnnouncementClassNames}>
        <div className={innerAnnouncementClassNames} onClick={handleLinkClick}>
          <span className="text-sm">{announcement.text}</span>
        </div>
      </div>
    );
  }

  // Case 3: Internal link
  if (announcement.linkType === "internal" && announcement.pageId) {
    return (
      <div className={outerAnnouncementClassNames}>
        <Link href={`/site/${siteId}/editor/${announcement.pageId}`}>
          <div className={innerAnnouncementClassNames}>
            <span className="text-sm">{announcement.text}</span>
          </div>
        </Link>
      </div>
    );
  }

  // Fallback
  return (
    <div className={outerAnnouncementClassNames}>
      <div className={innerAnnouncementClassNames}>
        <span className="text-sm">{announcement.text}</span>
      </div>
    </div>
  );
}

export default Announcement;
