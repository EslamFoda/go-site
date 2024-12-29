"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Section from "../section";
import {
  updateActivePage,
  updateEditorState,
  updateIsDraggableModal,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import DraggableModal from "../draggableModal";
import FluidImage from "../fluidSectionSettings/fluidImage";
import FluidButton from "../fluidSectionSettings/fluidButton";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import ImageLayout from "../fluidLayoutSettings/imageLayout";
import ButtonLayout from "../fluidLayoutSettings/buttonLayout";
import FluidText from "../fluidSectionSettings/fluidText";

function Page({ params }: any) {
  const dispatch = useAppDispatch();
  const {
    selectedPallet,
    isDraggableModalActive,
    fluidCard,
    activePage: activePageId,
    selectedSection,
    draggableModalName,
  } = useAppSelector((state) => state.editor);
  const page = useAppSelector((state) =>
    state.editor.editor.pages.find((page) => page.pageId === activePageId)
  );
  const sections = page?.sections;
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  useEffect(() => {
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
        console.log(siteData, "siteData");
        dispatch(
          updateEditorState(["designSettings"], siteData.designSettings)
        );

        // Update pages
        dispatch(updateEditorState(["editor", "pages"], siteData.pages));

        // Update activePage
        dispatch(updateActivePage(params.pageId));

        // Update site settings
        dispatch(updateEditorState(["settings"], siteData.settings));

        // Update selected pallet settings
        dispatch(updateSelectedPallet(siteData.selectedPallet));
      }
    };

    fetchSiteData();
  }, [params.siteId, dispatch, params.pageId]);

  const fluidCardsMapper = {
    image: FluidImage,
    button: FluidButton,
    text: FluidText,
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

  if (!params.pageId) return null;

  return (
    <main className={`${selectedPallet} page-container`}>
      <DraggableModal
        headText={modalHeadText}
        isOpen={isDraggableModalActive}
        closeModal={() => {
          dispatch(updateIsDraggableModal(false));
        }}
      >
        {renderModalContent()}
      </DraggableModal>
      <Section pageId={params.pageId} />
    </main>
  );
}

export default Page;
