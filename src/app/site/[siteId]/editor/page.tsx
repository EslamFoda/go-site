"use client";

import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Section from "./section";
import {
  updateActivePage,
  updateEditorState,
  updateIsDraggableModal,
  updateSelectedPallet,
  updateStorage,
} from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import DraggableModal from "./draggableModal";
import FluidImage from "./fluidSectionSettings/fluidImage";
import FluidButton from "./fluidSectionSettings/fluidButton";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import ButtonLayout from "./fluidLayoutSettings/buttonLayout";
import ImageLayout from "./fluidLayoutSettings/imageLayout";
import PreviewSection from "./previewSections";

export default function Home({ params }: any) {
  const [loading, setLoading] = React.useState(true);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const {
    previewMode,
    selectedPallet,
    isDraggableModalActive,
    fluidCard,
    activePage: activePageId,
    selectedSection,
    draggableModalName,
    designSettings: { borderRadius, colors, width },
    isGenerating,
  } = useAppSelector((state) => state.editor.present);
  const page = useAppSelector((state) =>
    state.editor.present.editor.pages.find(
      (page) => page.pageId === activePageId
    )
  );
  const sections = page?.sections;
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;
  const homePageId = useAppSelector(
    (state) => state.editor.present.editor.pages[0].pageId
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchSiteData = async () => {
      const supabase = createClient();
      const { data: siteData, error } = await supabase
        .from("sites")
        .select()
        .eq("siteId", params.siteId)
        .single();

      if (siteData) {
        dispatch(
          updateEditorState(["designSettings"], siteData.designSettings)
        );
        dispatch(
          updateEditorState(["globalSections"], siteData.globalSections)
        );
        dispatch(updateEditorState(["editor", "pages"], siteData.pages));
        dispatch(updateActivePage(siteData.pages[0].pageId));
        dispatch(updateEditorState(["settings"], siteData.settings));
        dispatch(updateSelectedPallet(siteData.selectedPallet));
        dispatch(updateStorage(siteData.storage));
        setLoading(false);
      }
      if (error) console.log(error);
    };

    if (!isGenerating) fetchSiteData();
    else setLoading(false); // Skip fetch during generation, show live updates
  }, [params.siteId, dispatch, isGenerating]);

  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.style.setProperty("--radius", borderRadius);

      if (selectedPallet === "custom") {
        pageContainerRef.current.style.setProperty("--primary", colors.primary);
        pageContainerRef.current.style.setProperty(
          "--primary-foreground",
          colors.primaryForGround
        );
      }
      pageContainerRef.current.style.setProperty(
        "--container-max-width",
        width.fullWidthPage ? "100%" : `${width.pages}px`
      );
    }
  }, [
    borderRadius,
    colors,
    width,
    pageContainerRef,
    width.fullWidthPage,
    selectedPallet,
  ]);

  const fluidCardsMapper = {
    image: FluidImage,
    button: FluidButton,
  };

  const fluidCardLayoutMapper = {
    image: ImageLayout,
    button: ButtonLayout,
  };

  const modalHeadTextMapper = {
    image: "Image Settings",
    button: "Button Settings",
    text: "Text Settings",
  };

  const settingsModalMapper = {
    SETTINGS: () => {
      if (fluidCard?.type === "text") return null;
      if (!fluidCard || !fluidCardsMapper[fluidCard.type]) return null;
      const FluidSettings = fluidCardsMapper[fluidCard.type];
      return (
        <FluidSettings
          fluidCard={fluidCard}
          activePageId={activePageId}
          selectedSection={findSelectedSection}
        />
      );
    },
    LAYOUT: () => {
      if (fluidCard?.type === "text") return null;
      if (!fluidCard || !fluidCardLayoutMapper[fluidCard.type]) return null;
      const FluidLayouts = fluidCardLayoutMapper[fluidCard.type];
      return (
        <FluidLayouts
          fluidCard={fluidCard}
          activePageId={activePageId}
          selectedSection={findSelectedSection}
        />
      );
    },
  };

  const modalHeadText =
    draggableModalName === "SETTINGS" && fluidCard
      ? modalHeadTextMapper[fluidCard.type]
      : "";

  const renderModalContent = () => {
    const renderContent = settingsModalMapper[draggableModalName];
    return renderContent ? renderContent() : null;
  };

  if (loading) return null;

  // this is for the preview mode sections

  if (previewMode || isGenerating) {
    return (
      <div
        className={`${selectedPallet} page-container`}
        ref={pageContainerRef}
      >
        <PreviewSection pageId={homePageId} />
      </div>
    );
  }

  // this is for the editor mode sections
  return (
    <div className={`${selectedPallet} page-container`} ref={pageContainerRef}>
      <DraggableModal
        headText={modalHeadText}
        isOpen={isDraggableModalActive}
        closeModal={() => dispatch(updateIsDraggableModal(false))}
      >
        {renderModalContent()}
      </DraggableModal>
      <Section pageId={homePageId} />
    </div>
  );
}
