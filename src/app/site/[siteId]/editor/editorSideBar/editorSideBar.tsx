"use client";

import React, { useCallback, useEffect } from "react";
import ChooseSection from "./chooseSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import DesignSettings from "./designSettings";
import banner from "./sectionSettings/banner";
import cards from "./sectionSettings/cards";
import accordion from "./sectionSettings/accordion";
import testimonials from "./sectionSettings/testimonials";
import list from "./sectionSettings/list";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import Pages from "./pages";
import { createClient } from "@/utlis/supabase/client";
import debounce from "debounce";
import PageSetting from "./pageSetting";
import header from "./sectionSettings/header";
import gallery from "./sectionSettings/gallery";
import logos from "./sectionSettings/logos";
import fluid from "./sectionSettings/fluid";
import footer from "./sectionSettings/footer";
import pricing from "./sectionSettings/pricing";
import { updateSavingStatus } from "@/reduxStore/action";

const EditorSidebar = () => {
  const {
    activePage: activePageId,
    selectedSection,
    openPallet,
    openPages,
    openSectionDesigns,
    openPageSetting,
    editor: { pages },
    settings: { siteId },
    globalSections,
    storage,
    designSettings,
    selectedPallet,
  } = useAppSelector((state) => state.editor.present);
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) =>
    state.editor.present.editor.pages.find(
      (page) => page.pageId === activePageId
    )
  );
  const sections = page?.sections;

  const sectionComponents: Record<
    string,
    React.ComponentType<{
      sections:
        | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
        | undefined;
      pageId: string;
    }> | null
  > = {
    Header: header,
    Banner: banner,
    Cards: cards,
    List: list,
    Accordion: accordion,
    Testimonials: testimonials,
    Gallery: gallery,
    Logos: logos,
    Fluid: fluid,
    Footer: footer,
    Pricing: pricing,
  };

  const sectionsData =
    selectedSection?.sectionName === "Header" ||
    selectedSection?.sectionName === "Footer"
      ? globalSections
      : sections;

  const SelectedSectionComponent = selectedSection
    ? sectionComponents[selectedSection.sectionName]
    : null;

  const updatePageStyleAndContent = useCallback(async () => {
    dispatch(updateSavingStatus(true));
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sites")
      .update({
        pages: pages,
        globalSections: globalSections,
        storage: storage,
        designSettings: designSettings,
        selectedPallet: selectedPallet,
      })
      .eq("siteId", siteId)
      .select();
      dispatch(updateSavingStatus(false));

    if (error) {
      console.error("Error updating pages:", error);
    }
  }, [
    pages,
    siteId,
    globalSections,
    storage,
    designSettings,
    selectedPallet,
    dispatch,
  ]);

  const debouncedUpdatePageStyleAndContent = debounce(
    updatePageStyleAndContent,
    500
  );

  useEffect(() => {
    debouncedUpdatePageStyleAndContent();

    // Cleanup function to cancel any pending debounced calls when the component unmounts
    return () => {
      debouncedUpdatePageStyleAndContent.clear();
    };
  }, [pages, globalSections, storage, designSettings]);

  // Determine which component to render in the sidebar
  const renderSidebarContent = () => {
    if (openSectionDesigns) {
      return <ChooseSection />;
    } else if (openPallet) {
      return <DesignSettings />;
    } else if (openPages) {
      return <Pages />;
    } else if (openPageSetting) {
      return <PageSetting />;
    } else if (SelectedSectionComponent) {
      return (
        <SelectedSectionComponent
          sections={sectionsData}
          pageId={activePageId}
        />
      );
    } else {
      // Default state when nothing is selected
      return <Pages />;
    }
  };

  return <div className="overflow-auto">{renderSidebarContent()}</div>;
};

export default EditorSidebar;
