import BackBtn from "@/components/shared/backBtn";
import DraggableList from "@/components/ui/DraggableList";
import { updateGlobalContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { LinkGroup } from "@/types/sectionsTypes/footer";
import { Link } from "@/types/sectionsTypes/header";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
interface LinksProps {
  links: Link[] | LinkGroup[];
  text: string;
  pageId: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenLinkTab: React.Dispatch<React.SetStateAction<boolean>>;
  maxLinks: number;
}
function Links({
  links,
  text,
  findSelectedSection,
  pageId,
  setOpenLinkTab,
  maxLinks,
}: LinksProps) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(links);

  const handleAddLink = () => {
    // Check if we've reached the maximum number of links
    if (maxLinks && links.length >= maxLinks - 1) {
      return; // Don't add more if we've reached the limit
    }

    const newItem = {
      id: v4(),
      link: "",
      text: `${text} ${links.length + 1}`,
      openNewTab: false,
      subLinks: [],
      pageId: pageId,
      externalLink: "",
      linkType: "internal",
    } as Link;
    const newItems = [...links, newItem] as Link[];
    setItems(newItems);
    dispatch(
      updateGlobalContent(findSelectedSection.id, {
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
    dispatch(updateGlobalContent(findSelectedSection.id, { links: newItems }));
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
          maxItems={maxLinks - 1}
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
