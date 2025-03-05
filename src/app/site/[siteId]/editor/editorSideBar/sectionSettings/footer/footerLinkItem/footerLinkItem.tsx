import { Label } from "@/components/ui/label";
import { SubLink } from "@/types/sectionsTypes/header";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import DraggableList from "@/components/ui/DraggableList";
import {
  updateGlobalContent,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { v4 } from "uuid";
import { FooterContent, LinkGroup } from "@/types/sectionsTypes/footer";

interface FooterLinkItemProps {
  selectedLinkId: string;
  pageId: string;
  handleDeleteLink: () => void;
  clearLinkItem: () => void;
  sectionId: string;
}

function FooterLinkItem({
  selectedLinkId,
  pageId,
  sectionId,
  handleDeleteLink,
  clearLinkItem,
}: FooterLinkItemProps) {
  const dispatch = useAppDispatch();
  const { globalSections } = useAppSelector((state) => state.editor.present);
  const section = globalSections.find((section) => section.id === sectionId);
  const footerContent = section?.content as FooterContent;
  const selectedLink = footerContent?.links.find(
    (link) => link.id === selectedLinkId
  );

  if (!selectedLink) return null;

  const handleAddSubLink = () => {
    const newSubLink: SubLink = {
      id: v4(),
      link: "",
      text: `Sub Link ${(selectedLink.subLinks?.length || 0) + 1}`,
      pageId: pageId,
    };

    const updatedLinks = footerContent.links.map((link) =>
      link.id === selectedLinkId
        ? { ...link, subLinks: [...(link.subLinks || []), newSubLink] }
        : link
    );

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedLinks = footerContent.links.map((link) => {
      if (link.id === selectedLinkId) {
        const reorderedSubLinks = Array.from(link.subLinks || []);
        const [movedItem] = reorderedSubLinks.splice(result.source.index, 1);
        reorderedSubLinks.splice(result.destination.index, 0, movedItem);

        return { ...link, subLinks: reorderedSubLinks };
      }
      return link;
    });

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  const handleUpdateLinkItem = (updates: Partial<LinkGroup>) => {
    const updatedLinks = footerContent.links.map((link) =>
      link.id === selectedLinkId ? { ...link, ...updates } : link
    );

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

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
          placeholder="Add Group link text"
          id={selectedLink.id}
          value={selectedLink.text}
          handleUpdate={(e: any) =>
            handleUpdateLinkItem({ text: e.target.value })
          }
        />

        <DraggableList
          label="Link"
          maxItems={10}
          handleDragEnd={handleDragEnd}
          items={selectedLink.subLinks || []}
          handleAdd={handleAddSubLink}
          updateSelectedItem={updateSelectedSubLink}
        />
      </div>
    </div>
  );
}

export default FooterLinkItem;
