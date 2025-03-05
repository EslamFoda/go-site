import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  Accordion as AccordionType,
  AccordionContent as AccordionContentType,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion/accordion";
import { useMotion } from "@/hooks/useMotion";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { AnimatePresence, motion } = useMotion();
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector(
    (state) => state.editor.present.selectedPallet
  );
  const { theme } = useTheme();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const dynamicTextColor =
    selectedPallet === "default-theme" &&
    section.style.designSettings.sectionBackground.color === "primary";
  const accordionStyle = section?.style as AccordionStyle;
  const accordionContent = section?.content as AccordionContentType;

  const titleAndSubtitleClassName = cn(
    dynamicTextColor && "text-textColor",
    theme === "light" &&
      selectedPallet === "default-theme" &&
      section.style.designSettings.sectionBackground.color === "primary" &&
      "text-white",
    accordionStyle.designSettings.align === "start" && "text-start",
    accordionStyle.designSettings.align === "center" && "text-center",
    accordionStyle.designSettings.align === "end" && "text-end"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      accordionStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col", {
    "bg-primary":
      section.style.designSettings.sectionBackground.color === "primary",
    "bg-muted": section.style.designSettings.sectionBackground.color === "gray",
    "bg-background":
      section.style.designSettings.sectionBackground.color === "none",
    "h-screen":
      section.style.designSettings.sectionBackground.height === "fill",
    "h-auto": section.style.designSettings.sectionBackground.height === "fit",
    "justify-start":
      section.style.designSettings.sectionBackground.align === "start",
    "justify-center":
      section.style.designSettings.sectionBackground.align === "center",
    "justify-end":
      section.style.designSettings.sectionBackground.align === "end",
  });

  const accordionItemClassNames = cn("p-5 py-2 rounded-md", {
    "bg-muted": accordionStyle.designSettings.background,
    "outline outline-[1px] outline-muted": accordionStyle.designSettings.border,
    "bg-background": bgMuted,
  });

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        dispatch(closeChooseIcon());
      }}
    >
      <div className="container max-w-container gap-10 w-full py-12">
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{section.content.title}</h1>
            <p>{section.content.subtitle}</p>
          </div>
          <div className="md:col-span-2">
            <Accordion type="multiple" className="w-full space-y-3">
              <AnimatePresence>
                {accordionContent.accordions.map((accordion: AccordionType) => (
                  <motion.div
                    layout
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "tween" }}
                    key={accordion.id}
                  >
                    <AccordionItem
                      className={accordionItemClassNames}
                      key={accordion.id}
                      value={accordion.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(accordion));
                        dispatch(closePagesTab());
                      }}
                    >
                      <AccordionTrigger
                        iconType={accordionStyle.designSettings.icon}
                      >
                        {accordion.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {accordion.text}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
