import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import ColorSelector from "../settingsUi/ColorSelector";
import BannerContentTab from "./bannerContentTab";
import BannerStyleTab from "./bannerStyleTab";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";

function BannerSettings({}) {
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [tabValue, setTabValue] = useState("content");
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editor.editor);
  const selectedSection = useAppSelector(
    (state) => state.editor.selectedSection
  );
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
              selectedColor={bannerStyle.designSettings.sectionBackground.color}
              handleChangeColor={(color) => {
                // updateStyle(findSelectedSection?.id!, {
                //   designSettings: {
                //     ...bannerStyle.designSettings!,
                //     sectionBackground: {
                //       ...bannerStyle.designSettings.sectionBackground,
                //       color,
                //     },
                //   },
                // });

                dispatch(
                  updateStyle(findSelectedSection?.id!, {
                    designSettings: {
                      ...bannerStyle.designSettings!,
                      sectionBackground: {
                        ...bannerStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }}
            />

            <div className="space-y-1 flex items-center justify-between">
              <Label>Height</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    // updateStyle(findSelectedSection?.id!, {
                    //   designSettings: {
                    //     ...bannerStyle.designSettings!,
                    //     sectionBackground: {
                    //       ...bannerStyle.designSettings.sectionBackground,
                    //       height: "fill",
                    //       align: "center",
                    //     },
                    //   },
                    // });

                    dispatch(
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            height: "fill",
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.height ===
                    "fill"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  fill
                </div>
                <div
                  onClick={() => {
                    // updateStyle(findSelectedSection?.id!, {
                    //   designSettings: {
                    //     ...bannerStyle.designSettings!,
                    //     sectionBackground: {
                    //       ...bannerStyle.designSettings.sectionBackground,
                    //       height: "fit",
                    //       align: "center",
                    //     },
                    //   },
                    // });
                    dispatch(
                      updateStyle(findSelectedSection?.id!, {
                        designSettings: {
                          ...bannerStyle.designSettings!,
                          sectionBackground: {
                            ...bannerStyle.designSettings.sectionBackground,
                            height: "fit",
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    bannerStyle.designSettings.sectionBackground.height ===
                    "fit"
                      ? "bg-muted-bg"
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
                <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                  <div
                    onClick={() => {
                      // updateStyle(findSelectedSection?.id!, {
                      //   designSettings: {
                      //     ...bannerStyle.designSettings!,
                      //     sectionBackground: {
                      //       ...bannerStyle.designSettings.sectionBackground,
                      //       align: "start",
                      //     },
                      //   },
                      // });

                      dispatch(
                        updateStyle(findSelectedSection?.id!, {
                          designSettings: {
                            ...bannerStyle.designSettings!,
                            sectionBackground: {
                              ...bannerStyle.designSettings.sectionBackground,
                              align: "start",
                            },
                          },
                        })
                      );
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
                      "start"
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
                            ...bannerStyle.designSettings!,
                            sectionBackground: {
                              ...bannerStyle.designSettings.sectionBackground,
                              align: "center",
                            },
                          },
                        })
                      );
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
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
                            ...bannerStyle.designSettings!,
                            sectionBackground: {
                              ...bannerStyle.designSettings.sectionBackground,
                              align: "end",
                            },
                          },
                        })
                      );
                    }}
                    className={`${
                      bannerStyle.designSettings.sectionBackground.align ===
                      "end"
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
      ) : (
        <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
          <TabsList className="grid m-5 grid-cols-2">
            <TabsTrigger value="content">content</TabsTrigger>
            <TabsTrigger value="style">style</TabsTrigger>
          </TabsList>
          <BannerContentTab
            bannerContent={bannerContent}
            findSelectedSection={findSelectedSection}
          />
          <BannerStyleTab
            bannerContent={bannerContent}
            bannerStyle={bannerStyle}
            findSelectedSection={findSelectedSection}
            setSectionBgOpened={setSectionBgOpened}
          />
        </Tabs>
      )}
    </div>
  );
}

export default BannerSettings;
