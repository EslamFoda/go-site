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
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseIcon,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
interface ListSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function ListSettings({ pageId, sections }: ListSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editor.editor);
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
  const selectedItem = useAppSelector((state) => state.editor.selectedItem);
  const chooseIcon = useAppSelector((state) => state.editor.chooseIcon);

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

  if (chooseIcon) {
    return (
      <IconList
        handlePropertyChange={handleUpdateListItem}
        selectedListItem={selectedListItem}
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
            id={selectedListItem.id}
            value={selectedListItem.title}
            handleUpdate={(e: any) =>
              handleUpdateListItem("title", e.target.value)
            }
          />
          <EditText
            inputType="textArea"
            label="Text"
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
          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
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
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...listStyle.designSettings!,
                        sectionBackground: {
                          ...listStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
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
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...listStyle.designSettings!,
                          sectionBackground: {
                            ...listStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
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
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...listStyle.designSettings!,
                          sectionBackground: {
                            ...listStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
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
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...listStyle.designSettings!,
                          sectionBackground: {
                            ...listStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
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
        />
      </Tabs>
    </div>
  );
}

export default ListSettings;
