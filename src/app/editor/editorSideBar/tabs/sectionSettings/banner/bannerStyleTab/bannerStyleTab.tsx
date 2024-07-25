import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  FifthDesign,
  FirstDesign,
  FourthDesign,
  SecondDesign,
  SixthDesign,
  ThirdDesign,
} from "@/icons/banner";
import React from "react";
import ColorSelector from "../../settingsUi/ColorSelector";
import TitleSize from "../../settingsUi/TitleSizes";
import WidthOrHeight from "../../settingsUi/WidthOrHeight";
import Align from "../../settingsUi/Align";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { ChevronRightIcon } from "lucide-react";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";

const BANNER_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecondDesign },
  { designName: "design3", Icon: ThirdDesign },
  { designName: "design4", Icon: FourthDesign },
  { designName: "design5", Icon: FifthDesign },
  { designName: "design6", Icon: SixthDesign },
];

interface BannerStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  bannerStyle: BannerStyle;
  bannerContent: BannerContent;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function BannerStyleTab({
  findSelectedSection,
  bannerStyle,
  bannerContent,
  setSectionBgOpened,
}: BannerStyleTabProps) {
  const dispatch = useAppDispatch();
  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-3 gap-2">
        {BANNER_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designName: designName,
                    designSettings: {
                      ...bannerStyle.designSettings,
                      align:
                        designName === "design3" || designName === "design4"
                          ? "start"
                          : "center",
                    },
                  })
                );
              }}
              className="h-20 flex items-center justify-center relative border-muted-bg border-solid border-[1px] rounded-sm"
              key={i}
            >
              <Icon active={bannerStyle.designName === designName} />
            </div>
          );
        })}
      </div>
      {bannerContent.mediaType === "image" ? (
        <>
          <div className="space-y-1 flex items-center justify-between">
            <Label>Image</Label>

            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings,
                        imageSetting: {
                          ...bannerStyle.designSettings.imageSetting,
                          objectFit: "cover",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  bannerStyle.designSettings.imageSetting.objectFit === "cover"
                    ? "bg-muted-bg"
                    : ""
                } w-full flex items-center justify-center cursor-pointer`}
              >
                cover
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings,
                        imageSetting: {
                          ...bannerStyle.designSettings.imageSetting,
                          objectFit: "contain",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  bannerStyle.designSettings.imageSetting.objectFit ===
                  "contain"
                    ? "bg-muted-bg"
                    : ""
                } w-full flex items-center justify-center cursor-pointer`}
              >
                contain
              </div>
            </div>
          </div>
          {bannerStyle.designSettings.imageSetting.objectFit === "contain" && (
            <ColorSelector
              selectedColor={
                bannerStyle.designSettings.imageSetting.backgroundColor
              }
              handleChangeColor={(value) => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings,
                      imageSetting: {
                        ...bannerStyle.designSettings.imageSetting,
                        backgroundColor: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
        </>
      ) : null}

      <TitleSize
        label="Title"
        findSelectedSection={findSelectedSection!}
        updateStyle={updateStyle}
      />

      {findSelectedSection &&
        findSelectedSection.style.designName !== "design3" &&
        findSelectedSection.style.designName !== "design4" &&
        findSelectedSection.style.designName !== "design5" &&
        findSelectedSection.style.designName !== "design6" && (
          <>
            {findSelectedSection.style.designSettings.leftTitlePosition ? (
              <WidthOrHeight
                label="width"
                min={50}
                max={75}
                customText={`${bannerStyle.designSettings.leftTitleWidth}`}
                value={[parseInt(bannerStyle.designSettings.leftTitleWidth!)]}
                onValueChange={(value) => {
                  dispatch(
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        leftTitleWidth: `${value[0]}%`,
                      },
                    })
                  );
                }}
              />
            ) : (
              <Align
                alignValue={bannerStyle.designSettings.align}
                onValueChange={(value) => {
                  dispatch(
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        align: value,
                      },
                    })
                  );
                }}
              />
            )}
          </>
        )}

      {findSelectedSection &&
        findSelectedSection.style.designName === "design3" && (
          <Align
            alignValue={bannerStyle.designSettings.align}
            onValueChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    align: value,
                  },
                })
              );
            }}
          />
        )}
      {findSelectedSection &&
        findSelectedSection.style.designName === "design4" && (
          <Align
            alignValue={bannerStyle.designSettings.align}
            onValueChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    align: value,
                  },
                })
              );
            }}
          />
        )}

      {findSelectedSection &&
        !findSelectedSection.style.designSettings.leftTitlePosition &&
        findSelectedSection.style.designName !== "design3" &&
        findSelectedSection.style.designName !== "design4" &&
        findSelectedSection.style.designName !== "design5" &&
        findSelectedSection.style.designName !== "design6" && (
          <WidthOrHeight
            label="width"
            min={30}
            max={100}
            customText={`${bannerStyle.designSettings.subtitleWidth}`}
            value={[parseInt(bannerStyle.designSettings.subtitleWidth!)]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    subtitleWidth: `${value[0]}%`,
                  },
                })
              );
            }}
          />
        )}
      {(bannerStyle.designName === "design3" ||
        bannerStyle.designName === "design4" ||
        bannerStyle.designName === "design5" ||
        bannerStyle.designName === "design6") &&
        !bannerStyle.designSettings.imageSetting.showImage && (
          <WidthOrHeight
            label="width"
            min={50}
            max={100}
            customText={`${bannerStyle.designSettings.subtitleWidth}`}
            value={[parseInt(bannerStyle.designSettings.subtitleWidth!)]}
            onValueChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    subtitleWidth: `${value[0]}%`,
                  },
                })
              );
            }}
          />
        )}

      {bannerStyle.designSettings.imageSetting.showImage && (
        <WidthOrHeight
          customText={`${bannerStyle.designSettings.height}`}
          label="height"
          min={200}
          max={700}
          value={[parseInt(bannerStyle.designSettings.height!)]}
          onValueChange={(value) => {
            const height = value[0];
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings!,
                  height: `${height}px`,
                },
              })
            );
          }}
        />
      )}
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        {bannerContent.mediaType === "image" && (
          <SwitchSetting
            label="Image"
            defaultChecked={bannerStyle.designSettings.imageSetting.showImage}
            onCheckedChange={(value) => {
              dispatch(
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    imageSetting: {
                      ...bannerStyle.designSettings.imageSetting,
                      showImage: value,
                    },
                  },
                })
              );
            }}
          />
        )}
        {findSelectedSection?.style.designName !== "design3" &&
          findSelectedSection?.style.designName !== "design4" &&
          findSelectedSection?.style.designName !== "design5" &&
          findSelectedSection?.style.designName !== "design6" && (
            <SwitchSetting
              label="Left Title"
              defaultChecked={bannerStyle.designSettings.leftTitlePosition}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      leftTitlePosition: value,
                    },
                  })
                );
              }}
            />
          )}

        <SwitchSetting
          label="Button"
          defaultChecked={bannerStyle.designSettings.showButtons}
          onCheckedChange={(value) => {
            dispatch(
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings!,
                  showButtons: value,
                },
              })
            );
          }}
        />
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

export default BannerStyleTab;
