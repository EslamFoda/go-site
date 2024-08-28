import { Label } from "@/components/ui/label";
import { Link } from "@/types/sectionsTypes/header";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";

interface LinkItemProps {
  selectedLink: Link;
  handleDeleteLink: () => void;
  clearLinkItem: () => void;
  handleUpdateLinkItem: (field: keyof Link, value: any) => void;
}

function LinkItem({
  selectedLink,
  handleDeleteLink,
  clearLinkItem,
  handleUpdateLinkItem,
}: LinkItemProps) {
  const {
    editor: { pages },
  } = useAppSelector((state) => state.editor);

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between p-5 items-center gap-4 border-b-[1px] border-b-muted-bg mb-3"
        onClick={clearLinkItem}
      >
        <div className="flex gap-4 items-center cursor-pointer">
          <ChevronLeft size={18} />
          <Label className="cursor-pointer">{selectedLink.text}</Label>
        </div>
        <div className="cursor-pointer" onClick={handleDeleteLink}>
          <Trash2 size="18px" color="red" />
        </div>
      </div>
      <div className="px-5 space-y-2">
        <EditText
          label="Text"
          id={selectedLink.id}
          value={selectedLink.text}
          handleUpdate={(e: any) =>
            handleUpdateLinkItem("text", e.target.value)
          }
        />
        <LinkSelector
          label="Link"
          links={pages.map((page) => ({
            id: page.pageId,
            link: page.pageSettings.link,
          }))}
          selectedLink={selectedLink.link}
          onSelect={(link) => handleUpdateLinkItem("link", link)}
        />
      </div>
    </div>
  );
}

export default LinkItem;
