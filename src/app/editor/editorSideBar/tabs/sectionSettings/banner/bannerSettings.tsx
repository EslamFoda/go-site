import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronLeft, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Align from "../settingsUi/Align";
import WidthOrHeight from "../settingsUi/WidthOrHeight";
import TitleSize from "../settingsUi/TitleSizes";
import useEditor, {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/app/editor/store/editorStore";
import {
  FifthDesign,
  FirstDesign,
  FourthDesign,
  SecondDesign,
  SixthDesign,
  ThirdDesign,
} from "@/icons/banner";
import {
  JustifyCenter,
  JustifyEnd,
  JustifyStart,
  NoColorIcon,
} from "@/icons/common";
import SwitchSetting from "../settingsUi/SwitchSetting";
import ColorSelector from "../settingsUi/ColorSelector";

const BANNER_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecondDesign },
  { designName: "design3", Icon: ThirdDesign },
  { designName: "design4", Icon: FourthDesign },
  { designName: "design5", Icon: FifthDesign },
  { designName: "design6", Icon: SixthDesign },
];

function BannerSettings({}) {
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [tabValue, setTabValue] = useState("content");
  const { selectedSection, updateContent, updateStyle, editor } = useEditor();
  const findSelectedSection = editor.sections.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const bannerContent =
    findSelectedSection?.content as SectionContentTypes["banner"];
  const bannerStyle = findSelectedSection?.style as SectionStyleTypes["banner"];

  return (
    <div>
      {/* <SettingsTab /> */}
      {sectionBgOpened ? (
        <div className="space-y-2">
          <div
            className="flex p-5 items-center gap-4 cursor-pointer border-b-[1px] border-b-[#222] mb-3"
            onClick={() => {
              setSectionBgOpened(false);
            }}
          >
            <ChevronLeft size={18} />
            <Label>Section Background</Label>
          </div>
          <div className="px-5 space-y-2">
            <ColorSelector
              selectedColor={bannerStyle.designSettings.sectionBackground.color}
              handleChangeColor={(color) => {
                updateStyle(findSelectedSection?.id!, {
                  designSettings: {
                    ...bannerStyle.designSettings!,
                    sectionBackground: {
                      ...bannerStyle.designSettings.sectionBackground,
                      color,
                    },
                  },
                });
              }}
            />

            <div className="space-y-1 flex items-center justify-between">
              <Label>Height</Label>
              <div className="border-[#222]  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    });
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.height ===
                    "fill"
                      ? "bg-[#222]"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  fill
                </div>
                <div
                  onClick={() => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        sectionBackground: {
                          ...bannerStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    });
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.height ===
                    "fit"
                      ? "bg-[#222]"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  fit
                </div>
              </div>
            </div>
            {bannerStyle.designSettings.sectionBackground.height === "fill" && (
              <div className="space-y-1 flex items-center justify-between">
                <Label>Align</Label>
                <div className="border-[#222]  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                  <div
                    onClick={() => {
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      });
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
                      "start"
                        ? "bg-[#222]"
                        : ""
                    } flex items-center justify-center cursor-pointer w-full`}
                  >
                    <JustifyStart />
                  </div>
                  <div
                    onClick={() => {
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      });
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
                      "center"
                        ? "bg-[#222]"
                        : ""
                    } flex items-center justify-center cursor-pointer w-full`}
                  >
                    <JustifyCenter />
                  </div>
                  <div
                    onClick={() => {
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      });
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
                      "end"
                        ? "bg-[#222]"
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
      ) : (
        <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
          <TabsList className="grid m-5 grid-cols-2">
            <TabsTrigger value="content">content</TabsTrigger>
            <TabsTrigger value="style">style</TabsTrigger>
          </TabsList>
          <TabsContent className="px-5 h space-y-2" value="content">
            <div className="space-y-1 flex items-center justify-between">
              <Label htmlFor="label">label</Label>
              <Input
                id="label"
                className="w-4/6"
                value={bannerContent?.label}
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
              <Label htmlFor="title">title</Label>
              <Input
                className="w-4/6"
                id="title"
                value={bannerContent?.title}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  updateContent(findSelectedSection?.id!, {
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-1 flex items-center justify-between">
              <Label htmlFor="subtitle">subtitle</Label>
              <Textarea
                className="w-4/6 h-28"
                id="subtitle"
                value={bannerContent?.subtitle}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  updateContent(findSelectedSection?.id!, {
                    subtitle: e.target.value,
                  });
                }}
              />
            </div>
            <div className="space-y-1 flex items-center justify-between">
              <Label>Type</Label>
              <div className="grid  q grid-cols-2 items-center w-4/6">
                <Button
                  variant={
                    bannerContent?.mediaType === "image"
                      ? "outline"
                      : "secondary"
                  }
                  onClick={() => {
                    updateContent(findSelectedSection?.id!, {
                      mediaType: "image",
                    });
                  }}
                  className=" hover:!bg-transparent w-full "
                >
                  image
                </Button>
                <Button
                  variant={
                    bannerContent?.mediaType === "video"
                      ? "outline"
                      : "secondary"
                  }
                  onClick={() => {
                    updateContent(findSelectedSection?.id!, {
                      mediaType: "video",
                    });
                  }}
                  className=" hover:!bg-transparent w-full"
                >
                  video
                </Button>
              </div>
            </div>
            <div>
              {bannerContent?.mediaType === "image" ? (
                <div className="space-y-1 flex items-center justify-between">
                  <Label>Alt Text</Label>
                  <Input
                    className="w-4/6"
                    id="alt text"
                    value={bannerContent?.imageSetting?.altText}
                    onChange={(e: any) => {
                      updateContent(findSelectedSection?.id, {
                        imageSetting: {
                          ...bannerContent?.imageSetting,
                          altText: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-1 flex items-center justify-between">
                  <Label>Video</Label>
                  <Input
                    className="w-4/6"
                    id="Video"
                    value={bannerContent?.videoSetting?.videoUrl}
                    onChange={(e: any) => {
                      updateContent(findSelectedSection?.id!, {
                        videoSetting: {
                          ...bannerContent?.videoSetting,
                          videoUrl: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent className="space-y-2 px-5" value="style">
            <div className="grid grid-cols-3 gap-2">
              {BANNER_DESIGNS?.map(({ designName, Icon }, i) => {
                return (
                  <div
                    onClick={() => {
                      updateStyle(findSelectedSection?.id!, {
                        designName: designName,
                        designSettings: {
                          ...bannerStyle.designSettings,
                          align:
                            designName === "design3" || designName === "design4"
                              ? "start"
                              : "center",
                        },
                      });
                    }}
                    className="h-20 flex items-center justify-center relative border-[#222] border-solid border-[1px] rounded-sm"
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

                  <div className="border-[#222]  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                    <div
                      onClick={() => {
                        updateStyle(findSelectedSection?.id!, {
                          designSettings: {
                            ...bannerStyle.designSettings,
                            imageSetting: {
                              ...bannerStyle.designSettings.imageSetting,
                              objectFit: "cover",
                            },
                          },
                        });
                      }}
                      className={`${
                        bannerStyle.designSettings.imageSetting.objectFit ===
                        "cover"
                          ? "bg-[#222]"
                          : ""
                      } w-full flex items-center justify-center cursor-pointer`}
                    >
                      cover
                    </div>
                    <div
                      onClick={() => {
                        updateStyle(findSelectedSection?.id!, {
                          designSettings: {
                            ...bannerStyle.designSettings,
                            imageSetting: {
                              ...bannerStyle.designSettings.imageSetting,
                              objectFit: "contain",
                            },
                          },
                        });
                      }}
                      className={`${
                        bannerStyle.designSettings.imageSetting.objectFit ===
                        "contain"
                          ? "bg-[#222]"
                          : ""
                      } w-full flex items-center justify-center cursor-pointer`}
                    >
                      contain
                    </div>
                  </div>
                </div>
                {bannerStyle.designSettings.imageSetting.objectFit ===
                  "contain" && (
                  <ColorSelector
                    selectedColor={
                      bannerStyle.designSettings.imageSetting.backgroundColor
                    }
                    handleChangeColor={(value) => {
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings,
                          imageSetting: {
                            ...bannerStyle.designSettings.imageSetting,
                            backgroundColor: value,
                          },
                        },
                      });
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
                  {findSelectedSection.style.designSettings
                    .leftTitlePosition ? (
                    <WidthOrHeight
                      label="width"
                      min={50}
                      max={75}
                      customText={`${bannerStyle.designSettings.leftTitleWidth}`}
                      value={[
                        parseInt(bannerStyle.designSettings.leftTitleWidth!),
                      ]}
                      onValueChange={(value) => {
                        updateStyle(findSelectedSection?.id!, {
                          designSettings: {
                            ...bannerStyle.designSettings!,
                            leftTitleWidth: `${value[0]}%`,
                          },
                        });
                      }}
                    />
                  ) : (
                    <Align
                      alignValue={bannerStyle.designSettings.align}
                      onValueChange={(value) => {
                        updateStyle(findSelectedSection?.id!, {
                          designSettings: {
                            ...bannerStyle.designSettings!,
                            align: value,
                          },
                        });
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
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        align: value,
                      },
                    });
                  }}
                />
              )}
            {findSelectedSection &&
              findSelectedSection.style.designName === "design4" && (
                <Align
                  alignValue={bannerStyle.designSettings.align}
                  onValueChange={(value) => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        align: value,
                      },
                    });
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
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        subtitleWidth: `${value[0]}%`,
                      },
                    });
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
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        subtitleWidth: `${value[0]}%`,
                      },
                    });
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
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      height: `${height}px`,
                    },
                  });
                }}
              />
            )}
            <div className="border-[#222] border-solid border-[1px] rounded-sm divide-y-[1px] divide-[#222]">
              {bannerContent.mediaType === "image" && (
                <SwitchSetting
                  label="Image"
                  defaultChecked={
                    bannerStyle.designSettings.imageSetting.showImage
                  }
                  onCheckedChange={(value) => {
                    updateStyle(findSelectedSection?.id!, {
                      designSettings: {
                        ...bannerStyle.designSettings!,
                        imageSetting: {
                          ...bannerStyle.designSettings.imageSetting,
                          showImage: value,
                        },
                      },
                    });
                  }}
                />
              )}
              {findSelectedSection?.style.designName !== "design3" &&
                findSelectedSection?.style.designName !== "design4" &&
                findSelectedSection?.style.designName !== "design5" &&
                findSelectedSection?.style.designName !== "design6" && (
                  <SwitchSetting
                    label="Left Title"
                    defaultChecked={
                      bannerStyle.designSettings.leftTitlePosition
                    }
                    onCheckedChange={(value) => {
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          leftTitlePosition: value,
                        },
                      });
                    }}
                  />
                )}

              <SwitchSetting
                label="Button"
                defaultChecked={bannerStyle.designSettings.showButtons}
                onCheckedChange={(value) => {
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      showButtons: value,
                    },
                  });
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
        </Tabs>
      )}
    </div>
  );
}

export default BannerSettings;
