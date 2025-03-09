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

export default function Home({ params }: any) {
  const [loading, setLoading] = React.useState(true);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const {
    selectedPallet,
    isDraggableModalActive,
    fluidCard,
    activePage: activePageId,
    selectedSection,
    draggableModalName,
    designSettings: { borderRadius },
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

      if (error) console.log(error);
      if (siteData) {
        // Update designSettings
        dispatch(
          updateEditorState(["designSettings"], siteData.designSettings)
        );
        dispatch(
          updateEditorState(["globalSections"], siteData.globalSections)
        );
        // Update pages
        dispatch(updateEditorState(["editor", "pages"], siteData.pages));

        // Update activePage
        dispatch(updateActivePage(siteData.pages[0].pageId));
        // Update site settings
        dispatch(updateEditorState(["settings"], siteData.settings));

        // Update selected pallet settings
        dispatch(updateSelectedPallet(siteData.selectedPallet));

        dispatch(updateStorage(siteData.storage));

        setLoading(false);
      }
    };

    fetchSiteData();
  }, [params.siteId, dispatch, homePageId, params.pageId]);

  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.style.setProperty("--radius", borderRadius);
    }
  }, [borderRadius]);

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

  return (
    <div className={`${selectedPallet} page-container`} ref={pageContainerRef}>
      <DraggableModal
        headText={modalHeadText}
        isOpen={isDraggableModalActive}
        closeModal={() => {
          dispatch(updateIsDraggableModal(false));
        }}
      >
        {renderModalContent()}
      </DraggableModal>
      <Section pageId={homePageId} />
    </div>
  );
}
