import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import HeaderContentTab from "./headerContentTab";
import Links from "./links";
import {
  updateGlobalContent,
  updateSelectedItem,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { Link, SubLink as SubLinkType } from "@/types/sectionsTypes/header";
import LinkItem from "./linkItem";
import Announcement from "./announcement";
import Buttons from "./buttons";
import HeaderStyleTab from "./headerStyleTab";
import SubLink from "./subLink";
import Options from "./options";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import LogoSettings from "./logoSettings";
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
  const [imageMode, setImageMode] = useState<"light" | "dark">("light");
  const dispatch = useAppDispatch();
  const {
    selectedSection,
    selectedItem,
    selectedSubLink,
    openHeaderOptions,
    chooseImage,
    openLogoSettings,
  } = useAppSelector((state) => state.editor.present);

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
      updateGlobalContent(findSelectedSection.id, { links: filterLinks })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleDeleteSubLink = () => {
    if (!selectedLink || !selectedSubLinkItem) {
      console.error("No selected link or sublink to delete");
      return;
    }

    const updatedLinks = headerContent.links.map((link) =>
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

  const clearLinkItem = () => {
    dispatch(updateSelectedItem(null));
  };

  const clearSubLinkItem = () => {
    dispatch(updateSelectedSubLink(null));
  };

  const handleUpdateSubLinkItem = (updates: Partial<SubLinkType>) => {
    // Create a new array of links with updated subLinks
    const updatedLinks = headerContent.links.map((link) => {
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

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={
          imageMode === "dark"
            ? headerContent.logo?.logoImage?.darkImgId
            : headerContent.logo?.logoImage?.lightImgId
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          if (imageMode === "dark") {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                logo: {
                  ...headerContent.logo,
                  logoImage: {
                    ...headerContent.logo?.logoImage,
                    darkImgId: image.id,
                    urlDark: image.urls.regular,
                  },
                },
              })
            );
          } else {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                logo: {
                  ...headerContent.logo,
                  logoImage: {
                    ...headerContent.logo?.logoImage,
                    lightImgId: image.id,
                    urlLight: image.urls.regular,
                  },
                },
              })
            );
          }
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          if (imageMode === "dark") {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                logo: {
                  ...headerContent.logo,
                  logoImage: {
                    ...headerContent.logo?.logoImage,
                    darkImgId: image.id,
                    urlDark: image.url,
                  },
                },
              })
            );
          } else {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                logo: {
                  ...headerContent.logo,
                  logoImage: {
                    ...headerContent.logo?.logoImage,
                    lightImgId: image.id,
                    urlLight: image.url,
                  },
                },
              })
            );
          }
        }}
      />
    );
  }

  if (openHeaderOptions) {
    return (
      <Options
        headerContent={headerContent}
        findSelectedSection={findSelectedSection}
      />
    );
  }

  if (openButtonTab)
    return (
      <Buttons
        setOpenButtonsTab={setOpenButtonsTab}
        findSelectedSection={findSelectedSection}
        content={headerContent}
        pageId={pageId}
        type="header"
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

  if (openLogoSettings) {
    return (
      <LogoSettings
        headerContent={headerContent}
        findSelectedSection={findSelectedSection}
      />
    );
  }

  if (openLinkTab) {
    return (
      <Links
        linksType="header"
        text="link"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        setOpenLinkTab={setOpenLinkTab}
        links={links}
        maxLinks={10}
      />
    );
  }

  if (openAnnounceTab) {
    return (
      <Announcement
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
          pageId={pageId}
          headerContent={headerContent}
          findSelectedSection={findSelectedSection}
          setOpenButtonsTab={setOpenButtonsTab}
          setOpenLinkTab={setOpenLinkTab}
          setOpenAnnounceTab={setOpenAnnounceTab}
          setImageMode={setImageMode}
        />
        <HeaderStyleTab
          findSelectedSection={findSelectedSection}
          headerStyle={headerStyle}
          headerContent={headerContent}
        />
      </Tabs>
    </div>
  );
}

export default HeaderSettings;
