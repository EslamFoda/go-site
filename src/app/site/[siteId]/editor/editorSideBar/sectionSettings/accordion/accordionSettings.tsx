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
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import { Accordion } from "@/types/sectionsTypes/accordion/accordion";
import AccordionContentTab from "./accordionContentTab";
import AccordionStyleTab from "./accordionStyleTab";
import BackBtn from "@/components/shared/backBtn";
import SpacingTab from "@/components/shared/spacingTab";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import SwitchSetting from "../settingsUi/SwitchSetting";
import ToggleGroup from "../settingsUi/toggleGroup";
import ImageSelector from "@/components/shared/imageSelector";
interface AccordionSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function AccordionSettings({ pageId, sections }: AccordionSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [openSpacingTab, setOpenSpacingTab] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedSection, chooseImage } = useAppSelector(
    (state) => state.editor.present
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const accordionContent =
    findSelectedSection?.content as SectionContentTypes["accordion"];
  const accordionStyle =
    findSelectedSection?.style as SectionStyleTypes["accordion"];
  const accordionItem = selectedItem as Accordion;

  const handleDeleteAccordion = () => {
    const filterAccordions = accordionContent?.accordions?.filter(
      (card) => card.id !== accordionItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        accordions: filterAccordions,
      })
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
      updateContent(pageId, findSelectedSection.id, {
        accordions: updatedAccordions,
      })
    );
  };

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={
          accordionStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...accordionStyle.designSettings,
                sectionBackground: {
                  ...accordionStyle.designSettings.sectionBackground,
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
                ...accordionStyle.designSettings,
                sectionBackground: {
                  ...accordionStyle.designSettings.sectionBackground,
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
        sectionStyle={accordionStyle}
        setOpenSpacingTab={setOpenSpacingTab}
      />
    );
  }

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
            placeholder="Add accordion title"
            id={accordionItem.id}
            value={accordionItem.title}
            handleUpdate={(e: any) =>
              handleUpdateAccordionItem("title", e.target.value)
            }
          />
          <EditText
            inputType="textArea"
            label="Text"
            placeholder="Add accordion description"
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
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={
              accordionStyle.designSettings.sectionBackground.color
            }
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
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
                      ...accordionStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
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
              accordionStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...accordionStyle.designSettings,
                    sectionBackground: {
                      ...accordionStyle.designSettings.sectionBackground,
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
          {accordionStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={accordionStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
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
            value={accordionStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...accordionStyle.designSettings!,
                    sectionBackground: {
                      ...accordionStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />{" "}
          <ToggleGroup
            label="Width"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={accordionStyle.designSettings.sectionBackground.width}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...accordionStyle.designSettings!,
                    sectionBackground: {
                      ...accordionStyle.designSettings.sectionBackground,
                      width: value,
                    },
                  },
                })
              );
            }}
          />
          {accordionStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={
                accordionStyle.designSettings.sectionBackground.overlayEffect
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {accordionStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={accordionStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {accordionStyle.designSettings.sectionBackground.height ===
            "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={accordionStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      sectionBackground: {
                        ...accordionStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {accordionStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {accordionStyle.designSettings.sectionBackground.color !==
                "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    accordionStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...accordionStyle.designSettings!,
                          sectionBackground: {
                            ...accordionStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!accordionStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    accordionStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...accordionStyle.designSettings!,
                          sectionBackground: {
                            ...accordionStyle.designSettings.sectionBackground,
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
                  accordionStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...accordionStyle.designSettings!,
                        sectionBackground: {
                          ...accordionStyle.designSettings.sectionBackground,
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
                  accordionStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...accordionStyle.designSettings!,
                        sectionBackground: {
                          ...accordionStyle.designSettings.sectionBackground,
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
        <AccordionContentTab
          pageId={pageId}
          accordionContent={accordionContent}
          accordionStyle={accordionStyle}
          findSelectedSection={findSelectedSection}
          items={accordionContent?.accordions}
        />
        <AccordionStyleTab
          pageId={pageId}
          accordionContent={accordionContent}
          accordionStyle={accordionStyle}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default AccordionSettings;
