import { Label } from "@/components/ui/label";
import { HeaderContent, Link, SubLink } from "@/types/sectionsTypes/header";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";
import DraggableList from "@/components/ui/DraggableList";
import {
  updateGlobalContent,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { v4 } from "uuid";

interface LinkItemProps {
  selectedLinkId: string;
  pageId: string;
  handleDeleteLink: () => void;
  clearLinkItem: () => void;
  sectionId: string;
}

function LinkItem({
  selectedLinkId,
  pageId,
  sectionId,
  handleDeleteLink,
  clearLinkItem,
}: LinkItemProps) {
  const dispatch = useAppDispatch();
  const { editor, globalSections } = useAppSelector(
    (state) => state.editor.present
  );
  const section = globalSections.find((section) => section.id === sectionId);
  const headerContent = section?.content as HeaderContent;
  const selectedLink = headerContent?.links.find(
    (link) => link.id === selectedLinkId
  );

  if (!selectedLink) return null;

  const handleAddSubLink = () => {
    const newSubLink: SubLink = {
      id: v4(),
      link: "",
      text: `Sub Link ${(selectedLink.subLinks?.length || 0) + 1}`,
      pageId: "",
      externalLink: "",
      linkType: "internal",
      openNewTab: false,
    };

    const updatedLinks = headerContent.links.map((link) =>
      link.id === selectedLinkId
        ? { ...link, subLinks: [...(link.subLinks || []), newSubLink] }
        : link
    );

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedLinks = headerContent.links.map((link) => {
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

  const handleUpdateLinkItem = (updates: Partial<Link>) => {
    const updatedLinks = headerContent.links.map((link) =>
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
          placeholder="Add menu text"
          id={selectedLink.id}
          value={selectedLink.text}
          handleUpdate={(e: any) =>
            handleUpdateLinkItem({ text: e.target.value })
          }
        />
        <LinkSelector
          label="Link"
          links={editor.pages.map((page) => ({
            id: page.pageId,
            link: page.pageSettings.link,
          }))}
          selectedLink={selectedLink.link}
          onSelect={(link) => {
            const findPageWithLink = editor.pages.find(
              (page) => page.pageSettings.link === link.slice(1)
            );
            handleUpdateLinkItem({
              link: link,
              pageId: findPageWithLink?.pageId || "",
            });
          }}
        />

        <DraggableList
          label="Dropdown Link"
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

export default LinkItem;
