import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface ButtonConfig {
  text: string;
  link?: string;
  pageId?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
}

interface FooterButtonsProps {
  buttons: ButtonConfig[];
  btnClassNames?: string;
  reverse?: boolean;
}

function FooterButtons({
  buttons,
  btnClassNames,
  reverse = false,
}: FooterButtonsProps) {
  const { siteId } = useParams();
  const router = useRouter();
  const variants = ["default", "secondary"] as any;

  const renderButtons = buttons.map((btn, index) => (
    <Button
      key={index}
      variant={variants[index]}
      onClick={() => {
        if (!btn.link || !btn.pageId) return;
        router.push(`/site/${siteId}/editor/${btn.pageId}`);
      }}
    >
      {btn.text}
    </Button>
  ));

  return (
    <div className={cn("flex items-center gap-2", btnClassNames)}>
      {reverse ? renderButtons.reverse() : renderButtons}
    </div>
  );
}

export default FooterButtons;
