import { useSections } from "@/hooks/useSections";
import {
  closeSectionDesigns,
  updateEditorSections,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React from "react";

function ChooseSection() {
  const editor = useAppSelector((state) => state.editor.editor);
  const sectionIndex = useAppSelector((state) => state.editor.sectionIndex);
  const dispatch = useAppDispatch();
  const { sections } = useSections();

  const handleChooseSection = (section: any) => {
    if (sectionIndex < 0 || sectionIndex >= editor.sections.length) {
      console.error("Index out of bounds");
      return editor.sections;
    }

    // Create a copy of the sections array
    const newSections = [...editor.sections];
    newSections.splice(sectionIndex + 1, 0, section);

    dispatch(closeSectionDesigns());
    dispatch(updateEditorSections(newSections));
    dispatch(updateSelectedSection(section.id));
  };

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id} onClick={() => handleChooseSection(section)}>
          {section.sectionName}
        </div>
      ))}
    </div>
  );
}

export default ChooseSection;
