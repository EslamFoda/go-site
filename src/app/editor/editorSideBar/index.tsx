"use client";
import React from "react";
import BannerSettings from "./tabs/sectionSettings/banner";
import ChooseSection from "./tabs/chooseSection";
import CardsSettings from "./tabs/sectionSettings/cards";
import useEditor from "@/store/editorStore";
import ListSettings from "./tabs/sectionSettings/list";

const EditorSidebar = () => {
  const {
    selectedSection,
    openSectionDesigns,
    openPallet,
    handleSelectedPallet,
  } = useEditor();

  const themeMapping: Record<string, string> = {
    "theme-rose": "Rose",
    "theme-green": "Green",
    "theme-orange": "Orange",
    "default-theme": "default",
  };

  return (
    <div className="overflow-auto">
      {openSectionDesigns ? (
        <ChooseSection />
      ) : selectedSection?.sectionName === "Banner" ? (
        <BannerSettings />
      ) : selectedSection?.sectionName === "Cards" ? (
        <CardsSettings />
      ) : selectedSection?.sectionName === "List" ? (
        <ListSettings />
      ) : null}

      {openPallet && (
        <div className="overflow-y-auto h-screen pb-20">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(themeMapping).map(([key, value]) => (
              <div key={key} className={key}>
                <div
                  className="bg-primary h-12"
                  onClick={() => handleSelectedPallet(key)}
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
