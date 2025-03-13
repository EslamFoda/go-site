import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch } from "@/reduxStore/hooks";
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
import { useMediaQuery } from "react-responsive";
import BackgroundImage from "@/components/shared/backgroundImage";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ section, pageId }: DesignProps) {
  const { AnimatePresence, motion } = useMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const dispatch = useAppDispatch();
  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";
  const accordionStyle = section?.style as AccordionStyle;
  const accordionContent = section?.content as AccordionContentType;
  const { spacing } = accordionStyle.designSettings;
  const titleAndSubtitleClassName = cn(
    accordionStyle.designSettings.align === "start" && "text-start",
    accordionStyle.designSettings.align === "center" && "text-center",
    accordionStyle.designSettings.align === "end" && "text-end"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      accordionStyle.designSettings.leftTitlePosition,
  });

  const sectionBgClassName = cn(" flex flex-col relative overflow-hidden", {
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
  const sectionTitleClassNames = cn("text-4xl", {
    "text-primary-foreground":
      section.style.designSettings.sectionBackground.color === "primary",
    "text-start": accordionStyle.designSettings.leftTitlePosition,
    "text-white":
      accordionStyle.designSettings.sectionBackground.textColor === "light" &&
      accordionStyle.designSettings.sectionBackground.media.imageUrl,
    "text-black":
      accordionStyle.designSettings.sectionBackground.textColor === "dark" &&
      accordionStyle.designSettings.sectionBackground.media.imageUrl,
  });
  const sectionSubTitleClassNames = cn({
    "text-primary-foreground":
      accordionStyle.designSettings.sectionBackground.color === "primary",
    "text-muted-foreground":
      accordionStyle.designSettings.sectionBackground.color !== "primary",
    "text-start": accordionStyle.designSettings.leftTitlePosition,
    "text-white":
      accordionStyle.designSettings.sectionBackground.textColor === "light" &&
      accordionStyle.designSettings.sectionBackground.media.imageUrl,
    "text-black":
      accordionStyle.designSettings.sectionBackground.textColor === "dark" &&
      accordionStyle.designSettings.sectionBackground.media.imageUrl,
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
      <BackgroundImage
        imageUrl={
          accordionStyle.designSettings.sectionBackground.media.imageUrl
        }
        parallax={accordionStyle.designSettings.sectionBackground.parallax}
        blur={accordionStyle.designSettings.sectionBackground.blur}
        blurEffect={accordionStyle.designSettings.sectionBackground.blurEffect}
        greyScale={accordionStyle.designSettings.sectionBackground.greyScale}
        overlay={accordionStyle.designSettings.sectionBackground.overlay}
        overlayEffect={
          accordionStyle.designSettings.sectionBackground.overlayEffect
        }
        backgroundColor={accordionStyle.designSettings.sectionBackground.color}
      />
      <div
        className="container max-w-container gap-10 z-0 w-full"
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div className={containerClassNames}>
          <div className={titleAndSubtitleClassName}>
            <h1 className={sectionTitleClassNames}>{section.content.title}</h1>
            <p className={sectionSubTitleClassNames}>
              {section.content.subtitle}
            </p>
          </div>
          <div className="md:col-span-2">
            <Accordion
              type="multiple"
              className="w-full flex flex-col"
              style={{
                gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
              }}
            >
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
                        className="text-2xl"
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
