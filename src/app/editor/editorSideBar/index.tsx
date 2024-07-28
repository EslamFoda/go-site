"use client";
import React from "react";
import ChooseSection from "./tabs/chooseSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateSelectedPallet } from "@/reduxStore/action";
import testimonials from "./tabs/sectionSettings/testimonials";
import accordion from "./tabs/sectionSettings/accordion";
import list from "./tabs/sectionSettings/list";
import cards from "./tabs/sectionSettings/cards";
import banner from "./tabs/sectionSettings/banner";

const EditorSidebar = () => {
  const dispatch = useAppDispatch();
  const openSectionDesigns = useAppSelector(
    (state) => state.editor.openSectionDesigns
  );
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
  const openPallet = useAppSelector((state) => state.editor.openPallet);

  const themeMapping: Record<string, string> = {
    "theme-rose": "Rose",
    "theme-green": "Green",
    "theme-orange": "Orange",
    "default-theme": "default",
  };

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

      {openPallet && (
        <div className="overflow-y-auto h-screen pb-20">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(themeMapping).map(([key, value]) => (
              <div key={key} className={key}>
                <div
                  className="bg-primary h-12"
                  onClick={() => dispatch(updateSelectedPallet(key))}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;
