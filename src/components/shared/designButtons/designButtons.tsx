// components/DesignButtons.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface ButtonConfig {
  text: string;
  link?: string;
  pageId?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  linkType?: "internal" | "external";
  externalLink?: string;
  openNewTab?: boolean;
  id: string;
}

interface DesignButtonsProps {
  buttons: ButtonConfig[];
  btnClassNames?: string;
  reverse?: boolean;
}

function DesignButtons({
  buttons,
  btnClassNames,
  reverse = false,
}: DesignButtonsProps) {
  const { siteId } = useParams();
  const router = useRouter();
  const variants = ["default", "secondary", "outline", "ghost"] as const;

  const handleButtonClick = (button: ButtonConfig) => {
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

    // Determine the variant (cycle through variants if not specified)
    const buttonVariant = btn.variant || variants[index % variants.length];

    return (
      <Button
        key={btn.id}
        variant={buttonVariant}
        onClick={() => handleButtonClick(btn)}
      >
        {btn.text}
      </Button>
    );
  });

  // Filter out null values (buttons with no text)
  const filteredButtons = renderButtons.filter(Boolean);

  return (
    <div className={cn("flex items-center gap-2", btnClassNames)}>
      {reverse ? filteredButtons.reverse() : filteredButtons}
    </div>
  );
}

export default DesignButtons;