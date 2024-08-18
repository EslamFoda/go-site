import { openSectionDesigns, updateSectionIndex } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { PlusCircle } from "lucide-react";
import React from "react";
interface AddSectionProps {
  sectionIndex: number;
  pageId: string;
}
function AddSection({ sectionIndex }: AddSectionProps) {
  const dispatch = useAppDispatch();
  const handleToggleSectionDesigns = () => {
    dispatch(openSectionDesigns());
    dispatch(updateSectionIndex(sectionIndex));
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
