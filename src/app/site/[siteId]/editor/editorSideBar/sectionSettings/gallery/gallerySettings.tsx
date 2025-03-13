import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpFromLine, ChevronLeft, Trash2 } from "lucide-react";
import ColorSelector from "../settingsUi/ColorSelector";
import {
  ImagePlaceHolder,
  JustifyCenter,
  JustifyEnd,
  JustifyStart,
} from "@/icons/common";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseBgImage,
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import { Photo } from "@/types/sectionsTypes/gallery";
import GalleryContentTab from "./galleryContentTab";
import ChooseImage from "./chooseImage";
import GalleryStyleTab from "./galleryStyleTab";
import { UnsplashImage } from "@/types/common";
import ImageSelector from "@/components/shared/imageSelector";
import SpacingTab from "@/components/shared/spacingTab";
import ToggleGroup from "../settingsUi/toggleGroup";
import SwitchSetting from "../settingsUi/SwitchSetting";

interface GallerySettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function GallerySettings({ pageId, sections }: GallerySettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [openSpacingTab, setOpenSpacingTab] = useState(false);

  const dispatch = useAppDispatch();
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const { chooseImage, chooseBgImage } = useAppSelector(
    (state) => state.editor.present
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const galleryContent =
    findSelectedSection?.content as SectionContentTypes["gallery"];
  const galleryStyle =
    findSelectedSection?.style as SectionStyleTypes["gallery"];
  const photoItem = selectedItem as Photo;

  const handleDeletePhoto = () => {
    const filterPhotos = galleryContent?.photos?.filter(
      (photo) => photo.id !== photoItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        photos: filterPhotos,
      })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleUpdatePhoto = (updates: Partial<Photo>) => {
    const updatedPhotos = galleryContent.photos.map((photo) =>
      photo.id === photoItem.id ? { ...photo, ...updates } : photo
    );
    dispatch(updateSelectedItem({ ...photoItem, ...updates }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        photos: updatedPhotos,
      })
    );
  };

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={galleryStyle}
        setOpenSpacingTab={setOpenSpacingTab}
      />
    );
  }

  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
        selectedImgId={
          galleryStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...galleryStyle.designSettings,
                sectionBackground: {
                  ...galleryStyle.designSettings.sectionBackground,
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
                ...galleryStyle.designSettings,
                sectionBackground: {
                  ...galleryStyle.designSettings.sectionBackground,
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
        selectedImgId={photoItem?.imgId}
        handleUpdateUnsplash={(image: UnsplashImage) => {
          handleUpdatePhoto({
            imgId: image.id,
            url: image.urls.regular,
          });
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          handleUpdatePhoto({ imgId: image.id, url: image.url });
        }}
      />
    );
  }

  if (photoItem)
    return (
      <div className="px-5">
        <ImageSelector
          imageUrl={photoItem.url}
          onImageSelect={() => dispatch(openChooseImage())}
          onImageDelete={handleDeletePhoto}
          onBack={() => dispatch(updateSelectedItem(null))}
          showBackButton={true}
        />
      </div>
    );

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={galleryStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
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
              galleryStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseBgImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...galleryStyle.designSettings,
                    sectionBackground: {
                      ...galleryStyle.designSettings.sectionBackground,
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
          {galleryStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={galleryStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
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
            value={galleryStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...galleryStyle.designSettings!,
                    sectionBackground: {
                      ...galleryStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {galleryStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={
                galleryStyle.designSettings.sectionBackground.overlayEffect
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {galleryStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={galleryStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {galleryStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={galleryStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...galleryStyle.designSettings!,
                      sectionBackground: {
                        ...galleryStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {galleryStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {galleryStyle.designSettings.sectionBackground.color !==
                "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    galleryStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...galleryStyle.designSettings!,
                          sectionBackground: {
                            ...galleryStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!galleryStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    galleryStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...galleryStyle.designSettings!,
                          sectionBackground: {
                            ...galleryStyle.designSettings.sectionBackground,
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
                  galleryStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...galleryStyle.designSettings!,
                        sectionBackground: {
                          ...galleryStyle.designSettings.sectionBackground,
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
                  galleryStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...galleryStyle.designSettings!,
                        sectionBackground: {
                          ...galleryStyle.designSettings.sectionBackground,
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
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
        </TabsList>
        <GalleryContentTab
          findSelectedSection={findSelectedSection}
          galleryContent={galleryContent}
          items={galleryContent?.photos || []}
          pageId={pageId}
        />
        <GalleryStyleTab
          findSelectedSection={findSelectedSection}
          galleryContent={galleryContent}
          galleryStyle={galleryStyle}
          pageId={pageId}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default GallerySettings;
