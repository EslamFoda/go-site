import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { openPagesTab } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { SectionBgColorType } from "@/types/common";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface ButtonConfig {
  text: string;
  link?: string;
  pageId?: string;
  variant?: "default" | "outline" | "ghost";
}

interface BannerButtonsProps {
  buttons: ButtonConfig[];
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

  const handleButtonClick = (btn: ButtonConfig) => {
    if (!btn.link || !btn.pageId) return;
    router.push(`/site/${siteId}/editor/${btn.pageId}`);
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
