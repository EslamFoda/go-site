import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import ColorSelector from "../settingsUi/ColorSelector";
import BannerContentTab from "./bannerContentTab";
import BannerStyleTab from "./bannerStyleTab";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateContent, updateStyle } from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import Buttons from "../header/buttons";
import FormTab from "./bannerContentTab/formTab";
import SpacingTab from "@/components/shared/spacingTab";
interface BannerSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function BannerSettings({ sections, pageId }: BannerSettingsProps) {
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [openSpacingTab, setOpenSpacingTab] = useState(false);
  const [tabValue, setTabValue] = useState("content");
  const [openButtonsTab, setOpenButtonsTab] = useState(false);
  const [openFormTab, setOpenFormTab] = useState(false);
  const dispatch = useAppDispatch();
  const { chooseImage, selectedSection } = useAppSelector(
    (state) => state.editor.present
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const bannerContent =
    findSelectedSection?.content as SectionContentTypes["banner"];
  const bannerStyle = findSelectedSection?.style as SectionStyleTypes["banner"];

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="banner"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={bannerStyle}
        setOpenSpacingTab={setOpenSpacingTab}
      />
    );
  }

  if (openFormTab) {
    return (
      <FormTab
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        bannerContent={bannerContent}
        setOpenFormTab={setOpenFormTab}
      />
    );
  }

  if (openButtonsTab) {
    return (
      <Buttons
        setOpenButtonsTab={setOpenButtonsTab}
        findSelectedSection={findSelectedSection}
        content={bannerContent}
        pageId={pageId}
        type="banner"
      />
    );
  }

  if (chooseImage) {
    return (
      <ChooseImage
        selectedImgId={bannerContent?.imageSetting?.id || ""}
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              imageSetting: {
                imageUrl: image.urls.regular,
                altText: "banner image",
                id: image.id,
              },
            })
          );
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              imageSetting: {
                imageUrl: image.url,
                altText: "banner image",
                id: image.id,
              },
            })
          );
        }}
      />
    );
  }
  if (sectionBgOpened) {
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={bannerStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    sectionBackground: {
                      ...bannerStyle.designSettings.sectionBackground,
                      color,
                    },
                  },
                })
              );
            }}
          />

          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  bannerStyle.designSettings.sectionBackground.height === "fill"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fill
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  bannerStyle.designSettings.sectionBackground.height === "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {bannerStyle.designSettings.sectionBackground.height === "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.align ===
                    "start"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyStart />
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.align ===
                    "center"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyCenter />
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.align === "end"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyEnd />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        <BannerContentTab
          pageId={pageId}
          bannerContent={bannerContent}
          bannerStyle={bannerStyle}
          findSelectedSection={findSelectedSection}
          setOpenButtonsTab={setOpenButtonsTab}
          setOpenFormTab={setOpenFormTab}
        />
        <BannerStyleTab
          pageId={pageId}
          bannerContent={bannerContent}
          bannerStyle={bannerStyle}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default BannerSettings;
