"use client";
import React from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import AddSection from "./addSection";
import useEditor, { EditorStore } from "@/store/editorStore";

const Section = () => {
  const editorState = useEditor((state: EditorStore) => state.editor);
  const { handleSelectedSection, closeSectionDesigns } = useEditor();

  const sectionsMapper = { Banner: Banner, Cards: Cards, List: List };

  return (
    <div>
      {editorState.sections.map((section, i) => {
        console.log(section, "section");
        // @ts-ignore
        const Section = sectionsMapper[section.sectionName];
        return (
          <div key={section.id}>
            <div onClick={closeSectionDesigns}>
              <Section
                key={section.id}
                section={section}
                handleSelectedSection={handleSelectedSection}
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
