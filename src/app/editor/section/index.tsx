"use client";
import React from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import AddSection from "./addSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeSectionDesigns,
  updateSelectedSection,
} from "@/reduxStore/action";

const Section = () => {
  const editorSections = useAppSelector(
    (state) => state.editor.editor.sections
  );
  const dispatch = useAppDispatch();

  const sectionsMapper = { Banner: Banner, Cards: Cards, List: List };

  return (
    <div>
      {editorSections.map((section, i) => {
        console.log(section, "section");
        // @ts-ignore
        const Section = sectionsMapper[section.sectionName];
        return (
          <div key={section.id}>
            <div onClick={() => dispatch(closeSectionDesigns())}>
              <Section
                key={section.id}
                section={section}
                handleSelectedSection={updateSelectedSection}
              />
            </div>
            <AddSection sectionIndex={i} />
          </div>
        );
      })}
    </div>
  );
};

export default Section;
