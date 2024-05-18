import { PlusCircle } from "lucide-react";
import React from "react";
import useEditor from "../../store/editorStore";

function AddSection({ sectionIndex }: { sectionIndex: number }) {
  const { toggleSectionDesigns, handleSelectedSectionIndex } = useEditor();
  const handleToggleSectionDesigns = () => {
    toggleSectionDesigns();
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
