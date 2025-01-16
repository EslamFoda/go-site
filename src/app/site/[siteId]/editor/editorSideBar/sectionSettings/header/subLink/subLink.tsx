import { Label } from "@/components/ui/label";
import { SubLink as SubLinkType } from "@/types/sectionsTypes/header";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";

interface SubLinkProps {
  selectedSubLink: SubLinkType;
  handleDeleteSubLink: () => void;
  clearSubLinkItem: () => void;
  handleUpdateSubLinkItem: (field: keyof SubLinkType, value: any) => void;
}

function SubLink({
  selectedSubLink,
  handleDeleteSubLink,
  clearSubLinkItem,
  handleUpdateSubLinkItem,
}: SubLinkProps) {
  const {
    editor: { pages },
  } = useAppSelector((state) => state.editor.present);

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between p-5 items-center gap-4 border-b-[1px] border-b-muted-bg mb-3"
        onClick={clearSubLinkItem}
      >
        <div className="flex gap-4 items-center cursor-pointer">
          <ChevronLeft size={18} />
          <Label className="cursor-pointer">{selectedSubLink.text}</Label>
        </div>
        <div className="cursor-pointer" onClick={handleDeleteSubLink}>
          <Trash2 size="18px" color="red" />
        </div>
      </div>
      <div className="px-5 space-y-2">
        <EditText
          label="Text"
          id={selectedSubLink.id}
          value={selectedSubLink.text}
          handleUpdate={(e: any) =>
            handleUpdateSubLinkItem("text", e.target.value)
          }
        />
        <LinkSelector
          label="Link"
          links={pages.map((page) => ({
            id: page.pageId,
            link: page.pageSettings.link,
          }))}
          selectedLink={selectedSubLink.link}
          onSelect={(link) => handleUpdateSubLinkItem("link", link)}
        />
      </div>
    </div>
  );
}

export default SubLink;
