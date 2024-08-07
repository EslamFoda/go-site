"use client";
import React from "react";
import { scroller } from "react-scroll";
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
  updateEditorSections,
} from "@/reduxStore/action";

const Section: React.FC = () => {
  const editorSections = useAppSelector(
    (state) => state.editor.editor.sections
  );
  const dispatch = useAppDispatch();

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newSections = [...editorSections];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];
      dispatch(updateEditorSections(newSections));

      // Scroll to the top section
      scroller.scrollTo(`section-${index - 1}`, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50, // Adjust offset as needed
      });
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < editorSections.length - 1) {
      const newSections = [...editorSections];
      [newSections[index], newSections[index + 1]] = [
        newSections[index + 1],
        newSections[index],
      ];
      dispatch(updateEditorSections(newSections));

      // Scroll to the next section
      scroller.scrollTo(`section-${index + 1}`, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50, // Adjust offset as needed
      });
    }
  };

  return (
    <div>
      {editorSections.map((section, i) => {
        const SectionComponent = sectionsMapper[section.sectionName];
        return (
          <div
            key={section.id}
            id={`section-${i}`} // Add id for scrolling
          >
            <div onClick={() => dispatch(closeSectionDesigns())}>
              <SectionComponent
                key={section.id}
                section={section}
                handleSelectedSection={updateSelectedSection}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <button onClick={() => moveSectionUp(i)} disabled={i === 0}>
                Move Up
              </button>
              <button
                onClick={() => moveSectionDown(i)}
                disabled={i === editorSections.length - 1}
              >
                Move Down
              </button>
            </div>
            <AddSection sectionIndex={i} />
          </div>
        );
      })}
    </div>
  );
};

export default Section;
