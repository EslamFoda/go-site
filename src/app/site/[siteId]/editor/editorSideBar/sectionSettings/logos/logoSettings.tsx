import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpFromLine, ChevronLeft, Trash2 } from "lucide-react";
import ColorSelector from "../settingsUi/ColorSelector";
import {
  ImagePlaceHolder,
  JustifyCenter,
  JustifyEnd,
  JustifyStart,
} from "@/icons/common";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseBgImage,
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import { Logo } from "@/types/sectionsTypes/logos";
import LogoContentTab from "./logoContentTab";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import HeightOrWidthSetting from "../settingsUi/HeightOrWidthSetting";
import LogoStyleTab from "./logoStyleTab";
import SpacingTab from "@/components/shared/spacingTab";
import SwitchSetting from "../settingsUi/SwitchSetting";
import ToggleGroup from "../settingsUi/toggleGroup";
import ImageSelector from "@/components/shared/imageSelector";

interface LogosSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function LogosSettings({ pageId, sections }: LogosSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [openSpacingTab, setOpenSpacingTab] = useState(false);
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [imageMode, setImageMode] = useState<"light" | "dark">("light");
  const [isSizeDesktop, setIsSizeDesktop] = useState(true);
  const dispatch = useAppDispatch();
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const { chooseImage, chooseBgImage } = useAppSelector(
    (state) => state.editor.present
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const logosContent =
    findSelectedSection?.content as SectionContentTypes["logos"];
  const logosStyle = findSelectedSection?.style as SectionStyleTypes["logos"];
  const logoItem = selectedItem as Logo;

  const handleToggleSize = () => {
    setIsSizeDesktop(!isSizeDesktop);
  };

  const handleDeleteLogo = () => {
    const filterLogo = logosContent?.logos?.filter(
      (logo) => logo.id !== logoItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        logos: filterLogo,
      })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleUpdateLogo = (updates: Partial<Logo>) => {
    const updatedLogos = logosContent.logos.map((logo) =>
      logo.id === logoItem.id ? { ...logo, ...updates } : logo
    );
    dispatch(updateSelectedItem({ ...logoItem, ...updates }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        logos: updatedLogos,
      })
    );
  };

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={logosStyle}
        setOpenSpacingTab={setOpenSpacingTab}
      />
    );
  }

  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
        selectedImgId={
          logosStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...logosStyle.designSettings,
                sectionBackground: {
                  ...logosStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.urls.regular,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...logosStyle.designSettings,
                sectionBackground: {
                  ...logosStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.url,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
      />
    );
  }

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={
          imageMode === "dark" ? logoItem?.darkImgId : logoItem?.lightImgId
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          if (imageMode === "dark") {
            handleUpdateLogo({
              darkImgId: image.id,
              urlDark: image.urls.regular,
            });
          } else {
            handleUpdateLogo({
              lightImgId: image.id,
              urlLight: image.urls.regular,
            });
          }
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          if (imageMode === "dark") {
            handleUpdateLogo({
              darkImgId: image.id,
              urlDark: image.url,
            });
          } else {
            handleUpdateLogo({
              lightImgId: image.id,
              urlLight: image.url,
            });
          }
        }}
      />
    );
  }

  if (logoItem)
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
            <Label className="cursor-pointer">Media</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteLogo}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 pb-1 space-y-2">
          <div
            onClick={() => {
              setImageMode("light");
              dispatch(openChooseImage());
            }}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Light</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className="bg-white basis-4/5 flex items-center justify-center h-full">
                {logoItem.urlLight ? (
                  <div
                    className="h-5 w-5"
                    style={{
                      backgroundImage: `url(${logoItem.urlLight})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <ImagePlaceHolder
                    fillColor="fill-muted"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              {logoItem.urlLight ? (
                <div
                  className=" flex items-center border-s justify-center basis-1/5 h-full "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateLogo({
                      urlLight: "",
                      lightImgId: "",
                    });
                  }}
                >
                  <Trash2 className="stroke-destructive" size={16} />
                </div>
              ) : (
                <div className=" flex items-center border-s justify-center basis-1/5 h-full ">
                  <ArrowUpFromLine size={18} />
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setImageMode("dark");
              dispatch(openChooseImage());
            }}
            className="space-y-1 cursor-pointer flex items-center justify-between"
          >
            <Label htmlFor="title">Dark</Label>
            <div className="w-4/6 border flex h-10 border-input rounded-md">
              <div className="bg-black basis-4/5 flex items-center justify-center h-full">
                {logoItem.urlDark ? (
                  <div
                    className="h-5 w-5"
                    style={{
                      backgroundImage: `url(${logoItem.urlDark})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ) : (
                  <ImagePlaceHolder
                    fillColor="fill-muted"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              {logoItem.urlDark ? (
                <div
                  className=" flex items-center border-s justify-center basis-1/5 h-full "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateLogo({
                      urlDark: "",
                      darkImgId: "",
                    });
                  }}
                >
                  <Trash2 className="stroke-destructive" size={16} />
                </div>
              ) : (
                <div className=" flex items-center border-s justify-center basis-1/5 h-full ">
                  <ArrowUpFromLine size={18} />
                </div>
              )}
            </div>
          </div>
          <HeightOrWidthSetting
            isDesktop={isSizeDesktop}
            label="Size"
            min={0.2}
            max={2}
            step={0.1}
            handleToggleSetting={handleToggleSize}
            customText={
              isSizeDesktop
                ? `${logoItem.size?.desktop}`
                : `${logoItem.size?.mobile}`
            }
            value={
              isSizeDesktop ? [logoItem.size?.desktop] : [logoItem.size?.mobile]
            }
            onValueChange={(value) => {
              const newSize = isSizeDesktop
                ? { desktop: value[0] }
                : { mobile: value[0] };

              handleUpdateLogo({ size: { ...logoItem.size, ...newSize } });
            }}
          />
        </div>
      </div>
    );

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={logosStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        color,
                        width: "fill",
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }
            }}
          />
          <ImageSelector
            imageUrl={
              logosStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseBgImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...logosStyle.designSettings,
                    sectionBackground: {
                      ...logosStyle.designSettings.sectionBackground,
                      media: {
                        imageUrl: "",
                        imageId: "",
                      },
                      textColor: "light",
                    },
                  },
                })
              )
            }
            onBack={() => {}}
            showBackButton={false}
          />
          {logosStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={logosStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        textColor: value,
                      },
                    },
                  })
                );
              }}
            />
          )}

          <ToggleGroup
            label="Height"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={logosStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...logosStyle.designSettings!,
                    sectionBackground: {
                      ...logosStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {logosStyle.designSettings.sectionBackground.color !== "none" && (
            <ToggleGroup
              label="Width"
              options={[
                { value: "fill", label: "Fill" },
                { value: "fit", label: "Fit" },
              ]}
              value={logosStyle.designSettings.sectionBackground.width}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        width: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {logosStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={logosStyle.designSettings.sectionBackground.overlayEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {logosStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={logosStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {logosStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={logosStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...logosStyle.designSettings!,
                      sectionBackground: {
                        ...logosStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {logosStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {logosStyle.designSettings.sectionBackground.color !== "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    logosStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...logosStyle.designSettings!,
                          sectionBackground: {
                            ...logosStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!logosStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    logosStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...logosStyle.designSettings!,
                          sectionBackground: {
                            ...logosStyle.designSettings.sectionBackground,
                            blur: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              <SwitchSetting
                label="Greyscale"
                defaultChecked={
                  logosStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...logosStyle.designSettings!,
                        sectionBackground: {
                          ...logosStyle.designSettings.sectionBackground,
                          greyScale: value,
                        },
                      },
                    })
                  );
                }}
              />
              <SwitchSetting
                label="Parallax"
                defaultChecked={
                  logosStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...logosStyle.designSettings!,
                        sectionBackground: {
                          ...logosStyle.designSettings.sectionBackground,
                          parallax: value,
                          blur: false,
                          blurEffect: "s",
                        },
                      },
                    })
                  );
                }}
              />
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
        <LogoContentTab
          findSelectedSection={findSelectedSection}
          items={logosContent?.logos || []}
          logosContent={logosContent}
          logoStyle={logosStyle}
          pageId={pageId}
        />
        <LogoStyleTab
          findSelectedSection={findSelectedSection}
          logoStyle={logosStyle}
          logosContent={logosContent}
          pageId={pageId}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default LogosSettings;
