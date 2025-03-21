import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SectionBgColorType } from "@/types/common";
import React from "react";
interface DesignLabelProps {
  text: string;
  sectionBackground: SectionBgColorType;
}
function DesignLabel({ text, sectionBackground }: DesignLabelProps) {
  const badgeClassNames = cn("text-foreground rounded-md", {
    hidden: !text,
    "bg-background hover:bg-background":
      sectionBackground === "gray" || sectionBackground === "primary",
    "bg-muted  hover:bg-muted": sectionBackground === "none",
  });

  if (!text) return;
  return <Badge className={badgeClassNames}>{text}</Badge>;
}

export default DesignLabel;
