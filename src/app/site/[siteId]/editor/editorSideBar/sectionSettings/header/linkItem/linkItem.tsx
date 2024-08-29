import { Label } from "@/components/ui/label";
import { HeaderContent, Link, SubLink } from "@/types/sectionsTypes/header";
import { ChevronLeft, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditText from "../../settingsUi/EditText";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";
import DraggableList from "@/components/ui/DraggableList";
import {
  updateContent,
  updateSelectedItem,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { v4 } from "uuid";

interface LinkItemProps {
  selectedLink: Link;
  pageId: string;
  handleDeleteLink: () => void;
  clearLinkItem: () => void;
  handleUpdateLinkItem: (field: keyof Link, value: any) => void;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

function LinkItem({
  selectedLink,
  findSelectedSection,
  pageId,
  handleDeleteLink,
  clearLinkItem,
  handleUpdateLinkItem,
}: LinkItemProps) {
  const {
    editor: { pages },
  } = useAppSelector((state) => state.editor);
  const [items, setItems] = useState<SubLink[]>(selectedLink.subLinks || []);

  const dispatch = useAppDispatch();
  const headerContent = findSelectedSection.content as HeaderContent;

  const handleAddSubLink = () => {
    const newItem = {
      id: v4(),
      link: "",
      text: `Sub Link ${items.length + 1}`,
      openNewTab: false,
    } as Link;

    const newItems = [...items, newItem];
    setItems(newItems); // Update the local state

    // Update the selected link's subLinks
    const updatedLinks = headerContent.links.map((link) => {
      if (link.id === selectedLink.id) {
        return {
          ...link,
          subLinks: items, // Use the updated items with the new sublink added
        };
      }
      return link;
    });

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        links: updatedLinks,
      })
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems); // Update the local state

    const updatedLinks = headerContent.links.map((link) => {
      if (link.id === selectedLink.id) {
        return {
          ...link,
          subLinks: reorderedItems, // Use the reordered items
        };
      }
      return link;
    });

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        links: updatedLinks,
      })
    );
  };

  useEffect(() => {
    setItems(selectedLink.subLinks || []);
  }, [selectedLink.subLinks]);

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

        <DraggableList
          label="Dropdown Link"
          maxItems={10}
          handleDragEnd={handleDragEnd}
          items={selectedLink.subLinks} // Use the local state items
          handleAdd={handleAddSubLink}
          updateSelectedItem={updateSelectedSubLink}
        />
      </div>
    </div>
  );
}

export default LinkItem;
