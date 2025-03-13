import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpFromLine, ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";

import ColorSelector from "../settingsUi/ColorSelector";
import {
  ImagePlaceHolder,
  JustifyCenter,
  JustifyEnd,
  JustifyStart,
} from "@/icons/common";
import { ListItem } from "@/types/sectionsTypes/list";
import ListContentTab from "./listContentTab";
import IconList from "./comps/iconList";
import ListStyleTab from "./listStyleTab";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
  openChooseIcon,
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import SpacingTab from "@/components/shared/spacingTab";
import ImageSelector from "@/components/shared/imageSelector";
import ToggleGroup from "../settingsUi/toggleGroup";
import SwitchSetting from "../settingsUi/SwitchSetting";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
interface ListSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function ListSettings({ pageId, sections }: ListSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [openSpacingTab, setOpenSpacingTab] = useState(false);
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedSection, chooseImage } = useAppSelector(
    (state) => state.editor.present
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const chooseIcon = useAppSelector((state) => state.editor.present.chooseIcon);

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const listContent =
    findSelectedSection?.content as SectionContentTypes["list"];
  const listStyle = findSelectedSection?.style as SectionStyleTypes["list"];
  const selectedListItem = selectedItem as ListItem;

  const [items, setItems] = useState(listContent?.list || []);

  useEffect(() => {
    setItems(listContent?.list || []);
  }, [listContent?.list]);

  const handleDeleteCard = () => {
    const filterList = items.filter((list) => list.id !== selectedListItem?.id);
    setItems(filterList);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { list: filterList })
    );
    dispatch(updateSelectedItem(null));
    if (listContent.list.length <= 5) {
      dispatch(
        updateStyle(pageId, findSelectedSection?.id!, {
          designSettings: {
            ...listStyle.designSettings,
            displayType: "grid",
          },
        })
      );
    }
  };

  const handleUpdateListItem = (field: keyof ListItem, value: any) => {
    const updatedList = listContent.list.map((listItem) =>
      listItem.id === selectedListItem.id
        ? { ...listItem, [field]: value }
        : listItem
    );
    dispatch(updateSelectedItem({ ...selectedListItem, [field]: value }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, { list: updatedList })
    );
  };

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={
          listStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...listStyle.designSettings,
                sectionBackground: {
                  ...listStyle.designSettings.sectionBackground,
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
                ...listStyle.designSettings,
                sectionBackground: {
                  ...listStyle.designSettings.sectionBackground,
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

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={listStyle}
        setOpenSpacingTab={setOpenSpacingTab}
        showPadding
      />
    );
  }

  if (chooseIcon) {
    return (
      <IconList
        icon={selectedListItem.icon}
        handleBack={() => dispatch(closeChooseIcon())}
        handlePropertyChange={(icon: string) => {
          handleUpdateListItem("icon", icon);
        }}
      />
    );
  }
  if (selectedListItem)
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
            <Label className="cursor-pointer">{selectedListItem.title}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteCard}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 space-y-2">
          <EditText
            label="Title"
            placeholder="Add list title"
            id={selectedListItem.id}
            value={selectedListItem.title}
            handleUpdate={(e: any) =>
              handleUpdateListItem("title", e.target.value)
            }
          />
          <EditText
            inputType="textArea"
            label="Text"
            placeholder="Add list description"
            id={selectedListItem.id}
            value={selectedListItem.text}
            handleUpdate={(e: any) =>
              handleUpdateListItem("text", e.target.value)
            }
          />

          <div
            onClick={() => dispatch(openChooseIcon())}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Icon</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className=" basis-4/5 flex items-center justify-center h-full">
                <ImagePlaceHolder
                  fillColor="fill-muted"
                  width={20}
                  height={20}
                />
              </div>
              <div className=" flex items-center border-s justify-center basis-1/5 h-full ">
                <ArrowUpFromLine size="18px" />
              </div>
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
            selectedColor={listStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }
            }}
          />
          <ImageSelector
            imageUrl={listStyle.designSettings.sectionBackground.media.imageUrl}
            onImageSelect={() => dispatch(openChooseImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...listStyle.designSettings,
                    sectionBackground: {
                      ...listStyle.designSettings.sectionBackground,
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
          {listStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={listStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
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
            value={listStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    sectionBackground: {
                      ...listStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {listStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={listStyle.designSettings.sectionBackground.overlayEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {listStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={listStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {listStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={listStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {listStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {listStyle.designSettings.sectionBackground.color !== "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    listStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...listStyle.designSettings!,
                          sectionBackground: {
                            ...listStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!listStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    listStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...listStyle.designSettings!,
                          sectionBackground: {
                            ...listStyle.designSettings.sectionBackground,
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
                  listStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
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
                  listStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
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
        <ListContentTab
          pageId={pageId}
          listContent={listContent}
          findSelectedSection={findSelectedSection}
          items={items}
          setItems={setItems}
        />
        <ListStyleTab
          pageId={pageId}
          listStyle={listStyle}
          listContent={listContent}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default ListSettings;
