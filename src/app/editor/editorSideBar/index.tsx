"use client";
import React from "react";
import BannerSettings from "./tabs/sectionSettings/banner/bannerSettings";
import ChooseSection from "./tabs/chooseSection";
import useEditor from "../store/editorStore";
import CardsSettings from "./tabs/sectionSettings/cards/CardsSettings";

const EditorSidebar = () => {
  const { selectedSection, updateContent, updateStyle, openSectionDesigns } =
    useEditor();

  return (
    <div>
      {!openSectionDesigns ? (
        selectedSection?.sectionName === "Banner" ? (
          <BannerSettings />
        ) : selectedSection?.sectionName === "Cards" ? (
          <CardsSettings />
        ) : null
      ) : null}
      {openSectionDesigns && <ChooseSection />}
    </div>
  );
};

export default EditorSidebar;
