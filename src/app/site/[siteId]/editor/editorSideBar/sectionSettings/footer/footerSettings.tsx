import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateContent,
  updateGlobalContent,
  updateSelectedItem,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { FooterSubLink, LinkGroup } from "@/types/sectionsTypes/footer";
import FooterContentTab from "./footerContentTab";
import Links from "../header/links";
import FooterLinkItem from "./footerLinkItem";
import SubLink from "../header/subLink";
import Buttons from "../header/buttons";
import Social from "./social";
import CopyRight from "./copyRight";
import Text from "./text";
import FooterStyleTab from "./footerStyleTab";

interface FooterSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function FooterSettings({ sections, pageId }: FooterSettingsProps) {
  const [openLinkTab, setOpenLinkTab] = useState(false);
  const [openButtonTab, setOpenButtonsTab] = useState(false);
  const [openSocialTab, setOpenSocialTab] = useState(false);
  const [openCopyRightTab, setOpenCopyRightTab] = useState(false);
  const [openTextTab, setOpenTextTab] = useState(false);
  const [tabValue, setTabValue] = useState("content");
  const dispatch = useAppDispatch();
  const { selectedSection, selectedItem, selectedSubLink } = useAppSelector(
    (state) => state.editor.present
  );

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const footerContent =
    findSelectedSection?.content as SectionContentTypes["footer"];
  const footerStyle = findSelectedSection?.style as SectionStyleTypes["footer"];
  const groupLinks = footerContent?.links || [];
  const selectedLink = selectedItem as LinkGroup;
  const selectedSubLinkItem = selectedSubLink as FooterSubLink;

  const handleDeleteLink = () => {
    const filterLinks = groupLinks.filter(
      (link: LinkGroup) => link.id !== selectedLink?.id
    );

    dispatch(
      updateGlobalContent(findSelectedSection.id, { links: filterLinks })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleDeleteSubLink = () => {
    if (!selectedLink || !selectedSubLinkItem) {
      console.error("No selected link or sublink to delete");
      return;
    }

    const updatedLinks = footerContent.links.map((link) =>
      link.id === selectedLink.id
        ? {
            ...link,
            subLinks: link.subLinks.filter(
              (subLink) => subLink.id !== selectedSubLinkItem.id
            ),
          }
        : link
    );

    dispatch(
      updateGlobalContent(findSelectedSection.id, { links: updatedLinks })
    );
    dispatch(updateSelectedSubLink(null)); // Clear selected sublink
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...footerContent.social];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(updateGlobalContent(findSelectedSection.id, { social: newItems }));
  };

  const clearLinkItem = () => {
    dispatch(updateSelectedItem(null));
  };

  const clearSubLinkItem = () => {
    dispatch(updateSelectedSubLink(null));
  };

  const handleUpdateSubLinkItem = (updates: Partial<FooterSubLink>) => {
    // Create a new array of links with updated subLinks
    const updatedLinks = footerContent.links.map((link) => {
      if (link.id === selectedLink.id) {
        return {
          ...link,
          subLinks: link.subLinks.map((subLink) =>
            subLink.id === selectedSubLinkItem.id
              ? { ...subLink, ...updates } // Return a new object for the updated subLink
              : subLink
          ),
        };
      }
      return link;
    });

    // Update the selected subLink and content immutably
    dispatch(updateSelectedSubLink({ ...selectedSubLinkItem, ...updates }));
    dispatch(
      updateGlobalContent(findSelectedSection.id, {
        links: [...updatedLinks],
      }) // Use spread operator to ensure a new array reference
    );
  };

  if (openTextTab) {
    return (
      <Text
        setOpenTextTab={setOpenTextTab}
        footerContent={footerContent}
        findSelectedSection={findSelectedSection}
      />
    );
  }

  if (openCopyRightTab) {
    return (
      <CopyRight
        setOpenCopyRightTab={setOpenCopyRightTab}
        copyRight={footerContent?.copyRight}
        findSelectedSection={findSelectedSection}
      />
    );
  }

  if (openSocialTab) {
    return (
      <Social
        handleDragEnd={handleDragEnd}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
        footerContent={footerContent}
        setOpenSocialTab={setOpenSocialTab}
      />
    );
  }

  if (openButtonTab)
    return (
      <Buttons
        pageId={pageId}
        setOpenButtonsTab={setOpenButtonsTab}
        findSelectedSection={findSelectedSection}
        content={footerContent}
        type="footer"
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
      <FooterLinkItem
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
        text="group"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        setOpenLinkTab={setOpenLinkTab}
        links={groupLinks}
        maxLinks={7}
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
        <FooterContentTab
          findSelectedSection={findSelectedSection}
          footerContent={footerContent}
          pageId={pageId}
          setOpenLinkTab={setOpenLinkTab}
          setOpenButtonsTab={setOpenButtonsTab}
          setOpenSocialTab={setOpenSocialTab}
          setOpenCopyRightTab={setOpenCopyRightTab}
          setOpenTextTab={setOpenTextTab}
        />

        <FooterStyleTab
          findSelectedSection={findSelectedSection}
          footerStyle={footerStyle}
        />
      </Tabs>
    </div>
  );
}

export default FooterSettings;
