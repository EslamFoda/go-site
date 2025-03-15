import { Link as LinkType, SubLink } from "@/types/sectionsTypes/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface HeaderLinkProps {
  link: LinkType | SubLink;
  className?: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ link, className }) => {
  const { siteId } = useParams();

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (link.linkType === "internal" && link.pageId) {
      // For internal links, let Next.js handle navigation through the Link component
      return;
    }

    if (link.linkType === "external" && link.externalLink) {
      let finalLink = link.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on openNewTab prop
      if (link.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  // Render logic
  if (!link.pageId && !link.externalLink) {
    return (
      <div onClick={handleLinkClick}>
        <span>{link.text}</span>
      </div>
    );
  }

  if (link.linkType === "external") {
    return (
      <div onClick={handleLinkClick}>
        <span>{link.text}</span>
      </div>
    );
  }

  return (
    <Link href={`/site/${siteId}/editor/${link.pageId}`}>
      <div>
        <span>{link.text}</span>
      </div>
    </Link>
  );
};
