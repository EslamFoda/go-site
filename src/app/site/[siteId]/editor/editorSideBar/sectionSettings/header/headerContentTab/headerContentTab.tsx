import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  openChooseImage,
  openHeaderOptions,
  updateGlobalContent,
  updatePageSetting,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  EditorPage,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { HeaderContent } from "@/types/sectionsTypes/header";
import { ArrowUpFromLine, ChevronRightIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import NavigationItem from "@/components/shared/navigationItem";
import ToggleGroup from "../../settingsUi/toggleGroup";
import { ImagePlaceHolder } from "@/icons/common";
interface HeaderContentTabProps {
  pageId: string;
  headerContent: HeaderContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenLinkTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAnnounceTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
  setImageMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}
function HeaderContentTab({
  findSelectedSection,
  headerContent,
  pageId,
  setOpenButtonsTab,
  setOpenLinkTab,
  setOpenAnnounceTab,
  setImageMode,
}: HeaderContentTabProps) {
  const dispatch = useAppDispatch();

  const {
    editor: { pages },
    settings: { homePage },
  } = useAppSelector((state) => state.editor.present);

  const findActivePage =
    pages.find((page) => page.pageId === pageId) ||
    pages.find((page) => page.pageId === homePage);

  const { pageSettings } = findActivePage as EditorPage;

  return (
    <TabsContent className="space-y-2 px-5" value="content">
      <ToggleGroup
        label="Logo"
        options={[
          { value: "text", label: "Text" },
          { value: "image", label: "Image" },
        ]}
        value={headerContent.logo.logoType}
        onValueChange={(value) => {
          dispatch(
            updateGlobalContent(findSelectedSection.id, {
              ...headerContent,
              logo: {
                ...headerContent.logo,
                logoType: value,
              },
            })
          );
        }}
      />
      {headerContent.logo.logoType === "text" && (
        <div className="space-y-1 flex items-center justify-end">
          <Input
            id="logo"
            className="w-4/6"
            placeholder="Your logo"
            value={headerContent?.logo.text}
            onChange={(e: any) => {
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  ...headerContent,
                  logo: {
                    ...headerContent.logo,
                    text: e.target.value,
                  },
                })
              );
            }}
          />
        </div>
      )}
      {headerContent.logo.logoType === "image" && (
        <div className="space-y-2">
          <div
            onClick={() => {
              setImageMode("light");
              dispatch(openChooseImage());
            }}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Light</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className="bg-white basis-4/5 flex items-center justify-center h-full">
                {headerContent.logo.logoImage.urlLight ? (
                  <div
                    className="h-5 w-5"
                    style={{
                      backgroundImage: `url(${headerContent.logo.logoImage.urlLight})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <ImagePlaceHolder
                    fillColor="fill-muted"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              {headerContent.logo.logoImage.urlLight ? (
                <div
                  className=" flex items-center border-s justify-center basis-1/5 h-full "
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      updateGlobalContent(findSelectedSection.id, {
                        ...headerContent,
                        logo: {
                          ...headerContent.logo,
                          logoImage: {
                            ...headerContent.logo.logoImage,
                            urlLight: "",
                            lightImgId: "",
                          },
                        },
                      })
                    );
                  }}
                >
                  <Trash2 className="stroke-destructive" size={16} />
                </div>
              ) : (
                <div className=" flex items-center border-s justify-center basis-1/5 h-full ">
                  <ArrowUpFromLine size={18} />
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setImageMode("dark");
              dispatch(openChooseImage());
            }}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Dark</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className="bg-black basis-4/5 flex items-center justify-center h-full">
                {headerContent.logo.logoImage.urlDark ? (
                  <div
                    className="h-5 w-5"
                    style={{
                      backgroundImage: `url(${headerContent.logo.logoImage.urlDark})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <ImagePlaceHolder
                    fillColor="fill-muted"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              {headerContent.logo.logoImage.urlDark ? (
                <div
                  className=" flex items-center border-s justify-center basis-1/5 h-full "
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      updateGlobalContent(findSelectedSection.id, {
                        ...headerContent,
                        logo: {
                          ...headerContent.logo,
                          logoImage: {
                            ...headerContent.logo.logoImage,
                            urlDark: "",
                            darkImgId: "",
                          },
                        },
                      })
                    );
                  }}
                >
                  <Trash2 className="stroke-destructive" size={16} />
                </div>
              ) : (
                <div className=" flex items-center border-s justify-center basis-1/5 h-full ">
                  <ArrowUpFromLine size={18} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenLinkTab(true);
          }}
        >
          <Label>Links</Label>
          <ChevronRightIcon size={18} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenButtonsTab(true);
          }}
        >
          <Label>Buttons</Label>
          <ChevronRightIcon size={18} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenAnnounceTab(true);
          }}
        >
          <Label>Announcement</Label>
          <ChevronRightIcon size={18} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            dispatch(openHeaderOptions());
          }}
        >
          <Label>Options</Label>
          <ChevronRightIcon size={18} />
        </div>
        <SwitchSetting
          label="Show Header"
          defaultChecked={pageSettings?.showHeader}
          onCheckedChange={(value) => {
            dispatch(
              updatePageSetting(pageId, {
                ...pageSettings,
                showHeader: value,
              })
            );
          }}
        />
      </div>
    </TabsContent>
  );
}

export default HeaderContentTab;
