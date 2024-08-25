import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import HeaderContentTab from "./headerContentTab";
import HeaderStyleTab from "./headerStyleTab";
import Links from "./links";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { Link } from "@/types/sectionsTypes/header";
import LinkItem from "./linkItem";
import Announcement from "./announcement";
import Buttons from "./buttons";
interface HeaderSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function HeaderSettings({ sections, pageId }: HeaderSettingsProps) {
  const [openLinkTab, setOpenLinkTab] = useState(false);
  const [openAnnounceTab, setOpenAnnounceTab] = useState(false);
  const [openButtonTab, setOpenButtonsTab] = useState(false);
  const [tabValue, setTabValue] = useState("content");
  const dispatch = useAppDispatch();
  const { selectedSection, selectedItem } = useAppSelector(
    (state) => state.editor
  );

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const headerContent =
    findSelectedSection?.content as SectionContentTypes["header"];
  const headerStyle = findSelectedSection?.style as SectionStyleTypes["header"];
  const links = headerContent?.links || [];
  const selectedLink = selectedItem as Link;

  const handleDeleteLink = () => {
    const filterLinks = links.filter(
      (link: Link) => link.id !== selectedLink?.id
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, { links: filterLinks })
    );
    dispatch(updateSelectedItem(null));
  };

  const clearLinkItem = () => {
    dispatch(updateSelectedItem(null));
  };

  const handleUpdateLinkItem = (field: keyof Link, value: any) => {
    const updatedLinks = links.map((linkItem) =>
      linkItem.id === selectedLink.id
        ? { ...linkItem, [field]: value }
        : linkItem
    );
    dispatch(updateSelectedItem({ ...selectedLink, [field]: value }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, { links: updatedLinks })
    );
  };

  if (openButtonTab)
    return (
      <Buttons
        pageId={pageId}
        setOpenButtonsTab={setOpenButtonsTab}
        findSelectedSection={findSelectedSection}
      />
    );

  if (selectedLink)
    return (
      <LinkItem
        selectedLink={selectedLink}
        handleDeleteLink={handleDeleteLink}
        clearLinkItem={clearLinkItem}
        handleUpdateLinkItem={handleUpdateLinkItem}
      />
    );

  if (openLinkTab) {
    return (
      <Links
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        setOpenLinkTab={setOpenLinkTab}
        links={links}
      />
    );
  }

  if (openAnnounceTab) {
    return (
      <Announcement
        pageId={pageId}
        setOpenAnnounceTab={setOpenAnnounceTab}
        findSelectedSection={findSelectedSection}
      />
    );
  }

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
        </TabsList>
        <HeaderContentTab
          setOpenButtonsTab={setOpenButtonsTab}
          setOpenLinkTab={setOpenLinkTab}
          setOpenAnnounceTab={setOpenAnnounceTab}
          pageId={pageId}
          headerContent={headerContent}
          findSelectedSection={findSelectedSection}
        />
        <HeaderStyleTab />
      </Tabs>
    </div>
  );
}

export default HeaderSettings;
