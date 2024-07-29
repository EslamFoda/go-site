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
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import Shape from "../../settingsUi/Shape";
const CARD_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
];

interface TestimonialsStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  testimonialContent: TestimonialContent;
  testimonialStyle: TestimonialStyle;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
function TestimonialsStyleTab({
  findSelectedSection,
  testimonialContent,
  testimonialStyle,
  setSectionBgOpened,
}: TestimonialsStyleTabProps) {
  const dispatch = useAppDispatch();
  const [isDesktop, setIsDesktop] = useState(true);
  const [isCardSliderWidthDesktop, setIsCardSliderWidthDesktop] =
    useState(true);
  const handleToggleGridSetting = () => {
    setIsDesktop(!isDesktop);
  };
  const handleToggleCardSliderWidthSetting = () => {
    setIsCardSliderWidthDesktop(!isCardSliderWidthDesktop);
  };
  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {CARD_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
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
      <TextSize
        label="Text"
        titleSizeValue={testimonialStyle.designSettings?.textSize}
        onValueChange={(value) => {
          dispatch(
            updateStyle(findSelectedSection?.id!, {
              designSettings: {
                ...testimonialStyle.designSettings!,
                textSize: value,
              },
            })
          );
        }}
      />

      {testimonialContent.testimonials.length >= 5 && (
        <DisplaySettings
          label="Display"
          displayValue={testimonialStyle.designSettings.displayType}
          onValueChange={(value) => {
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...testimonialStyle.designSettings,
                  displayType: value,
                },
              })
            );
          }}
        />
      )}

      {testimonialStyle.designSettings.displayType === "carousel" &&
        testimonialStyle.designSettings.carouselSettings.autoScroll && (
          <WidthOrHeight
            label="Scroll Speed"
            customText={`${testimonialStyle.designSettings.carouselSettings.scrollSpeed}`}
            min={1}
            max={8}
            value={[
              testimonialStyle.designSettings.carouselSettings.scrollSpeed,
            ]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...testimonialStyle.designSettings!,
                    carouselSettings: {
                      ...testimonialStyle.designSettings.carouselSettings,
                      scrollSpeed: value[0],
                    },
                  },
                })
              );
            }}
          />
        )}

      {testimonialStyle.designSettings.displayType === "grid" ? (
        <GridSetting
          label="Grid"
          isDesktop={isDesktop}
          toggleGridSetting={handleToggleGridSetting}
          max={isDesktop ? 3 : 2}
          customText={
            isDesktop
              ? `${testimonialStyle.designSettings.grid.desktop}`
              : `${testimonialStyle.designSettings.grid.mobile}`
          }
          value={
            isDesktop
              ? [testimonialStyle.designSettings.grid.desktop]
              : [testimonialStyle.designSettings.grid.mobile]
          }
          onValueChange={(value) => {
            const newGridSetting = isDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };

            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...testimonialStyle.designSettings!,
                  grid: {
                    ...testimonialStyle.designSettings.grid,
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
              ? `${testimonialStyle.designSettings.carouselSettings.desktopWidth}px`
              : `${testimonialStyle.designSettings.carouselSettings.mobileWidth}px`
          }
          value={
            isCardSliderWidthDesktop
              ? [testimonialStyle.designSettings.carouselSettings.desktopWidth]
              : [testimonialStyle.designSettings.carouselSettings.mobileWidth]
          }
          onValueChange={(value) => {
            const newWidthSetting = isCardSliderWidthDesktop
              ? { desktopWidth: value[0] }
              : { mobileWidth: value[0] };
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...testimonialStyle.designSettings!,
                  carouselSettings: {
                    ...testimonialStyle.designSettings.carouselSettings,
                    ...newWidthSetting,
                  },
                },
              })
            );
          }}
        />
      )}

      <Shape
        shapeValue={testimonialStyle.designSettings.shape}
        onValueChange={(value) => {
          dispatch(
            updateStyle(findSelectedSection?.id!, {
              designSettings: {
                ...testimonialStyle.designSettings!,
                shape: value,
              },
            })
          );
        }}
      />

      {testimonialStyle.designName === "design2" && (
        <Align
          alignValue={testimonialStyle.designSettings?.align}
          onValueChange={(value) => {
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...testimonialStyle.designSettings!,
                  align: value,
                },
              })
            );
          }}
        />
      )}
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Left Title"
          defaultChecked={testimonialStyle.designSettings.leftTitlePosition}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...testimonialStyle.designSettings!,
                  leftTitlePosition: value,
                },
              })
            )
          }
        />

        {/* <SwitchSetting
            label="Image"
            defaultChecked={testimonialStyle.designSettings?.image}
            onCheckedChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...testimonialStyle.designSettings!,
                    image: value,
                  },
                })
              );
            }}
          /> */}
        {testimonialStyle.designSettings.sectionBackground.color === "none" && (
          <>
            <SwitchSetting
              label="Background"
              defaultChecked={testimonialStyle.designSettings.background}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...testimonialStyle.designSettings!,
                      background: value,
                      border: !value, // Toggle border opposite to background
                    },
                  })
                );
              }}
            />
            <SwitchSetting
              label="Border"
              defaultChecked={testimonialStyle.designSettings.border}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...testimonialStyle.designSettings!,
                      border: value,
                      background: !value, // Toggle background opposite to border
                    },
                  })
                );
              }}
            />
          </>
        )}

        {testimonialStyle.designSettings.displayType === "carousel" && (
          <SwitchSetting
            label="Auto scroll"
            defaultChecked={
              testimonialStyle.designSettings.carouselSettings.autoScroll
            }
            onCheckedChange={(value) =>
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...testimonialStyle.designSettings!,
                    carouselSettings: {
                      ...testimonialStyle.designSettings.carouselSettings,
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

export default TestimonialsStyleTab;
