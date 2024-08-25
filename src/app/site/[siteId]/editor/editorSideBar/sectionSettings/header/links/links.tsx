import BackBtn from "@/components/shared/backBtn";
import DraggableList from "@/components/ui/DraggableList";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Link } from "@/types/sectionsTypes/header";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
interface LinksProps {
  links: Link[];
  pageId: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenLinkTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function Links({
  links,
  findSelectedSection,
  pageId,
  setOpenLinkTab,
}: LinksProps) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(links);
  const handleAddLink = () => {
    const newItem = {
      id: v4(),
      link: "",
      text: `link ${links.length + 2}`,
      openNewTab: false,
      subLinks: [],
    } as Link;
    const newItems = [...links, newItem] as Link[];
    setItems(newItems);
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        links: newItems,
      })
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { links: newItems })
    );
  };

  useEffect(() => {
    setItems(links || []);
  }, [links]);
  return (
    <div>
      <BackBtn
        label="Links"
        handleBack={() => {
          setOpenLinkTab(false);
        }}
      />
      <div className="px-5 h space-y-2">
        <DraggableList
          label="Link"
          handleDragEnd={handleDragEnd}
          items={links}
          handleAdd={handleAddLink}
          updateSelectedItem={updateSelectedItem}
        />
      </div>
    </div>
  );
}

export default Links;
