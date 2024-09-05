"use client";
import React, { useState } from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import Accordion from "../designs/accordion";
import Testimonials from "../designs/testimonials";
import Gallery from "../designs/gallery";
import AddSection from "./addSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { closeSectionDesigns } from "@/reduxStore/action";
import ControlButtons from "./controlButtons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Header from "../designs/header";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Section: React.FC<{ pageId: string }> = ({ pageId }) => {
  const currentPage = useAppSelector((state) =>
    state.editor.editor.pages.find((page) => page.pageId === pageId)
  );
  const dispatch = useAppDispatch();
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Header,
    Gallery,
  };

  const handleMouseEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveringIndex(null);
  };

  if (!currentPage) return null;

  return (
    <div>
      {currentPage.sections.map((section, i) => {
        if (
          section.sectionName === "Header" &&
          !currentPage.pageSettings.showHeader
        ) {
          return null; // Skip rendering the Header section
        }

        const SectionComponent = sectionsMapper[section.sectionName];

        return (
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
              <HoverCardTrigger>
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
                <div onClick={() => dispatch(closeSectionDesigns())}>
                  <SectionComponent
                    key={section.id}
                    section={section}
                    pageId={pageId}
                  />
                </div>
                {section.sectionName !== "Header" && (
                  <HoverCardContent
                    className="rounded-full"
                    align="center"
                    side="bottom"
                    avoidCollisions={false}
                    sideOffset={-14}
                    alignOffset={0}
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
                  </HoverCardContent>
                )}
              </HoverCardTrigger>
            </div>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default Section;

{
  /* <TooltipProvider delayDuration={0}>
  <Tooltip>
    <TooltipTrigger
      className="flex items-center justify-center h-[30px] w-[30px] hover:bg-muted"
      onClick={onClick}
    >
      {icon}
    </TooltipTrigger>
    <TooltipContent>
      {tooltipContent}
      <TooltipArrow className="fill-muted" />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>; */
}
