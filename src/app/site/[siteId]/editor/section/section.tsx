"use client";
import React, { useState } from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import Accordion from "../designs/accordion";
import Testimonials from "../designs/testimonials";
import Gallery from "../designs/gallery";
import Header from "../designs/header";
import Footer from "../designs/footer";
import Logos from "../designs/logos";
import Fluid from "../designs/fluid";
import AddSection from "./addSection";
import Pricing from "../designs/pricing";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { closeSectionDesigns } from "@/reduxStore/action";
import ControlButtons from "./controlButtons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMotion } from "@/hooks/useMotion";
import { useParams, useRouter } from "next/navigation";

const Section: React.FC<{ pageId: string }> = ({ pageId }) => {
  const router = useRouter();
  const { siteId } = useParams();
  const currentPage = useAppSelector((state) =>
    state.editor.present.editor.pages.find((page) => page.pageId === pageId)
  );

  const { globalSections } = useAppSelector(
    (state) => state.editor.present
  );
  const globalHeader = globalSections.find(
    (section) => section.sectionName === "Header"
  );
  const globalFooter = globalSections.find(
    (section) => section.sectionName === "Footer"
  );

  const dispatch = useAppDispatch();
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const { motion, AnimatePresence } = useMotion();

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Gallery,
    Logos,
    Fluid,
    Pricing,
  };

  const globalSectionMapper = {
    Header,
    Footer,
  };

  const GlobalHeaderSection = globalSectionMapper["Header"];
  const GlobalFooterSection = globalSectionMapper["Footer"];

  const handleMouseEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveringIndex(null);
  };

  if (!currentPage) router.push(`/site/${siteId}/editor/`);

  return (
    <div className="overflow-y-hidden">
      <AnimatePresence mode="popLayout">
        {currentPage?.pageSettings.showHeader && (
          <motion.div
            key="global-header"
            layout
            onClick={() => dispatch(closeSectionDesigns())}
          >
            <GlobalHeaderSection pageId={pageId} section={globalHeader} />
          </motion.div>
        )}
        {currentPage?.sections.map((section, i) => {
          const SectionComponent = sectionsMapper[section.sectionName];

          return (
            <motion.div
              layout
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "tween" }}
              key={section.id}
              className="relative"
            >
              <HoverCard
                key={section.id}
                closeDelay={0}
                openDelay={0}
                open={hoveringIndex === i}
              >
                <div
                  id={`section-${i}`} // Add id for scrolling
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onMouseOver={() => handleMouseEnter(i)}
                >
                  <HoverCardContent
                    align="end"
                    side="top"
                    avoidCollisions={false}
                    sideOffset={-45}
                    alignOffset={10}
                  >
                    {section.sectionName !== "Header" && (
                      <ControlButtons
                        sectionIndex={i}
                        sectionId={section.id}
                        pageId={pageId}
                      />
                    )}
                  </HoverCardContent>
                  <HoverCardTrigger>
                    <div onClick={() => dispatch(closeSectionDesigns())}>
                      <SectionComponent
                        key={section.id}
                        section={section}
                        pageId={pageId}
                      />
                    </div>
                  </HoverCardTrigger>
                  {section.sectionName !== "Header" && (
                    <div
                      className="absolute rounded-full z-20 
                    right-2/4 transform -translate-x-1/2 -translate-y-1/2 
                    cursor-pointer bg-background"
                    >
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <AddSection sectionIndex={i} pageId={pageId} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Add Section
                            <TooltipArrow className="fill-muted" />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </HoverCard>
            </motion.div>
          );
        })}
        {currentPage?.pageSettings.showFooter && (
          <motion.div
            key="global-footer"
            layout
            onClick={() => dispatch(closeSectionDesigns())}
          >
            <GlobalFooterSection pageId={pageId} section={globalFooter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Section;
