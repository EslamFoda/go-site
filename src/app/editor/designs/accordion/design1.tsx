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
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import {
  Accordion as AccordionType,
  AccordionContent as AccordionContentType,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion";

interface DesignProps {
  section: any;
}
function Design1({ section }: DesignProps) {
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
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

  const alignClassNames = cn("container gap-10 w-full py-12");

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      accordionStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col", {
    "bg-primary":
      section.style.designSettings.sectionBackground.color === "primary",
    "bg-muted": section.style.designSettings.sectionBackground.color === "gray",
    "bg-none": section.style.designSettings.sectionBackground.color === "none",
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
    <section className={sectionBgClassName}>
      <div
        className={alignClassNames}
        onClick={() => {
          dispatch(updateSelectedSection(section.id));
          dispatch(updateSelectedItem(null));
          dispatch(closeChooseIcon());
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className="text-4xl">{section.content.title}</h1>
            <p>{section.content.subtitle}</p>
          </div>
          <div className="md:col-span-2">
            <Accordion type="multiple" className="w-full space-y-3">
              {accordionContent.accordions.map((accordion: AccordionType) => (
                <AccordionItem
                  className={accordionItemClassNames}
                  key={accordion.id}
                  value={accordion.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(updateSelectedSection(section.id));
                    dispatch(updateSelectedItem(accordion));
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
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
