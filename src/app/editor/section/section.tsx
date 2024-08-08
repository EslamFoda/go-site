"use client";
import React, { useState } from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import Accordion from "../designs/accordion";
import Testimonials from "../designs/testimonials";
import AddSection from "./addSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeSectionDesigns,
  updateSelectedSection,
} from "@/reduxStore/action";
import ControlButtons from "./controlButtons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Section: React.FC = () => {
  const editorSections = useAppSelector(
    (state) => state.editor.editor.sections
  );
  const dispatch = useAppDispatch();
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
  };
  const handleMouseEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveringIndex(null);
  };
  return (
    <div>
      {editorSections.map((section, i) => {
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
                  <ControlButtons sectionIndex={i} sectionId={section.id} />
                </HoverCardContent>
                <div onClick={() => dispatch(closeSectionDesigns())}>
                  <SectionComponent
                    key={section.id}
                    section={section}
                    handleSelectedSection={updateSelectedSection}
                  />
                </div>
                <AddSection sectionIndex={i} />
              </HoverCardTrigger>
            </div>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default Section;
