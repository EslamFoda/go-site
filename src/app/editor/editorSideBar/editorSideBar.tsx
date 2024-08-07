"use client";
import React from "react";
import ChooseSection from "./tabs/chooseSection";
import { useAppSelector } from "@/reduxStore/hooks";
import testimonials from "./tabs/sectionSettings/testimonials";
import accordion from "./tabs/sectionSettings/accordion";
import list from "./tabs/sectionSettings/list";
import cards from "./tabs/sectionSettings/cards";
import banner from "./tabs/sectionSettings/banner";
import DesignSettings from "./designSettings";

const EditorSidebar = () => {
  const openSectionDesigns = useAppSelector(
    (state) => state.editor.openSectionDesigns
  );
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
  const openPallet = useAppSelector((state) => state.editor.openPallet);

  const sectionComponents: Record<string, React.ComponentType | null> = {
    Banner: banner,
    Cards: cards,
    List: list,
    Accordion: accordion,
    Testimonials: testimonials,
  };

  const SelectedSectionComponent = selectedSection
    ? sectionComponents[selectedSection.sectionName]
    : null;

  return (
    <div className="overflow-auto">
      {openSectionDesigns ? (
        <ChooseSection />
      ) : SelectedSectionComponent ? (
        <SelectedSectionComponent />
      ) : null}

      {openPallet && <DesignSettings />}
    </div>
  );
};

export default EditorSidebar;
