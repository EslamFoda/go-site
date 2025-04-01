import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpFromLine, ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import validator from "validator";
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
  closeChooseBgImage,
  closeChooseIcon,
  openChooseBgImage,
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
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import LinkSelector from "../settingsUi/LinkSelector";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  const { selectedSection, chooseBgImage, chooseImage, editor } =
    useAppSelector((state) => state.editor.present);
  const { pages } = editor;
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
    const updatedGrid = {
      desktop: Math.min(
        filterList.length,
        listStyle.designSettings.grid.desktop
      ),
      mobile: Math.min(filterList.length, listStyle.designSettings.grid.mobile),
    };

    setTimeout(() => {
      dispatch(
        updateStyle(pageId, findSelectedSection.id, {
          designSettings: {
            ...listStyle.designSettings,
            displayType:
              filterList.length <= 4
                ? "grid"
                : listStyle.designSettings.displayType,
            grid: {
              ...listStyle.designSettings.grid,
              ...updatedGrid,
            },
          },
        })
      );
    }, 600);
    dispatch(updateSelectedItem(null));
  };

  const handleUpdateListItem = (updates: Partial<ListItem>) => {
    const updatedList = listContent.list.map((listItem) =>
      listItem.id === selectedListItem.id
        ? { ...listItem, ...updates }
        : listItem
    );
    dispatch(updateSelectedItem({ ...selectedListItem, ...updates }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        list: updatedList,
      })
    );
  };

  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
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

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={selectedListItem.imageId || ""}
        handleUpdateUnsplash={(image: UnsplashImage) => {
          handleUpdateListItem({
            image: image.urls.regular,
            imageId: image.id,
          });
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          handleUpdateListItem({
            image: image.url,
            imageId: image.id,
          });
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
          handleUpdateListItem({ icon });
        }}
      />
    );
  }
  if (selectedListItem) {
    const ListIcon = getPhosphorIcon(selectedListItem.icon);
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
            inputType="textArea"
            id={selectedListItem.id}
            value={selectedListItem.title}
            handleUpdate={(e: any) =>
              handleUpdateListItem({ title: e.target.value })
            }
          />
          <EditText
            inputType="textArea"
            label="Text"
            placeholder="Add list description"
            id={selectedListItem.id}
            value={selectedListItem.text}
            handleUpdate={(e: any) =>
              handleUpdateListItem({ text: e.target.value })
            }
          />

          {listContent.type === "icon" && (
            <div
              onClick={() => dispatch(openChooseIcon())}
              className="space-y-1 cursor-pointer flex items-center justify-between"
            >
              <Label htmlFor="title">Icon</Label>
              <div className="w-4/6 border flex h-10 border-input rounded-md">
                <div className=" basis-4/5 flex items-center justify-center h-full">
                  {selectedListItem.icon ? (
                    <ListIcon size={18} />
                  ) : (
                    <ImagePlaceHolder
                      fillColor="fill-muted"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                {selectedListItem.icon ? (
                  <div
                    className="flex items-center border-s justify-center basis-1/5 h-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateListItem({ icon: "" });
                    }}
                  >
                    <Trash2 className="stroke-destructive" size={16} />
                  </div>
                ) : (
                  <div className="flex items-center border-s justify-center basis-1/5 h-full">
                    <ArrowUpFromLine size={18} />
                  </div>
                )}
              </div>
            </div>
          )}
          {listContent.type === "image" && (
            <ImageSelector
              imageUrl={selectedListItem.image}
              onImageSelect={() => dispatch(openChooseImage())}
              onImageDelete={() =>
                handleUpdateListItem({ image: "", imageId: "" })
              }
              onBack={() => {}}
              showBackButton={false}
            />
          )}

          <ToggleGroup
            label="Link Type"
            options={[
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
            value={selectedListItem.linkType}
            onValueChange={(value) => {
              handleUpdateListItem({ linkType: value });
            }}
          />
          {selectedListItem.linkType === "internal" && (
            <LinkSelector
              label="Link"
              links={pages.map((page) => ({
                id: page.pageId,
                link: page.pageSettings.link,
              }))}
              selectedLink={selectedListItem.link}
              onSelect={(link) => {
                const findPageWithLink = pages.find(
                  (page) => page.pageSettings.link === link.slice(1)
                );
                handleUpdateListItem({
                  link: link,
                  pageId: findPageWithLink?.pageId || "",
                });
              }}
            />
          )}

          {selectedListItem.linkType === "external" && (
            <div className="flex items-center justify-between space-y-1">
              <Label htmlFor="Link">Link</Label>
              <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
                <div className="flex items-center">
                  <Input
                    value={selectedListItem.externalLink}
                    className="flex-1 border-none outline-none"
                    placeholder="Paste link"
                    onChange={(e) => {
                      handleUpdateListItem({ externalLink: e.target.value });
                    }}
                  />
                </div>

                {validator.isURL(selectedListItem.externalLink) && (
                  <div className="flex h-10 items-center justify-between px-3 py-2">
                    <span>Open in new tab</span>
                    <Switch
                      defaultChecked={selectedListItem.openNewTab}
                      checked={selectedListItem.openNewTab}
                      onCheckedChange={(value) => {
                        handleUpdateListItem({ openNewTab: value });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
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
                        width: "fill",
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
            onImageSelect={() => dispatch(openChooseBgImage())}
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
          {listStyle.designSettings.sectionBackground.color !== "none" && (
            <ToggleGroup
              label="Width"
              options={[
                { value: "fill", label: "Fill" },
                { value: "fit", label: "Fit" },
              ]}
              value={listStyle.designSettings.sectionBackground.width}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        width: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
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
          listStyle={listStyle}
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
