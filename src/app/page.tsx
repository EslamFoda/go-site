"use client";
import Section from "./editor/section";
import useEditor from "@/store/editorStore";


export default function Home() {
  const { selectedPallet } = useEditor();
  return (
    <main className={selectedPallet}>
      <Section />
    </main>
  );
}
