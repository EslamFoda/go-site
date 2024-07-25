"use client";
import React from "react";
import BannerSettings from "./tabs/sectionSettings/banner";
import ChooseSection from "./tabs/chooseSection";
import CardsSettings from "./tabs/sectionSettings/cards";
import ListSettings from "./tabs/sectionSettings/list";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateSelectedPallet } from "@/reduxStore/action";

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
