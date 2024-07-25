"use client";
import { useAppSelector } from "@/reduxStore/hooks";
import Section from "./editor/section";

export default function Home() {
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  return (
    <main className={selectedPallet}>
      <Section />
    </main>
  );
}
