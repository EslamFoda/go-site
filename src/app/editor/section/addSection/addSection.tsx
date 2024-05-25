import useEditor from "@/store/editorStore";
import { PlusCircle } from "lucide-react";
import React from "react";

function AddSection({ sectionIndex }: { sectionIndex: number }) {
  const { handleOpenSectionDesigns, handleSelectedSectionIndex } = useEditor();
  const handleToggleSectionDesigns = () => {
    handleOpenSectionDesigns();
    handleSelectedSectionIndex(sectionIndex);
  };
  return (
    <div
      onClick={handleToggleSectionDesigns}
      className="w-full flex items-center justify-center m-auto"
    >
      <PlusCircle cursor="pointer" />
    </div>
  );
}

export default AddSection;
