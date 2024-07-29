import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import ColorSelector from "../settingsUi/ColorSelector";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import { Accordion } from "@/types/sectionsTypes/accordion";
import AccordionContentTab from "./accordionContentTab";
import AccordionStyleTab from "./accordionStyleTab";
import { Textarea } from "@/components/ui/textarea";

function AccordionSettings() {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);

  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editor.editor);
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
  const selectedItem = useAppSelector((state) => state.editor.selectedItem);
  const findSelectedSection = editor.sections.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const accordionContent =
    findSelectedSection?.content as SectionContentTypes["accordion"];
  const AccordionStyle =
    findSelectedSection?.style as SectionStyleTypes["accordion"];
  const accordionItem = selectedItem as Accordion;

  const handleDeleteAccordion = () => {
    const filterAccordions = accordionContent?.accordions?.filter(
      (card) => card.id !== accordionItem?.id
    );
    dispatch(
      updateContent(findSelectedSection.id, { accordions: filterAccordions })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleUpdateAccordionItem = (field: keyof Accordion, value: any) => {
    const updatedAccordions = accordionContent.accordions.map((accordion) =>
      accordion.id === accordionItem.id
        ? { ...accordion, [field]: value }
        : accordion
    );
    dispatch(updateSelectedItem({ ...accordionItem, [field]: value }));
    dispatch(
      updateContent(findSelectedSection.id, { accordions: updatedAccordions })
    );
  };

  if (accordionItem)
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
            <Label className="cursor-pointer">{accordionItem.title}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteAccordion}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 pb-1 space-y-2">
          <EditText
            label="Title"
            id={accordionItem.id}
            value={accordionItem.title}
            handleUpdate={(e: any) =>
              handleUpdateAccordionItem("title", e.target.value)
            }
          />
          <EditText
            inputType="textArea"
            label="Text"
            id={accordionItem.id}
            value={accordionItem.text}
            handleUpdate={(e: any) =>
              handleUpdateAccordionItem("text", e.target.value)
            }
          />
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
            selectedColor={
              AccordionStyle.designSettings.sectionBackground.color
            }
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...AccordionStyle.designSettings!,
                      sectionBackground: {
                        ...AccordionStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...AccordionStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...AccordionStyle.designSettings.sectionBackground,
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
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...AccordionStyle.designSettings!,
                        sectionBackground: {
                          ...AccordionStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  AccordionStyle.designSettings.sectionBackground.height ===
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
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...AccordionStyle.designSettings!,
                        sectionBackground: {
                          ...AccordionStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  AccordionStyle.designSettings.sectionBackground.height ===
                  "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {AccordionStyle.designSettings.sectionBackground.height ===
            "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...AccordionStyle.designSettings!,
                          sectionBackground: {
                            ...AccordionStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    AccordionStyle.designSettings.sectionBackground.align ===
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
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...AccordionStyle.designSettings!,
                          sectionBackground: {
                            ...AccordionStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    AccordionStyle.designSettings.sectionBackground.align ===
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
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...AccordionStyle.designSettings!,
                          sectionBackground: {
                            ...AccordionStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    AccordionStyle.designSettings.sectionBackground.align ===
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
        <AccordionContentTab
          accordionContent={accordionContent}
          findSelectedSection={findSelectedSection}
          items={accordionContent?.accordions}
        />
        <AccordionStyleTab
          accordionContent={accordionContent}
          accordionStyle={AccordionStyle}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
        />
      </Tabs>
    </div>
  );
}

export default AccordionSettings;
