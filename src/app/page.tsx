"use client";
import { useAppSelector } from "@/reduxStore/hooks";
import Section from "./editor/section";

export default function Home() {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  console.log(selectedPallet, "selectedPallet");
  return (
    <main className={`${selectedPallet} page-container`}>
      <Section />
    </main>
  );
}
