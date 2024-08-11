"use client";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React, { useEffect } from "react";
import Section from "../section";
import { updateActivePage } from "@/reduxStore/action";

function Page({ params }: any) {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const pages = useAppSelector((state) => state.editor.editor.pages);
  const currentPage = pages.find((page) => page.pageId === params.pageId);
  const pageId = currentPage?.pageId;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (pageId) dispatch(updateActivePage(pageId));
  }, [pageId, dispatch]);

  if (!pageId) return null;

  return (
    <main className={`${selectedPallet} page-container`}>
      <Section pageId={pageId} />
    </main>
  );
}

export default Page;
