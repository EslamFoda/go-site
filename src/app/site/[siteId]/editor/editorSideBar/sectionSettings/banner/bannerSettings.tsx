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
import {
  openChooseBgImage,
  updateContent,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import Buttons from "../header/buttons";
import FormTab from "./bannerContentTab/formTab";
import SpacingTab from "@/components/shared/spacingTab";
import SwitchSetting from "../settingsUi/SwitchSetting";
import ToggleGroup from "../settingsUi/toggleGroup";
import ImageSelector from "@/components/shared/imageSelector";
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
  const { chooseImage, selectedSection, chooseBgImage } = useAppSelector(
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

  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
        selectedImgId={
          bannerStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...bannerStyle.designSettings,
                sectionBackground: {
                  ...bannerStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.urls.regular,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...bannerStyle.designSettings,
                sectionBackground: {
                  ...bannerStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.url,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
      />
    );
  }

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
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
  if (sectionBgOpened)
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
              if (color === "none") {
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
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }
            }}
          />
          <ImageSelector
            imageUrl={
              bannerStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseBgImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...bannerStyle.designSettings,
                    sectionBackground: {
                      ...bannerStyle.designSettings.sectionBackground,
                      media: {
                        imageUrl: "",
                        imageId: "",
                      },
                      textColor: "light",
                    },
                  },
                })
              )
            }
            onBack={() => {}}
            showBackButton={false}
          />
          {bannerStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={bannerStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        textColor: value,
                      },
                    },
                  })
                );
              }}
            />
          )}

          <ToggleGroup
            label="Height"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={bannerStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    sectionBackground: {
                      ...bannerStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {bannerStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={bannerStyle.designSettings.sectionBackground.overlayEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {bannerStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={bannerStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {bannerStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={bannerStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {bannerStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {bannerStyle.designSettings.sectionBackground.color !==
                "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    bannerStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!bannerStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    bannerStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            blur: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              <SwitchSetting
                label="Greyscale"
                defaultChecked={
                  bannerStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          greyScale: value,
                        },
                      },
                    })
                  );
                }}
              />
              <SwitchSetting
                label="Parallax"
                defaultChecked={
                  bannerStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          parallax: value,
                          blur: false,
                          blurEffect: "s",
                        },
                      },
                    })
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    );

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
