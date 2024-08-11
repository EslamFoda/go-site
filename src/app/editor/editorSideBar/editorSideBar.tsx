"use client";
import React from "react";
import ChooseSection from "./chooseSection";
import { useAppSelector } from "@/reduxStore/hooks";
import Link from "next/link";
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

const EditorSidebar = () => {
  const {
    activePage: activePageId,
    selectedSection,
    openPallet,
    openPages,
    openSectionDesigns,
  } = useAppSelector((state) => state.editor);

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
      {openPages && <Pages />}
    </div>
  );
};

export default EditorSidebar;
