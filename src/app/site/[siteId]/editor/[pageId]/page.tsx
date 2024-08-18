"use client";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React, { useEffect } from "react";
import Section from "../section";
import { updateEditorState } from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";

function Page({ params }: any) {
  const dispatch = useAppDispatch();
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const pages = useAppSelector((state) => state.editor.editor.pages);
  const currentPage = pages.find((page) => page.pageId === params.pageId);
  const pageId = currentPage?.pageId;

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
        dispatch(updateEditorState(["activePage"], siteData.pages[0].pageId));

        // Update site settings
        dispatch(updateEditorState(["settings"], siteData.settings));
      }
    };

    fetchSiteData();
  }, [params.siteId, dispatch, pageId, params.pageId]);

  if (!pageId) return null;

  return (
    <main className={`${selectedPallet} page-container`}>
      <Section pageId={pageId} />
    </main>
  );
}

export default Page;
