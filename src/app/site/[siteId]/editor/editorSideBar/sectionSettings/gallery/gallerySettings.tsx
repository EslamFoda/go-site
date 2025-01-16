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

interface GallerySettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function GallerySettings({ pageId, sections }: GallerySettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);

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

  if (chooseImage) {
    return (
      <ChooseImage
        selectedImgId={photoItem?.imgId}
        handleUpdate={(image: UnsplashImage) => {
          handleUpdatePhoto({
            imgId: image.id,
            url: image.urls.regular,
          });
        }}
      />
    );
  }

  if (photoItem)
    return (
      <div className="space-y-2">
        <div
          className="flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-muted-bg mb-3"
          onClick={() => {
            dispatch(updateSelectedItem(null));
          }}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <ChevronLeft size={18} />
            <Label className="cursor-pointer">Media</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeletePhoto}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 pb-1 space-y-2">
          <div
            onClick={() => dispatch(openChooseImage())}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Image</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className=" basis-4/5 flex items-center justify-center h-full">
                {photoItem.url ? (
                  <div
                    className="h-5 w-5"
                    style={{
                      backgroundImage: `url(${photoItem.url})`,
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
              {photoItem.url ? (
                <div
                  className=" flex items-center border-s justify-center basis-1/5 h-full "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdatePhoto({
                      imgId: "",
                      url: undefined,
                    });
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
        />
      </Tabs>
    </div>
  );
}

export default GallerySettings;
