import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import DisplaySettings from "../../settingsUi/DisplaySettings";
import WidthOrHeight from "../../settingsUi/WidthOrHeight";
import GridSetting from "../../settingsUi/GridSetting";
import HeightOrWidthSetting from "../../settingsUi/HeightOrWidthSetting";
import Align from "../../settingsUi/Align";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import { LogosContent, LogosStyle } from "@/types/sectionsTypes/logos";

interface LogoStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  logosContent: LogosContent;
  logoStyle: LogosStyle;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSpacingTab: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}
function LogoStyleTab({
  findSelectedSection,
  logosContent,
  logoStyle,
  pageId,
  setSectionBgOpened,
  setOpenSpacingTab,
}: LogoStyleTabProps) {
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

  if (!logoStyle) return null;

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      {logosContent.logos.length >= 5 && (
        <DisplaySettings
          label="Display"
          displayValue={logoStyle.designSettings.displayType}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...logoStyle.designSettings,
                  displayType: value,
                },
              })
            );
          }}
        />
      )}

      {logoStyle.designSettings.displayType === "carousel" &&
        logoStyle.designSettings.carouselSettings.autoScroll && (
          <WidthOrHeight
            label="Scroll Speed"
            customText={`${logoStyle.designSettings.carouselSettings.scrollSpeed}`}
            min={1}
            max={8}
            value={[logoStyle.designSettings.carouselSettings.scrollSpeed]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...logoStyle.designSettings!,
                    carouselSettings: {
                      ...logoStyle.designSettings.carouselSettings,
                      scrollSpeed: value[0],
                    },
                  },
                })
              );
            }}
          />
        )}

      {logoStyle.designSettings.displayType === "grid" ? (
        <GridSetting
          label="Grid"
          isDesktop={isDesktop}
          toggleGridSetting={handleToggleGridSetting}
          max={4}
          customText={
            isDesktop
              ? `${logoStyle.designSettings.grid.desktop}`
              : `${logoStyle.designSettings.grid.mobile}`
          }
          value={
            isDesktop
              ? [logoStyle.designSettings.grid.desktop]
              : [logoStyle.designSettings.grid.mobile]
          }
          onValueChange={(value) => {
            const newGridSetting = isDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };

            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...logoStyle.designSettings!,
                  grid: {
                    ...logoStyle.designSettings.grid,
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
          min={50}
          max={400}
          handleToggleSetting={handleToggleCardSliderWidthSetting}
          customText={
            isCardSliderWidthDesktop
              ? `${logoStyle.designSettings.carouselSettings.desktopWidth}px`
              : `${logoStyle.designSettings.carouselSettings.mobileWidth}px`
          }
          value={
            isCardSliderWidthDesktop
              ? [logoStyle.designSettings.carouselSettings.desktopWidth]
              : [logoStyle.designSettings.carouselSettings.mobileWidth]
          }
          onValueChange={(value) => {
            const newWidthSetting = isCardSliderWidthDesktop
              ? { desktopWidth: value[0] }
              : { mobileWidth: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...logoStyle.designSettings!,
                  carouselSettings: {
                    ...logoStyle.designSettings.carouselSettings,
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
        max={150}
        handleToggleSetting={handleToggleHeightSetting}
        customText={
          isHeightDesktop
            ? `${logoStyle.designSettings.height.desktop}px`
            : `${logoStyle.designSettings.height.mobile}px`
        }
        value={
          isHeightDesktop
            ? [logoStyle.designSettings.height.desktop]
            : [logoStyle.designSettings.height.mobile]
        }
        onValueChange={(value) => {
          const newHeightSetting = isHeightDesktop
            ? { desktop: value[0] }
            : { mobile: value[0] };
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...logoStyle.designSettings!,
                height: {
                  ...logoStyle.designSettings.height,
                  ...newHeightSetting,
                },
              },
            })
          );
        }}
      />

      <Align
        alignValue={logoStyle.designSettings?.align}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...logoStyle.designSettings!,
                align: value,
              },
            })
          );
        }}
      />
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Left Title"
          defaultChecked={logoStyle.designSettings.leftTitlePosition}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...logoStyle.designSettings!,
                  leftTitlePosition: value,
                },
              })
            )
          }
        />
        <SwitchSetting
          label="Background"
          defaultChecked={logoStyle.designSettings.background}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(pageId, findSelectedSection?.id, {
                designSettings: {
                  ...logoStyle.designSettings,
                  background: value,
                  border: false,
                },
              })
            )
          }
        />
        <SwitchSetting
          label="Border"
          defaultChecked={logoStyle.designSettings.border}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(pageId, findSelectedSection?.id, {
                designSettings: {
                  ...logoStyle.designSettings,
                  border: value,
                  background: false,
                },
              })
            )
          }
        />

        {logoStyle.designSettings.displayType === "carousel" && (
          <SwitchSetting
            label="Auto scroll"
            defaultChecked={
              logoStyle.designSettings.carouselSettings.autoScroll
            }
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...logoStyle.designSettings!,
                    carouselSettings: {
                      ...logoStyle.designSettings.carouselSettings,
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

export default LogoStyleTab;
