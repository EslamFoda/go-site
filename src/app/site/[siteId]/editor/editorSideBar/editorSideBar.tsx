"use client";

import React, { useCallback, useEffect } from "react";
import ChooseSection from "./chooseSection";
import { useAppSelector } from "@/reduxStore/hooks";
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
  } = useAppSelector((state) => state.editor.present);

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
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sites")
      .update({
        pages: pages,
        globalSections: globalSections,
        storage: storage,
        designSettings: designSettings,
      })
      .eq("siteId", siteId)
      .select();

    if (error) {
      console.error("Error updating pages:", error);
    }
  }, [pages, siteId, globalSections, storage, designSettings]);

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

  return (
    <div className="overflow-auto">
      {openSectionDesigns ? (
        <ChooseSection />
      ) : SelectedSectionComponent ? (
        <SelectedSectionComponent
          sections={sectionsData}
          pageId={activePageId}
        />
      ) : null}

      {openPallet && <DesignSettings />}
      {openPages && <Pages />}
      {openPageSetting && <PageSetting />}
    </div>
  );
};

export default EditorSidebar;
