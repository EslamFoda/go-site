import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import DisplaySettings from "../../settingsUi/DisplaySettings";
import WidthOrHeight from "../../settingsUi/WidthOrHeight";
import GridSetting from "../../settingsUi/GridSetting";
import HeightOrWidthSetting from "../../settingsUi/HeightOrWidthSetting";
import TextSize from "../../settingsUi/TextSize";
import Align from "../../settingsUi/Align";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import { ListContent, ListStyle } from "@/types/sectionsTypes/list";
import ListLayout from "../../settingsUi/ListLayout";
import Shape from "../../settingsUi/Shape";
import ListIconColor from "../../settingsUi/ListIconColor";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import {
  ColIcon,
  ColIcon2,
  FirstDesign,
  RowIcon,
  RowIcon2,
  SecDesign,
} from "@/icons/list";
import ToggleGroup from "../../settingsUi/toggleGroup";
const List_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
];

interface ListStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  listContent: ListContent;
  listStyle: ListStyle;
  pageId: string;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSpacingTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function ListStyleTab({
  findSelectedSection,
  listContent,
  listStyle,
  pageId,
  setSectionBgOpened,
  setOpenSpacingTab,
}: ListStyleTabProps) {
  const dispatch = useAppDispatch();
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

  if (!listStyle) return null;
  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {List_DESIGNS?.map(({ designName, Icon }, i) => {
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
                active={findSelectedSection.style.designName === designName}
              />
            </div>
          );
        })}
      </div>
      {listStyle.designName === "design1" && (
        <ToggleGroup
          label="Align"
          options={[
            { value: "row", label: <RowIcon /> },
            { value: "col", label: <ColIcon /> },
          ]}
          value={listStyle.designSettings.layout}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings,
                  layout: value,
                },
              })
            );
          }}
        />
      )}
      {listStyle.designName === "design2" && (
        <ToggleGroup
          label="Align"
          options={[
            { value: "row", label: <RowIcon2 /> },
            { value: "col", label: <ColIcon2 /> },
          ]}
          value={listStyle.designSettings.layout2}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings,
                  layout2: value,
                },
              })
            );
          }}
        />
      )}
      {listContent.list.length >= 5 && (
        <DisplaySettings
          label="Display"
          displayValue={listStyle.designSettings.displayType}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings,
                  displayType: value,
                },
              })
            );
          }}
        />
      )}

      {listStyle.designSettings.displayType === "carousel" &&
        listStyle.designSettings.carouselSettings.autoScroll && (
          <WidthOrHeight
            label="Scroll Speed"
            customText={`${listStyle.designSettings.carouselSettings.scrollSpeed}`}
            min={1}
            max={8}
            value={[listStyle.designSettings.carouselSettings.scrollSpeed]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    carouselSettings: {
                      ...listStyle.designSettings.carouselSettings,
                      scrollSpeed: value[0],
                    },
                  },
                })
              );
            }}
          />
        )}

      {listStyle.designSettings.displayType === "grid" ? (
        <GridSetting
          label="Grid"
          isDesktop={isDesktop}
          toggleGridSetting={handleToggleGridSetting}
          max={isDesktop ? 3 : 2}
          customText={
            isDesktop
              ? `${listStyle.designSettings.grid.desktop}`
              : `${listStyle.designSettings.grid.mobile}`
          }
          value={
            isDesktop
              ? [listStyle.designSettings.grid.desktop]
              : [listStyle.designSettings.grid.mobile]
          }
          onValueChange={(value) => {
            const newGridSetting = isDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };

            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings!,
                  grid: {
                    ...listStyle.designSettings.grid,
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
              ? `${listStyle.designSettings.carouselSettings.desktopWidth}px`
              : `${listStyle.designSettings.carouselSettings.mobileWidth}px`
          }
          value={
            isCardSliderWidthDesktop
              ? [listStyle.designSettings.carouselSettings.desktopWidth]
              : [listStyle.designSettings.carouselSettings.mobileWidth]
          }
          onValueChange={(value) => {
            const newWidthSetting = isCardSliderWidthDesktop
              ? { desktopWidth: value[0] }
              : { mobileWidth: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings!,
                  carouselSettings: {
                    ...listStyle.designSettings.carouselSettings,
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
        min={40}
        max={100}
        handleToggleSetting={handleToggleHeightSetting}
        customText={`${listStyle.designSettings.height}px`}
        value={[listStyle.designSettings.height]}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...listStyle.designSettings!,
                height: value[0],
              },
            })
          );
        }}
      />
      <Shape
        shapeValue={listStyle.designSettings.shape}
        onValueChange={(value) =>
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: { ...listStyle.designSettings!, shape: value },
            })
          )
        }
      />
      <ListIconColor
        iconColorValue={listStyle.designSettings.iconColor}
        onValueChange={(value) =>
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...listStyle.designSettings!,
                iconColor: value,
              },
            })
          )
        }
      />
      <TextSize
        label="Text"
        titleSizeValue={listStyle.designSettings?.textSize}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...listStyle.designSettings!,
                textSize: value,
              },
            })
          );
        }}
      />
      {!listStyle.designSettings.leftTitlePosition && listContent.title && (
        <Align
          alignValue={listStyle.designSettings.align}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings!,
                  align: value,
                },
              })
            );
          }}
        />
      )}
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        {listContent.title && (
          <SwitchSetting
            label="Left Title"
            defaultChecked={listStyle.designSettings.leftTitlePosition}
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    leftTitlePosition: value,
                  },
                })
              )
            }
          />
        )}
        <SwitchSetting
          label="Icon"
          defaultChecked={listStyle.designSettings?.icon}
          onCheckedChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...listStyle.designSettings!,
                  icon: value,
                },
              })
            );
          }}
        />
        {listStyle.designSettings.sectionBackground.color === "none" && (
          <>
            <SwitchSetting
              label="Background"
              defaultChecked={listStyle.designSettings.background}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      background: value,
                      border: !value, // Toggle border opposite to background
                    },
                  })
                );
              }}
            />
            <SwitchSetting
              label="Border"
              defaultChecked={listStyle.designSettings.border}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...listStyle.designSettings!,
                      border: value,
                      background: !value, // Toggle background opposite to border
                    },
                  })
                );
              }}
            />
          </>
        )}
        {listStyle.designSettings.displayType === "carousel" && (
          <SwitchSetting
            label="Auto scroll"
            defaultChecked={
              listStyle.designSettings.carouselSettings.autoScroll
            }
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...listStyle.designSettings!,
                    carouselSettings: {
                      ...listStyle.designSettings.carouselSettings,
                      autoScroll: value,
                    },
                  },
                })
              )
            }
          />
        )}{" "}
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenSpacingTab(true);
          }}
        >
          <Label>Spacing</Label>
          <ChevronRightIcon size={18} />
        </div>
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

export default ListStyleTab;
