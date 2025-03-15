import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openPagesTab } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { ButtonTypes, SectionBgColorType } from "@/types/common";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface BannerButtonsProps {
  buttons: ButtonTypes[];
  btnClassNames?: string;
  reverse?: boolean;
  sectionBackground?: SectionBgColorType;
}

function BannerButtons({
  buttons,
  btnClassNames,
  reverse = false,
  sectionBackground = "none",
}: BannerButtonsProps) {
  const { siteId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleButtonClick = (button: ButtonTypes) => {
    if (button.linkType === "internal" && button.pageId) {
      // Use router.push for internal Next.js navigation
      router.push(`/site/${siteId}/editor/${button.pageId}`);
      return;
    }

    if (button.linkType === "external" && button.externalLink) {
      let finalLink = button.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on openNewTab prop
      if (button.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };
  const renderButtons = buttons.map((btn, index) => {
    // Skip rendering buttons without text
    if (!btn.text) return null;

    // Apply styling logic similar to Design2
    const buttonClassName = cn("whitespace-normal", {
      // For primary button (first button)
      "border-primary-foreground border-solid border text-primary-foreground":
        index === 0 && sectionBackground === "primary",
    });

    // For secondary/outline button (second button)
    const outlineButtonClassName = cn("whitespace-normal", {
      "bg-background hover:bg-background":
        index === 1 && sectionBackground === "gray",
      "bg-muted": index === 1 && sectionBackground === "none",
    });

    return (
      <Button
        key={index}
        variant={index === 0 ? "default" : "outline"}
        className={index === 0 ? buttonClassName : outlineButtonClassName}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(openPagesTab());
          handleButtonClick(btn);
        }}
      >
        {btn.text}
      </Button>
    );
  });

  // Filter out null values (buttons with no text)
  const filteredButtons = renderButtons.filter(Boolean);

  return (
    <div
      className={cn("flex items-center justify-center gap-2", btnClassNames)}
    >
      {reverse ? filteredButtons.reverse() : filteredButtons}
    </div>
  );
}
export default BannerButtons;
