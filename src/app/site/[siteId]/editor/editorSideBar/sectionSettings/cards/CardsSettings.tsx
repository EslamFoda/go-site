import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import { Card } from "@/types/sectionsTypes/cards";
import CardContentTab from "./cardContentTab";
import CardsStyleTab from "./cardsStyleTab";
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
import BackBtn from "@/components/shared/backBtn";
interface CardsSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function CardsSettings({ pageId, sections }: CardsSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);

  const dispatch = useAppDispatch();
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const cardsContent =
    findSelectedSection?.content as SectionContentTypes["cards"];
  const cardStyle = findSelectedSection?.style as SectionStyleTypes["cards"];
  const cardItem = selectedItem as Card;

  const handleDeleteCard = () => {
    const filterCards = cardsContent?.cards?.filter(
      (card) => card.id !== cardItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: filterCards })
    );
    dispatch(updateSelectedItem(null));
    if (cardsContent.cards.length <= 5) {
      dispatch(
        updateStyle(pageId, findSelectedSection?.id!, {
          designSettings: {
            ...cardStyle.designSettings,
            displayType: "grid",
          },
        })
      );
    }
  };

  const handleUpdateCardItem = (field: keyof Card, value: any) => {
    const updatedCards = cardsContent.cards.map((card) =>
      card.id === cardItem.id ? { ...card, [field]: value } : card
    );
    dispatch(updateSelectedItem({ ...cardItem, [field]: value }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: updatedCards })
    );
  };

  if (cardItem)
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
            <Label className="cursor-pointer">{cardItem.title}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteCard}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 space-y-2">
          <EditText
            label="Title"
            value={cardItem.title}
            id={cardItem.id}
            handleUpdate={(e: any) =>
              handleUpdateCardItem("title", e.target.value)
            }
          />
          <EditText
            id={cardItem.id}
            inputType="textArea"
            label="Text"
            value={cardItem.text}
            handleUpdate={(e: any) =>
              handleUpdateCardItem("text", e.target.value)
            }
          />
          <EditText
            id={cardItem.id}
            label="Image"
            value={cardItem.image}
            handleUpdate={(e: any) =>
              handleUpdateCardItem("image", e.target.value)
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
            selectedColor={cardStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      cardBackground: true,
                      cardBorder: false,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
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
                        ...cardStyle.designSettings!,
                        sectionBackground: {
                          ...cardStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  cardStyle.designSettings.sectionBackground.height === "fill"
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
                        ...cardStyle.designSettings!,
                        sectionBackground: {
                          ...cardStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  cardStyle.designSettings.sectionBackground.height === "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {cardStyle.designSettings.sectionBackground.height === "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...cardStyle.designSettings!,
                          sectionBackground: {
                            ...cardStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    cardStyle.designSettings.sectionBackground.align === "start"
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
                          ...cardStyle.designSettings!,
                          sectionBackground: {
                            ...cardStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    cardStyle.designSettings.sectionBackground.align ===
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
                          ...cardStyle.designSettings!,
                          sectionBackground: {
                            ...cardStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    cardStyle.designSettings.sectionBackground.align === "end"
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
        <CardContentTab
          pageId={pageId}
          cardsContent={cardsContent}
          findSelectedSection={findSelectedSection}
          items={cardsContent?.cards}
        />
        <CardsStyleTab
          pageId={pageId}
          cardStyle={cardStyle}
          cardsContent={cardsContent}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
        />
      </Tabs>
    </div>
  );
}

export default CardsSettings;
