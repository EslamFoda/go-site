import { SubLink } from "@/types/sectionsTypes/header";
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
import ItemBackBtn from "@/components/shared/itemBackBtn";

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
      externalLink: "",
      linkType: "internal",
      openNewTab: false,
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
      <ItemBackBtn
        title={selectedLink.text}
        handleBack={clearLinkItem}
        handleDelete={handleDeleteLink}
      />
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
