import { updateEditorSections } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useMemo } from "react";
import ControlBtn from "./controlBtn";
import SectionSettingsBtn from "./sectionSettingsBtn";
import { useScrollTo } from "@/hooks/useScrollTo";

interface ControlButtonsProps {
  sectionIndex: number;
  sectionId: string;
  pageId: string;
}

function ControlButtons({
  sectionIndex,
  sectionId,
  pageId,
}: ControlButtonsProps) {
  const dispatch = useAppDispatch();
  const { scrollToElement } = useScrollTo();
  const currentPage = useAppSelector((state) =>
    state.editor.present.editor.pages.find((page) => page.pageId === pageId)
  );
  const sections = currentPage?.sections;

  const isFirstSection = useMemo(() => sectionIndex === 0, [sectionIndex]);
  const isSecondSection = useMemo(() => sectionIndex === 1, [sectionIndex]);
  const isLastSection = useMemo(
    () => sections && sectionIndex === sections.length - 1,
    [sectionIndex, sections]
  );

  const moveSectionUp = () => {
    if (!isFirstSection && sections) {
      const newSections = [...sections];
      [newSections[sectionIndex - 1], newSections[sectionIndex]] = [
        newSections[sectionIndex],
        newSections[sectionIndex - 1],
      ];
      dispatch(updateEditorSections(pageId, newSections));
      scrollToElement(`section-${sectionIndex - 1}`);
    }
  };

  const moveSectionDown = () => {
    if (!isLastSection && sections) {
      const newSections = [...sections];
      [newSections[sectionIndex], newSections[sectionIndex + 1]] = [
        newSections[sectionIndex + 1],
        newSections[sectionIndex],
      ];
      dispatch(updateEditorSections(pageId, newSections));
      setTimeout(() => {
        scrollToElement(`section-${sectionIndex + 1}`);
      }, 0);
    }
  };

  return (
    <div className="flex bg-background border rounded-[4px] border-muted divide-x">
      <ControlBtn
        icon={<ArrowUp size={16} />}
        tooltipContent="Move Up"
        onClick={moveSectionUp}
        disabled={isFirstSection || isSecondSection}
      />
      <ControlBtn
        icon={<ArrowDown size={16} />}
        tooltipContent="Move Down"
        onClick={moveSectionDown}
        disabled={isLastSection}
      />

      <SectionSettingsBtn
        sectionId={sectionId}
        sectionIndex={sectionIndex}
        pageId={pageId}
        sections={sections}
      />
    </div>
  );
}

export default ControlButtons;
