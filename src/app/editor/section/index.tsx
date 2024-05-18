"use client";
import React from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import useEditor, { EditorStore } from "../store/editorStore";
import AddSection from "./addSection";

const Section = () => {
  const editorState = useEditor((state: EditorStore) => state.editor);
  const { handleSelectedSection } = useEditor();

  const sectionsMapper = { Banner: Banner, Cards: Cards };
  console.log(editorState, "editorState");

  return (
    <div>
      {editorState.sections.map((section, i) => {
        // @ts-ignore
        const Section = sectionsMapper[section.sectionName];
        return (
          <div key={section.id}>
            <Section
              key={section.id}
              section={section}
              handleSelectedSection={handleSelectedSection}
            />
            <AddSection sectionIndex={i} />
          </div>
        );
      })}
    </div>
  );
};

export default Section;
