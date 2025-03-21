import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import DisplaySettings from "../../settingsUi/DisplaySettings";
import WidthOrHeight from "../../settingsUi/WidthOrHeight";
import GridSetting from "../../settingsUi/GridSetting";
import HeightOrWidthSetting from "../../settingsUi/HeightOrWidthSetting";
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
import { GalleryContent, GalleryStyle } from "@/types/sectionsTypes/gallery";

interface GalleryStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  galleryContent: GalleryContent;
  galleryStyle: GalleryStyle;
  pageId: string;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSpacingTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function GalleryStyleTab({
  findSelectedSection,
  galleryContent,
  galleryStyle,
  pageId,
  setSectionBgOpened,
  setOpenSpacingTab,
}: GalleryStyleTabProps) {
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

  if (!galleryStyle) return null;
  return (
    <TabsContent className="space-y-2 px-5" value="style">
      {galleryContent.photos.length >= 5 && (
        <DisplaySettings
          label="Display"
          displayValue={galleryStyle.designSettings.displayType}
          onValueChange={(value) => {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...galleryStyle.designSettings,
                  displayType: value,
                },
              })
            );
          }}
        />
      )}

      {galleryStyle.designSettings.displayType === "carousel" &&
        galleryStyle.designSettings.carouselSettings.autoScroll && (
          <WidthOrHeight
            label="Scroll Speed"
            customText={`${galleryStyle.designSettings.carouselSettings.scrollSpeed}`}
            min={1}
            max={8}
            value={[galleryStyle.designSettings.carouselSettings.scrollSpeed]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...galleryStyle.designSettings!,
                    carouselSettings: {
                      ...galleryStyle.designSettings.carouselSettings,
                      scrollSpeed: value[0],
                    },
                  },
                })
              );
            }}
          />
        )}

      {galleryStyle.designSettings.displayType === "grid" ? (
        <GridSetting
          label="Grid"
          isDesktop={isDesktop}
          toggleGridSetting={handleToggleGridSetting}
          max={
            isDesktop
              ? galleryContent.photos.length > 10
                ? 10
                : galleryContent.photos.length
              : galleryContent.photos.length > 5
              ? 5
              : galleryContent.photos.length
          }
          customText={
            isDesktop
              ? `${galleryStyle.designSettings.grid.desktop}`
              : `${galleryStyle.designSettings.grid.mobile}`
          }
          value={
            isDesktop
              ? [galleryStyle.designSettings.grid.desktop]
              : [galleryStyle.designSettings.grid.mobile]
          }
          onValueChange={(value) => {
            const newGridSetting = isDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };

            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...galleryStyle.designSettings!,
                  grid: {
                    ...galleryStyle.designSettings.grid,
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
              ? `${galleryStyle.designSettings.carouselSettings.desktopWidth}px`
              : `${galleryStyle.designSettings.carouselSettings.mobileWidth}px`
          }
          value={
            isCardSliderWidthDesktop
              ? [galleryStyle.designSettings.carouselSettings.desktopWidth]
              : [galleryStyle.designSettings.carouselSettings.mobileWidth]
          }
          onValueChange={(value) => {
            const newWidthSetting = isCardSliderWidthDesktop
              ? { desktopWidth: value[0] }
              : { mobileWidth: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...galleryStyle.designSettings!,
                  carouselSettings: {
                    ...galleryStyle.designSettings.carouselSettings,
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
            ? `${galleryStyle.designSettings.height.desktop}px`
            : `${galleryStyle.designSettings.height.mobile}px`
        }
        value={
          isHeightDesktop
            ? [galleryStyle.designSettings.height.desktop]
            : [galleryStyle.designSettings.height.mobile]
        }
        onValueChange={(value) => {
          const newHeightSetting = isHeightDesktop
            ? { desktop: value[0] }
            : { mobile: value[0] };
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...galleryStyle.designSettings!,
                height: {
                  ...galleryStyle.designSettings.height,
                  ...newHeightSetting,
                },
              },
            })
          );
        }}
      />

      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        {galleryContent.title && (
          <SwitchSetting
            label="Left Title"
            defaultChecked={galleryStyle.designSettings.leftTitlePosition}
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...galleryStyle.designSettings!,
                    leftTitlePosition: value,
                  },
                })
              )
            }
          />
        )}

        {galleryStyle.designSettings.displayType === "carousel" && (
          <SwitchSetting
            label="Auto scroll"
            defaultChecked={
              galleryStyle.designSettings.carouselSettings.autoScroll
            }
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...galleryStyle.designSettings!,
                    carouselSettings: {
                      ...galleryStyle.designSettings.carouselSettings,
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

export default GalleryStyleTab;
