import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
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

function CardsSettings() {
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

  const cardsContent =
    findSelectedSection?.content as SectionContentTypes["cards"];
  const cardStyle = findSelectedSection?.style as SectionStyleTypes["cards"];
  const cardItem = selectedItem as Card;

  const handleDeleteCard = () => {
    const filterCards = cardsContent?.cards?.filter(
      (card) => card.id !== cardItem?.id
    );
    dispatch(updateContent(findSelectedSection.id, { cards: filterCards }));
    dispatch(updateSelectedItem(null));
    if (cardsContent.cards.length <= 5) {
      dispatch(
        updateStyle(findSelectedSection?.id!, {
          designSettings: {
            ...cardStyle.designSettings,
            displayType: "grid",
          },
        })
      );
    }
  };

  function updateCardProperty(
    cards: Card[],
    cardId: string | undefined,
    propertyName: keyof Card,
    propertyValue: any
  ) {
    const findCard = cards.find((card) => card.id === cardId);

    if (!findCard) return;

    findCard[propertyName] = propertyValue;
    const newItems = [...cardsContent?.cards];

    return newItems;
  }

  // Inside your component function
  const handlePropertyChange = (
    propertyName: keyof Card,
    propertyValue: any
  ) => {
    const updatedItems = updateCardProperty(
      cardsContent?.cards,
      cardItem?.id,
      propertyName,
      propertyValue
    ) as Card[];

    dispatch(updateContent(findSelectedSection.id, { cards: updatedItems }));
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
            handleUpdate={(e: any) =>
              handlePropertyChange("title", e.target.value)
            }
          />
          <EditText
            label="Text"
            value={cardItem.text}
            handleUpdate={(e: any) =>
              handlePropertyChange("text", e.target.value)
            }
          />
          <EditText
            label="Image"
            value={cardItem.image}
            handleUpdate={(e: any) =>
              handlePropertyChange("image", e.target.value)
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
            selectedColor={cardStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
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
                  updateStyle(findSelectedSection?.id!, {
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
                    updateStyle(findSelectedSection?.id!, {
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
                    updateStyle(findSelectedSection?.id!, {
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
                      updateStyle(findSelectedSection?.id!, {
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
                      updateStyle(findSelectedSection?.id!, {
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
                      updateStyle(findSelectedSection?.id!, {
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
          cardsContent={cardsContent}
          findSelectedSection={findSelectedSection}
          items={cardsContent?.cards}
        />
        <CardsStyleTab
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
