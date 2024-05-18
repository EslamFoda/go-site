import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useEditor, {
  Card,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/app/editor/store/editorStore";
import DraggableList from "@/components/ui/DraggableList";
import { v4 } from "uuid";
import { ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import { FirstDesign, SecDesign } from "@/icons/cards";
import LayoutSetting from "../settingsUi/LayoutSetting";
import GridSetting from "../settingsUi/GridSetting";
import TextSize from "../settingsUi/TextSize";
import Align from "../settingsUi/Align";
import SwitchSetting from "../settingsUi/SwitchSetting";
import DisplaySettings from "../settingsUi/DisplaySettings";
import HeightOrWidthSetting from "../settingsUi/HeightOrWidthSetting";
import WidthOrHeight from "../settingsUi/WidthOrHeight";

const CARD_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
];

function CardsSettings() {
  const [tabValue, setTabValue] = useState("content");
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHeightDesktop, setIsHeightDesktop] = useState(true);
  const [isCardSliderWidthDesktop, setIsCardSliderWidthDesktop] =
    useState(true);
  const handleToggleHeightSetting = () => {
    setIsHeightDesktop(!isHeightDesktop);
  };
  const handleToggleGridSetting = () => {
    setIsDesktop(!isDesktop);
  };
  const handleToggleCardSliderWidthSetting = () => {
    setIsCardSliderWidthDesktop(!isCardSliderWidthDesktop);
  };
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

  const cardsContent =
    findSelectedSection?.content as SectionContentTypes["cards"];
  const cardStyle = findSelectedSection?.style as SectionStyleTypes["cards"];

  const [items, setItems] = useState(cardsContent?.cards || []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    updateContent(findSelectedSection.id, { cards: newItems });
  };

  const handleAddCard = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
      image: "",
      button: "",
      buttonColor: "gray" || "primary",
      link: "",
    };
    const newItems = [...items, newItem] as Card[];
    setItems(newItems);
    updateContent(findSelectedSection.id, { cards: newItems });
  };

  const handleDeleteCard = () => {
    const filterCards = items.filter((card) => card.id !== selectedItem?.id);
    setItems(filterCards);
    updateContent(findSelectedSection.id, { cards: filterCards });
    handleSelectedItem(null);
    if (cardsContent.cards.length <= 5) {
      updateStyle(findSelectedSection?.id!, {
        designSettings: {
          ...cardStyle.designSettings,
          displayType: "grid",
        },
      });
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
    const newItems = [...items];

    return newItems;
  }

  // Inside your component function
  const handlePropertyChange = (
    propertyName: keyof Card,
    propertyValue: any
  ) => {
    const updatedItems = updateCardProperty(
      items,
      selectedItem?.id,
      propertyName,
      propertyValue
    ) as Card[];
    setItems(updatedItems);
    updateContent(findSelectedSection.id, { cards: updatedItems });
  };

  if (selectedItem)
    return (
      <div className="space-y-2">
        <div
          className="flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-[#222] mb-3"
          onClick={() => {
            handleSelectedItem(null);
          }}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <ChevronLeft size={18} />
            <Label className="cursor-pointer">{selectedItem.title}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteCard}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 space-y-2">
          <EditText
            label="Title"
            value={selectedItem.title}
            handleUpdate={(e: any) =>
              handlePropertyChange("title", e.target.value)
            }
          />
          <EditText
            label="Text"
            value={selectedItem.text}
            handleUpdate={(e: any) =>
              handlePropertyChange("text", e.target.value)
            }
          />
          <EditText
            label="Image"
            value={selectedItem.image}
            handleUpdate={(e: any) =>
              handlePropertyChange("image", e.target.value)
            }
          />
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
        <TabsContent className="px-5 h space-y-2" value="content">
          <div className="space-y-1 flex items-center justify-between">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              className="w-4/6"
              value={findSelectedSection?.content?.label}
              onChange={(e: any) => {
                console.log(e.target.value);
                // @ts-ignore
                updateContent(findSelectedSection.id, {
                  label: e.target.value,
                });
              }}
            />
          </div>
          <div className="space-y-1 flex items-center justify-between">
            <Label htmlFor="title">Title</Label>
            <Input
              className="w-4/6"
              id="title"
              value={findSelectedSection?.content?.title}
              onChange={(e: any) => {
                console.log(e.target.value);
                updateContent(findSelectedSection?.id!, {
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="space-y-1 flex items-center justify-between">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              className="w-4/6 "
              id="subtitle"
              value={findSelectedSection?.content?.subtitle}
              onChange={(e: any) => {
                updateContent(findSelectedSection?.id!, {
                  subtitle: e.target.value,
                });
              }}
            />
          </div>
          <DraggableList
            label="Card"
            handleDragEnd={handleDragEnd}
            items={cardsContent?.cards || []}
            handleAdd={handleAddCard}
            setSelectedItem={handleSelectedItem}
          />
        </TabsContent>
        <TabsContent className="space-y-2 px-5" value="style">
          <div className="grid grid-cols-2 gap-2">
            {CARD_DESIGNS?.map(({ designName, Icon }, i) => {
              return (
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designName: designName,
                    });
                  }}
                  className="h-20 flex items-center justify-center relative border-[#222] border-solid border-[1px] rounded-sm"
                  key={i}
                >
                  <Icon
                    active={findSelectedSection.style.designName === designName}
                  />
                </div>
              );
            })}
          </div>
          <LayoutSetting
            findSelectedSection={findSelectedSection}
            updateStyle={updateStyle}
          />
          {cardsContent.cards.length >= 5 && (
            <DisplaySettings
              label="Display"
              displayValue={cardStyle.designSettings.displayType}
              onValueChange={(value) => {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings,
                    displayType: value,
                  },
                });
              }}
            />
          )}

          {cardStyle.designSettings.displayType === "carousel" &&
            cardStyle.designSettings.cardSlider.autoScroll && (
              <WidthOrHeight
                label="Scroll Speed"
                customText={`${cardStyle.designSettings.cardSlider.scrollSpeed}`}
                min={1}
                max={8}
                value={[cardStyle.designSettings.cardSlider.scrollSpeed]}
                onValueChange={(value) => {
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      cardSlider: {
                        ...cardStyle.designSettings.cardSlider,
                        scrollSpeed: value[0],
                      },
                    },
                  });
                }}
              />
            )}

          {cardStyle.designSettings.displayType === "grid" ? (
            <GridSetting
              label="Grid"
              isDesktop={isDesktop}
              toggleGridSetting={handleToggleGridSetting}
              max={isDesktop ? 3 : 2}
              customText={
                isDesktop
                  ? `${cardStyle.designSettings.grid.desktop}`
                  : `${cardStyle.designSettings.grid.mobile}`
              }
              value={
                isDesktop
                  ? [cardStyle.designSettings.grid.desktop]
                  : [cardStyle.designSettings.grid.mobile]
              }
              onValueChange={(value) => {
                const newGridSetting = isDesktop
                  ? { desktop: value[0] }
                  : { mobile: value[0] };

                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    grid: {
                      ...cardStyle.designSettings.grid,
                      ...newGridSetting,
                    },
                  },
                });
              }}
            />
          ) : (
            <HeightOrWidthSetting
              isDesktop={isCardSliderWidthDesktop}
              label="Width"
              min={200}
              max={500}
              handleToggleSetting={handleToggleCardSliderWidthSetting}
              customText={
                isCardSliderWidthDesktop
                  ? `${cardStyle.designSettings.cardSlider.desktopWidth}px`
                  : `${cardStyle.designSettings.cardSlider.mobileWidth}px`
              }
              value={
                isCardSliderWidthDesktop
                  ? [cardStyle.designSettings.cardSlider.desktopWidth]
                  : [cardStyle.designSettings.cardSlider.mobileWidth]
              }
              onValueChange={(value) => {
                const newWidthSetting = isCardSliderWidthDesktop
                  ? { desktopWidth: value[0] }
                  : { mobileWidth: value[0] };
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    cardSlider: {
                      ...cardStyle.designSettings.cardSlider,
                      ...newWidthSetting,
                    },
                  },
                });
              }}
            />
          )}

          <HeightOrWidthSetting
            isDesktop={isHeightDesktop}
            label="Height"
            min={100}
            max={500}
            handleToggleSetting={handleToggleHeightSetting}
            customText={
              isHeightDesktop
                ? `${cardStyle.designSettings.height.desktop}px`
                : `${cardStyle.designSettings.height.mobile}px`
            }
            value={
              isHeightDesktop
                ? [cardStyle.designSettings.height.desktop]
                : [cardStyle.designSettings.height.mobile]
            }
            onValueChange={(value) => {
              const newHeightSetting = isHeightDesktop
                ? { desktop: value[0] }
                : { mobile: value[0] };
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  height: {
                    ...cardStyle.designSettings.height,
                    ...newHeightSetting,
                  },
                },
              });
            }}
          />
          <TextSize
            label="Text"
            titleSizeValue={cardStyle.designSettings?.titleSize}
            onValueChange={(value) => {
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  titleSize: value,
                },
              });
            }}
          />
          <Align
            alignValue={cardStyle.designSettings?.align}
            onValueChange={(value) => {
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  align: value,
                },
              });
            }}
          />
          <div className="border-[#222] border-solid border-[1px] rounded-sm divide-y-[1px] divide-[#222]">
            <SwitchSetting
              label="Left Title"
              defaultChecked={cardStyle.designSettings.leftTitlePosition}
              onCheckedChange={(value) =>
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    leftTitlePosition: value,
                  },
                })
              }
            />
            <SwitchSetting
              label="Image"
              defaultChecked={cardStyle.designSettings?.image}
              onCheckedChange={(value) => {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    image: value,
                  },
                });
              }}
            />
            <SwitchSetting
              label="Background"
              defaultChecked={cardStyle.designSettings.cardBackground}
              onCheckedChange={(value) => {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    cardBackground: value,
                    cardBorder: false,
                  },
                });
              }}
            />
            <SwitchSetting
              label="Border"
              defaultChecked={cardStyle.designSettings.cardBorder}
              onCheckedChange={(value) =>
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    cardBorder: value,
                    cardBackground: false,
                  },
                })
              }
            />

            {cardStyle.designSettings.displayType === "carousel" && (
              <SwitchSetting
                label="Auto scroll"
                defaultChecked={cardStyle.designSettings.cardSlider.autoScroll}
                onCheckedChange={(value) =>
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      cardSlider: {
                        ...cardStyle.designSettings.cardSlider,
                        autoScroll: value,
                      },
                    },
                  })
                }
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CardsSettings;
