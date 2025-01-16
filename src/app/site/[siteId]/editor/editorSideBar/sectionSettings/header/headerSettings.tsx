import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import HeaderContentTab from "./headerContentTab";
import Links from "./links";
import {
  updateContent,
  updateSelectedItem,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { Link, SubLink as SubLinkType } from "@/types/sectionsTypes/header";
import LinkItem from "./linkItem";
import Announcement from "./announcement";
import Buttons from "./buttons";
import HeaderStyleTab from "./headerStyleTab";
import SubLink from "./subLink";
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
  const { selectedSection, selectedItem, selectedSubLink } = useAppSelector(
    (state) => state.editor.present
  );

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const headerContent =
    findSelectedSection?.content as SectionContentTypes["header"];
  const headerStyle = findSelectedSection?.style as SectionStyleTypes["header"];
  const links = headerContent?.links || [];
  const selectedLink = selectedItem as Link;
  const selectedSubLinkItem = selectedSubLink as SubLinkType;

  const handleDeleteLink = () => {
    const filterLinks = links.filter(
      (link: Link) => link.id !== selectedLink?.id
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, { links: filterLinks })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleDeleteSubLink = () => {
    const filterLinks = selectedLink?.subLinks?.filter(
      (subLink: SubLinkType) => subLink.id !== selectedSubLinkItem?.id
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        links: links.map((link) =>
          link.id === selectedLink?.id
            ? { ...link, subLinks: filterLinks }
            : link
        ),
      })
    );
  };

  const clearLinkItem = () => {
    dispatch(updateSelectedItem(null));
  };

  const clearSubLinkItem = () => {
    dispatch(updateSelectedSubLink(null));
  };

  const handleUpdateSubLinkItem = (field: keyof SubLinkType, value: any) => {
    // Create a new array of links with updated subLinks
    const updatedLinks = headerContent.links.map((link) => {
      if (link.id === selectedLink.id) {
        return {
          ...link,
          subLinks: link.subLinks.map((subLink) =>
            subLink.id === selectedSubLinkItem.id
              ? { ...subLink, [field]: value } // Return a new object for the updated subLink
              : subLink
          ),
        };
      }
      return link;
    });

    // Update the selected subLink and content immutably
    dispatch(updateSelectedSubLink({ ...selectedSubLinkItem, [field]: value }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        links: [...updatedLinks],
      }) // Use spread operator to ensure a new array reference
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

  if (selectedSubLink) {
    return (
      <SubLink
        selectedSubLink={selectedSubLink}
        clearSubLinkItem={clearSubLinkItem}
        handleDeleteSubLink={handleDeleteSubLink}
        handleUpdateSubLinkItem={handleUpdateSubLinkItem}
      />
    );
  }

  if (selectedLink)
    return (
      <LinkItem
        selectedLinkId={selectedLink.id}
        handleDeleteLink={handleDeleteLink}
        clearLinkItem={clearLinkItem}
        sectionId={findSelectedSection.id}
        pageId={pageId}
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
        <HeaderStyleTab
          findSelectedSection={findSelectedSection}
          headerStyle={headerStyle}
          pageId={pageId}
        />
      </Tabs>
    </div>
  );
}

export default HeaderSettings;
