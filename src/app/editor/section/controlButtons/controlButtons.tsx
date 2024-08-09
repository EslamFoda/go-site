import { updateEditorSections } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useMemo } from "react";
import { scroller } from "react-scroll";
import ControlBtn from "./controlBtn";
import SectionSettingsBtn from "./sectionSettingsBtn";

interface ControlButtonsProps {
  sectionIndex: number;
  sectionId: string;
}

function ControlButtons({ sectionIndex, sectionId }: ControlButtonsProps) {
  const editorSections = useAppSelector(
    (state) => state.editor.editor.sections
  );
  const dispatch = useAppDispatch();

  const isFirstSection = useMemo(() => sectionIndex === 0, [sectionIndex]);
  const isLastSection = useMemo(
    () => sectionIndex === editorSections.length - 1,
    [sectionIndex, editorSections.length]
  );

  const moveSectionUp = () => {
    if (!isFirstSection) {
      const newSections = [...editorSections];
      [newSections[sectionIndex - 1], newSections[sectionIndex]] = [
        newSections[sectionIndex],
        newSections[sectionIndex - 1],
      ];
      dispatch(updateEditorSections(newSections));
      scrollToSection(sectionIndex - 1);
    }
  };

  const moveSectionDown = () => {
    if (!isLastSection) {
      const newSections = [...editorSections];
      [newSections[sectionIndex], newSections[sectionIndex + 1]] = [
        newSections[sectionIndex + 1],
        newSections[sectionIndex],
      ];
      dispatch(updateEditorSections(newSections));
      setTimeout(() => {
        scrollToSection(sectionIndex + 1);
      }, 0);
    }
  };

  const scrollToSection = (index: number) => {
    scroller.scrollTo(`section-${index}`, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50,
    });
  };

  return (
    <div className="flex bg-background border rounded-[4px] border-muted divide-x">
      <ControlBtn
        icon={<ArrowUp size={16} />}
        tooltipContent="Move Up"
        onClick={moveSectionUp}
        disabled={isFirstSection}
      />
      <ControlBtn
        icon={<ArrowDown size={16} />}
        tooltipContent="Move Down"
        onClick={moveSectionDown}
        disabled={isLastSection}
      />

      <SectionSettingsBtn sectionId={sectionId} sectionIndex={sectionIndex} />
    </div>
  );
}

export default ControlButtons;
