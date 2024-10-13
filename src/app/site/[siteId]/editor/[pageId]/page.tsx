"use client";

import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React, { useEffect } from "react";
import Section from "../section";
import {
  updateActivePage,
  updateEditorState,
  updateIsDraggableModal,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import DraggableModal from "../draggableModal";

function Page({ params }: any) {
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const isDraggableModalActive = useAppSelector(
    (state) => state.editor.isDraggableModalActive
  );
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

  if (!params.pageId) return null;

  return (
    <main className={`${selectedPallet} page-container`}>
      <DraggableModal
        isOpen={isDraggableModalActive}
        closeModal={() => {
          dispatch(updateIsDraggableModal(false));
        }}
      >
        <h2>asdasd</h2>
      </DraggableModal>
      <Section pageId={params.pageId} />
    </main>
  );
}

export default Page;
