"use client";

import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Section from "./section";
import { useEffect, useState } from "react";
import {
  updateActivePage,
  updateEditorState,
  updateIsDraggableModal,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import DraggableModal from "./draggableModal";
import FluidImage from "./fluidSectionSettings/fluidImage";
import FluidButton from "./fluidSectionSettings/fluidButton";

export default function Home({ params }: any) {
  const [loading, setLoading] = useState(true);
  const { selectedPallet, isDraggableModalActive, fluidCard } = useAppSelector(
    (state) => state.editor
  );
  const homePageId = useAppSelector(
    (state) => state.editor.editor.pages[0].pageId
  );

  const dispatch = useAppDispatch();

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
        dispatch(
          updateEditorState(["designSettings"], siteData.designSettings)
        );

        // Update pages
        dispatch(updateEditorState(["editor", "pages"], siteData.pages));

        // Update activePage
        dispatch(updateActivePage(siteData.pages[0].pageId));
        // Update site settings
        dispatch(updateEditorState(["settings"], siteData.settings));

        // Update selected pallet settings
        dispatch(updateSelectedPallet(siteData.selectedPallet));

        setLoading(false);
      }
    };

    fetchSiteData();
  }, [params.siteId, dispatch, homePageId, params.pageId]);

  const fluidCardsMapper = {
    image: FluidImage,
    button: FluidButton,
  };
  const modalHeadTextMapper = {
    image: "Image Settings",
    button: "Button Settings",
  };
  const modalHeadText =
    (fluidCard && modalHeadTextMapper[fluidCard?.type]) || "";
  const FluidCardSettings = fluidCard ? fluidCardsMapper[fluidCard.type] : null;

  if (loading) return null;

  return (
    <div className={`${selectedPallet} page-container`}>
      <DraggableModal
        headText={modalHeadText}
        isOpen={isDraggableModalActive}
        closeModal={() => {
          dispatch(updateIsDraggableModal(false));
        }}
      >
        {FluidCardSettings && <FluidCardSettings fluidCard={fluidCard} />}
      </DraggableModal>
      <Section pageId={homePageId} />
    </div>
  );
}
