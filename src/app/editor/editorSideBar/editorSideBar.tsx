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
import Link from "next/link";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";

const EditorSidebar = () => {
  const openSectionDesigns = useAppSelector(
    (state) => state.editor.openSectionDesigns
  );
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
  console.log(selectedSection, "slectedsection");
  const openPallet = useAppSelector((state) => state.editor.openPallet);
  const activePageId = useAppSelector((state) => state.editor.activePage);
  const page = useAppSelector((state) =>
    state.editor.editor.pages.find((page) => page.pageId === activePageId)
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
      <Link className="block" href="/editor/1">
        eslam
      </Link>
      <Link href="/editor/">ediotr</Link>
      {openSectionDesigns ? (
        <ChooseSection />
      ) : SelectedSectionComponent ? (
        <SelectedSectionComponent sections={sections} pageId={activePageId} />
      ) : null}

      {openPallet && <DesignSettings />}
    </div>
  );
};

export default EditorSidebar;
