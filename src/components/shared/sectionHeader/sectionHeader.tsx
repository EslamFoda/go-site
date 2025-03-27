// components/shared/SectionHeader.tsx
import React from "react";
import { cn } from "@/lib/utils";
import DesignLabel from "@/components/shared/label";
import { TestimonialContent } from "@/types/sectionsTypes/testimonials";
import { AlignType, SectionBackground } from "@/types/common";
import { AccordionContent } from "@/types/sectionsTypes/accordion/accordion";
import { CardsContent } from "@/types/sectionsTypes/cards";
import { ListContent } from "@/types/sectionsTypes/list";
import { LogosContent } from "@/types/sectionsTypes/logos";
import { GalleryContent } from "@/types/sectionsTypes/gallery";

interface SectionHeaderProps {
  content:
    | TestimonialContent
    | AccordionContent
    | CardsContent
    | ListContent
    | LogosContent
    | GalleryContent;
  sectionBackground: SectionBackground;
  align?: AlignType;
  leftTitlePosition?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  content,
  sectionBackground,
  align = "center",
  leftTitlePosition = false,
  titleClassName,
  subtitleClassName,
  containerClassName,
}) => {
  const titleAndSubtitleClassName = cn(
    "space-y-1",
    {
      "text-start": align === "start" || leftTitlePosition,
      "text-center": align === "center" && !leftTitlePosition,
      "text-end": align === "end" && !leftTitlePosition,
    },
    containerClassName
  );

  const sectionTitleClassNames = cn(
    "text-4xl",
    {
      hidden: !content.title,
      "text-primary-foreground": sectionBackground.color === "primary",
      "text-start": leftTitlePosition,
      "text-white":
        sectionBackground.textColor === "light" &&
        sectionBackground.media.imageUrl,
      "text-black":
        sectionBackground.textColor === "dark" &&
        sectionBackground.media.imageUrl,
    },
    titleClassName
  );

  const sectionSubTitleClassNames = cn(
    {
      hidden: !content.subtitle,
      "text-primary-foreground": sectionBackground.color === "primary",
      "text-muted-foreground": sectionBackground.color !== "primary",
      "text-start": leftTitlePosition,
      "text-white":
        sectionBackground.textColor === "light" &&
        sectionBackground.media.imageUrl,
      "text-black":
        sectionBackground.textColor === "dark" &&
        sectionBackground.media.imageUrl,
    },
    subtitleClassName
  );

  if (!content.title && !content.subtitle && !content.label) {
    return null;
  }

  return (
    <div className={titleAndSubtitleClassName}>
      {content.label && (
        <DesignLabel
          text={content.label}
          sectionBackground={sectionBackground.color}
        />
      )}
      {content.title && (
        <h1
          className={sectionTitleClassNames}
          style={{ whiteSpace: "pre-line" }}
        >
          {content.title}
        </h1>
      )}
      {content.subtitle && (
        <p
          className={sectionSubTitleClassNames}
          style={{ whiteSpace: "pre-line" }}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
