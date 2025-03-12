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
  const chooseImage = useAppSelector(
    (state) => state.editor.present.chooseImage
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

  if (chooseImage) {
    return (
      <ChooseImage
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
          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...galleryStyle.designSettings!,
                        sectionBackground: {
                          ...galleryStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  galleryStyle.designSettings.sectionBackground.height ===
                  "fill"
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
                        ...galleryStyle.designSettings!,
                        sectionBackground: {
                          ...galleryStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  galleryStyle.designSettings.sectionBackground.height === "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {galleryStyle.designSettings.sectionBackground.height === "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...galleryStyle.designSettings!,
                          sectionBackground: {
                            ...galleryStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    galleryStyle.designSettings.sectionBackground.align ===
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
                          ...galleryStyle.designSettings!,
                          sectionBackground: {
                            ...galleryStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    galleryStyle.designSettings.sectionBackground.align ===
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
                          ...galleryStyle.designSettings!,
                          sectionBackground: {
                            ...galleryStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    galleryStyle.designSettings.sectionBackground.align ===
                    "end"
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
