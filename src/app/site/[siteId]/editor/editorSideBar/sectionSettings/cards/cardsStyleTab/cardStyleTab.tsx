import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import LayoutSetting from "../../settingsUi/LayoutSetting";
import DisplaySettings from "../../settingsUi/DisplaySettings";
import WidthOrHeight from "../../settingsUi/WidthOrHeight";
import GridSetting from "../../settingsUi/GridSetting";
import HeightOrWidthSetting from "../../settingsUi/HeightOrWidthSetting";
import TextSize from "../../settingsUi/TextSize";
import Align from "../../settingsUi/Align";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { FirstDesign, SecDesign } from "@/icons/cards";
import { CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
const CARD_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
];

interface CardStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  cardsContent: CardsContent;
  cardStyle: CardStyle;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}
function CardStyleTab({
  findSelectedSection,
  cardsContent,
  cardStyle,
  pageId,
  setSectionBgOpened,
}: CardStyleTabProps) {
  const dispatch = useAppDispatch();
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHeightDesktop, setIsHeightDesktop] = useState(true);
  const [isCardSliderWidthDesktop, setIsCardSliderWidthDesktop] =
    useState(true);
  console.log(findSelectedSection, "findSelectedSection");
  const handleToggleHeightSetting = () => {
    setIsHeightDesktop(!isHeightDesktop);
  };
  const handleToggleGridSetting = () => {
    setIsDesktop(!isDesktop);
  };
  const handleToggleCardSliderWidthSetting = () => {
    setIsCardSliderWidthDesktop(!isCardSliderWidthDesktop);
  };

  if (!cardStyle) return null;

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {CARD_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designName: designName,
                  })
                );
              }}
              className="h-20 flex items-center justify-center relative border-muted-bg border-solid border-[1px] rounded-sm"
              key={i}
            >
              <Icon
                active={findSelectedSection?.style.designName === designName}
              />
            </div>
          );
        })}
      </div>
      {findSelectedSection.style.designName === "design1" ? (
        <LayoutSetting
          pageId={pageId}
          findSelectedSection={findSelectedSection}
          updateStyle={updateStyle}
        />
      ) : (
        <LayoutSetting
          pageId={pageId}
          findSelectedSection={findSelectedSection}
          updateStyle={updateStyle}
          layoutV2
        />
      )}
      {cardsContent.cards.length >= 5 && (
        <DisplaySettings
          label="Display"
          displayValue={cardStyle.designSettings.displayType}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings,
                  displayType: value,
                },
              })
            );
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
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    cardSlider: {
                      ...cardStyle.designSettings.cardSlider,
                      scrollSpeed: value[0],
                    },
                  },
                })
              );
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

            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  grid: {
                    ...cardStyle.designSettings.grid,
                    ...newGridSetting,
                  },
                },
              })
            );
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
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  cardSlider: {
                    ...cardStyle.designSettings.cardSlider,
                    ...newWidthSetting,
                  },
                },
              })
            );
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
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...cardStyle.designSettings!,
                height: {
                  ...cardStyle.designSettings.height,
                  ...newHeightSetting,
                },
              },
            })
          );
        }}
      />
      <TextSize
        label="Text"
        titleSizeValue={cardStyle.designSettings?.titleSize}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...cardStyle.designSettings!,
                titleSize: value,
              },
            })
          );
        }}
      />
      <Align
        alignValue={cardStyle.designSettings?.align}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...cardStyle.designSettings!,
                align: value,
              },
            })
          );
        }}
      />
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Left Title"
          defaultChecked={cardStyle.designSettings.leftTitlePosition}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  leftTitlePosition: value,
                },
              })
            )
          }
        />
        {findSelectedSection.style.designName === "design1" ? (
          <>
            <SwitchSetting
              label="Image"
              defaultChecked={cardStyle.designSettings?.image}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      image: value,
                    },
                  })
                );
              }}
            />
            {cardStyle.designSettings.sectionBackground.color === "none" && (
              <>
                <SwitchSetting
                  label="Background"
                  defaultChecked={cardStyle.designSettings.cardBackground}
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...cardStyle.designSettings!,
                          cardBackground: value,
                          cardBorder: false,
                        },
                      })
                    );
                  }}
                />
                <SwitchSetting
                  label="Border"
                  defaultChecked={cardStyle.designSettings.cardBorder}
                  onCheckedChange={(value) =>
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...cardStyle.designSettings!,
                          cardBorder: value,
                          cardBackground: false,
                        },
                      })
                    )
                  }
                />
              </>
            )}
          </>
        ) : (
          <SwitchSetting
            label="Glass"
            defaultChecked={cardStyle.designSettings.glassEffect}
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    glassEffect: value,
                  },
                })
              )
            }
          />
        )}

        {cardStyle.designSettings.displayType === "carousel" && (
          <SwitchSetting
            label="Auto scroll"
            defaultChecked={cardStyle.designSettings.cardSlider.autoScroll}
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    cardSlider: {
                      ...cardStyle.designSettings.cardSlider,
                      autoScroll: value,
                    },
                  },
                })
              )
            }
          />
        )}
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setSectionBgOpened(true);
          }}
        >
          <Label>Section Background</Label>
          <ChevronRightIcon size={18} />
        </div>
      </div>
    </TabsContent>
  );
}

export default CardStyleTab;
