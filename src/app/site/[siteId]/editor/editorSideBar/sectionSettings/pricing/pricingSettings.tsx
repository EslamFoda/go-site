import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import PricingContentTab from "./pricingContentTab";
import PricingStyleTab from "./pricingStyleTab";
import SubscriptionTab from "./pricingContentTab/subscriptionTab";
import {
  SubscriptionPlan,
  SubscriptionPriceOption,
} from "@/types/sectionsTypes/pricing";
import SelectedPlan from "./pricingContentTab/selectedPlan";
import {
  closeDrawer,
  closeSideBar,
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import PriceOption from "./pricingContentTab/priceOption";
import BackBtn from "@/components/shared/backBtn";
import ColorSelector from "../settingsUi/ColorSelector";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import SpacingTab from "@/components/shared/spacingTab";
import ImageSelector from "@/components/shared/imageSelector";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import ToggleGroup from "../settingsUi/toggleGroup";
import SwitchSetting from "../settingsUi/SwitchSetting";

interface PricingSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function PricingSettings({ pageId, sections }: PricingSettingsProps) {
  const dispatch = useAppDispatch();
  const { selectedSection, selectedItem, chooseImage } = useAppSelector(
    (state) => state.editor.present
  );
  const [tabValue, setTabValue] = useState("content");
  const [openSpacingTab, setOpenSpacingTab] = useState(false);
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [priceOption, setPriceOption] =
    useState<SubscriptionPriceOption | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [openSubscriptionTab, setOpenSubscriptionTab] = useState(false);
  const selectedSubscriptionPlan = selectedItem as SubscriptionPlan;

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const pricingContent =
    findSelectedSection?.content as SectionContentTypes["pricing"];
  const pricingStyle =
    findSelectedSection?.style as SectionStyleTypes["pricing"];

  const handleDeletePlan = () => {
    const filterPlan = pricingContent.subscriptions.filter(
      (subscription) => subscription.id !== selectedSubscriptionPlan?.id
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptions: filterPlan,
      })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleUpdatePlanItem = (field: keyof SubscriptionPlan, value: any) => {
    // Special handling for featured toggle
    if (field === "featured") {
      const updatedPlans = pricingContent.subscriptions.map((plan) => {
        if (plan.id === selectedSubscriptionPlan.id) {
          return {
            ...plan,
            featured: {
              ...plan.featured,
              ...(typeof value === "object" ? value : {}),
              isActive: value.isActive,
            },
          };
        } else {
          // Disable featured for other plans if this one is being activated
          return value.isActive
            ? {
                ...plan,
                featured: {
                  ...plan.featured,
                  isActive: false,
                },
              }
            : plan;
        }
      });

      // Dispatch updates
      dispatch(
        updateSelectedItem({
          ...selectedSubscriptionPlan,
          featured: {
            ...selectedSubscriptionPlan.featured,
            ...(typeof value === "object" ? value : {}),
            isActive: value.isActive,
          },
        })
      );
      dispatch(
        updateContent(pageId, findSelectedSection.id, {
          subscriptions: updatedPlans,
        })
      );
    } else {
      // Original handling for other fields
      const updatedPlans = pricingContent.subscriptions.map((plan) =>
        plan.id === selectedSubscriptionPlan.id
          ? { ...plan, [field]: value }
          : plan
      );

      dispatch(
        updateSelectedItem({ ...selectedSubscriptionPlan, [field]: value })
      );
      dispatch(
        updateContent(pageId, findSelectedSection.id, {
          subscriptions: updatedPlans,
        })
      );
    }
  };

  const clearSubscriptionItem = () => {
    dispatch(updateSelectedItem(null));
  };

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={
          pricingStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...pricingStyle.designSettings,
                sectionBackground: {
                  ...pricingStyle.designSettings.sectionBackground,
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
                ...pricingStyle.designSettings,
                sectionBackground: {
                  ...pricingStyle.designSettings.sectionBackground,
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

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={pricingStyle}
        setOpenSpacingTab={setOpenSpacingTab}
        showPadding
      />
    );
  }

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          doneBtn
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={pricingStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
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
                      ...pricingStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
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
              pricingStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...pricingStyle.designSettings,
                    sectionBackground: {
                      ...pricingStyle.designSettings.sectionBackground,
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
          {pricingStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={pricingStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
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
            value={pricingStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...pricingStyle.designSettings!,
                    sectionBackground: {
                      ...pricingStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {pricingStyle.designSettings.sectionBackground.color !== "none" && (
            <ToggleGroup
              label="Width"
              options={[
                { value: "fill", label: "Fill" },
                { value: "fit", label: "Fit" },
              ]}
              value={pricingStyle.designSettings.sectionBackground.width}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
                        width: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {pricingStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={
                pricingStyle.designSettings.sectionBackground.overlayEffect
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {pricingStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={pricingStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {pricingStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={pricingStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      sectionBackground: {
                        ...pricingStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {pricingStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {pricingStyle.designSettings.sectionBackground.color !==
                "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    pricingStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...pricingStyle.designSettings!,
                          sectionBackground: {
                            ...pricingStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!pricingStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    pricingStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...pricingStyle.designSettings!,
                          sectionBackground: {
                            ...pricingStyle.designSettings.sectionBackground,
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
                  pricingStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...pricingStyle.designSettings!,
                        sectionBackground: {
                          ...pricingStyle.designSettings.sectionBackground,
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
                  pricingStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...pricingStyle.designSettings!,
                        sectionBackground: {
                          ...pricingStyle.designSettings.sectionBackground,
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

  if (priceOption) {
    return (
      <PriceOption
        priceOption={priceOption}
        setPriceOption={setPriceOption}
        handleUpdatePlanItem={handleUpdatePlanItem}
        pricingContent={pricingContent}
        selectedSubscriptionPlan={selectedSubscriptionPlan}
        selectedPlan={selectedPlan}
      />
    );
  }

  if (selectedSubscriptionPlan) {
    return (
      <SelectedPlan
        clearSubscriptionItem={clearSubscriptionItem}
        handleUpdatePlanItem={handleUpdatePlanItem}
        handleDeletePlan={handleDeletePlan}
        setPriceOption={setPriceOption}
        selectedSubscriptionPlan={selectedSubscriptionPlan}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
        setSelectedPlan={setSelectedPlan}
      />
    );
  }

  if (openSubscriptionTab) {
    return (
      <SubscriptionTab
        setOpenSubscriptionTab={setOpenSubscriptionTab}
        pricingContent={pricingContent}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
      />
    );
  }

  return (
    <div>
      <BackBtn
        label="Pricing"
        btnContainerClassName="max-md:hidden"
        handleBack={() => dispatch(closeSideBar())}
      />
      <BackBtn
        doneBtn
        btnContainerClassName="w-full md:hidden"
        label="Pricing"
        handleBack={() => dispatch(closeDrawer())}
      />
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        <PricingContentTab
          findSelectedSection={findSelectedSection}
          pageId={pageId}
          pricingContent={pricingContent}
          setOpenSubscriptionTab={setOpenSubscriptionTab}
        />
        <PricingStyleTab
          findSelectedSection={findSelectedSection}
          pageId={pageId}
          pricingStyle={pricingStyle}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default PricingSettings;
