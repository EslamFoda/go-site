"use client";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Section from "./section";
import { useEffect } from "react";
import { updateActivePage } from "@/reduxStore/action";

export default function Home() {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const homePageId = useAppSelector(
    (state) => state.editor.editor.pages[0].pageId
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateActivePage(homePageId));
  }, [homePageId, dispatch]);

  return (
    <main className={`${selectedPallet} page-container`}>
      <Section pageId={homePageId} />
    </main>
  );
}
