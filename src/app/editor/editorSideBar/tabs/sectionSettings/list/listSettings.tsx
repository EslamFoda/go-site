import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEditor, {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/store/editorStore";
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

function ListSettings() {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const {
    selectedSection,
    selectedItem,
    updateContent,
    handleSelectedItem,
    updateStyle,
    editor,
  } = useEditor();
  const findSelectedSection = editor.sections.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const listContent =
    findSelectedSection?.content as SectionContentTypes["list"];
  const listStyle = findSelectedSection?.style as SectionStyleTypes["list"];
  const selectedListItem = selectedItem as ListItem;
  const [chooseIcon, setChooseIcon] = useState(false);
  const [items, setItems] = useState(listContent?.list || []);

  const handleDeleteCard = () => {
    const filterList = items.filter((list) => list.id !== selectedListItem?.id);
    setItems(filterList);
    updateContent(findSelectedSection.id, { list: filterList });
    handleSelectedItem(null);
    if (listContent.list.length <= 5) {
      updateStyle(findSelectedSection?.id!, {
        designSettings: {
          ...listStyle.designSettings,
          displayType: "grid",
        },
      });
    }
  };

  function updateCardProperty(
    list: ListItem[],
    listId: string | undefined,
    propertyName: keyof ListItem,
    propertyValue: any
  ) {
    const findList = list.find((listItem) => listItem.id === listId);

    if (!findList) return;

    findList[propertyName] = propertyValue;
    const newItems = [...items];

    return newItems;
  }

  // Inside your component function
  const handlePropertyChange = (
    propertyName: keyof ListItem,
    propertyValue: any
  ) => {
    const updatedItems = updateCardProperty(
      items,
      selectedListItem?.id,
      propertyName,
      propertyValue
    ) as ListItem[];
    setItems(updatedItems);
    updateContent(findSelectedSection.id, { list: updatedItems });
  };

  if (chooseIcon) {
    return <IconList handlePropertyChange={handlePropertyChange} />;
  }
  if (selectedListItem)
    return (
      <div className="space-y-2">
        <div
          className="flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-muted-bg mb-3"
          onClick={() => {
            handleSelectedItem(null);
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
            value={selectedListItem.title}
            handleUpdate={(e: any) =>
              handlePropertyChange("title", e.target.value)
            }
          />
          <EditText
            label="Text"
            value={selectedListItem.text}
            handleUpdate={(e: any) =>
              handlePropertyChange("text", e.target.value)
            }
          />

          <div
            onClick={() => setChooseIcon(true)}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Icon</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className=" basis-4/5 flex items-center justify-center h-full">
                <ImagePlaceHolder
                  fillColor="fill-muted"
                  width="20"
                  height="20"
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
        <div
          className="flex p-5 items-center gap-4 cursor-pointer border-b-[1px] border-b-muted-bg mb-3"
          onClick={() => {
            setSectionBgOpened(false);
          }}
        >
          <ChevronLeft size={18} />
          <Label>Section Background</Label>
        </div>
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={listStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    sectionBackground: {
                      ...listStyle.designSettings.sectionBackground,
                      color,
                    },
                  },
                });
              } else {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    background: true,
                    border: false,
                    sectionBackground: {
                      ...listStyle.designSettings.sectionBackground,
                      color,
                    },
                  },
                });
              }
            }}
          />
          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        height: "fill",
                        align: "center",
                      },
                    },
                  });
                }}
                className={`${
                  listStyle.designSettings.sectionBackground.height === "fill"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fill
              </div>
              <div
                onClick={() => {
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      sectionBackground: {
                        ...listStyle.designSettings.sectionBackground,
                        height: "fit",
                        align: "center",
                      },
                    },
                  });
                }}
                className={`${
                  listStyle.designSettings.sectionBackground.height === "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {listStyle.designSettings.sectionBackground.height === "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
                          align: "start",
                        },
                      },
                    });
                  }}
                  className={`${
                    listStyle.designSettings.sectionBackground.align === "start"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyStart />
                </div>
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
                          align: "center",
                        },
                      },
                    });
                  }}
                  className={`${
                    listStyle.designSettings.sectionBackground.align ===
                    "center"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyCenter />
                </div>
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
                          align: "end",
                        },
                      },
                    });
                  }}
                  className={`${
                    listStyle.designSettings.sectionBackground.align === "end"
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
        <ListContentTab
          listContent={listContent}
          findSelectedSection={findSelectedSection}
          items={items}
          setItems={setItems}
        />
        {/* <CardsStyleTab
          cardStyle={cardStyle}
          cardsContent={cardsContent}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
        /> */}
      </Tabs>
    </div>
  );
}

export default ListSettings;
