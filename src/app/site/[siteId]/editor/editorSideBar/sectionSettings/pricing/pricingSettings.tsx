import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
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
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import PriceOption from "./pricingContentTab/priceOption";
import BackBtn from "@/components/shared/backBtn";
import ColorSelector from "../settingsUi/ColorSelector";
import { Label } from "@/components/ui/label";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";

interface PricingSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function PricingSettings({ pageId, sections }: PricingSettingsProps) {
  const dispatch = useAppDispatch();
  const { selectedSection, selectedItem } = useAppSelector(
    (state) => state.editor.present
  );
  const [tabValue, setTabValue] = useState("content");
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
    const updatedPlans = pricingContent.subscriptions.map((plan) => {
      if (field === "featured") {
        return {
          ...plan,
          featured:
            plan.id === selectedSubscriptionPlan.id
              ? { ...plan.featured, ...value } // Merge changes correctly
              : { ...plan.featured, isActive: false },
        };
      }
  
      return plan.id === selectedSubscriptionPlan.id ? { ...plan, [field]: value } : plan;
    });
  
    dispatch(
      updateSelectedItem({
        ...selectedSubscriptionPlan,
        [field]: { ...selectedSubscriptionPlan.featured, ...value }, // Ensure deep update
      })
    );
  
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptions: updatedPlans,
      })
    );
  };
  

  const clearSubscriptionItem = () => {
    dispatch(updateSelectedItem(null));
  };

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
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
          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...pricingStyle.designSettings!,
                        sectionBackground: {
                          ...pricingStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  pricingStyle.designSettings.sectionBackground.height ===
                  "fill"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fill
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...pricingStyle.designSettings!,
                        sectionBackground: {
                          ...pricingStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  pricingStyle.designSettings.sectionBackground.height === "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {pricingStyle.designSettings.sectionBackground.height === "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...pricingStyle.designSettings!,
                          sectionBackground: {
                            ...pricingStyle.designSettings.sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    pricingStyle.designSettings.sectionBackground.align ===
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
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...pricingStyle.designSettings!,
                          sectionBackground: {
                            ...pricingStyle.designSettings.sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    pricingStyle.designSettings.sectionBackground.align ===
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
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...pricingStyle.designSettings!,
                          sectionBackground: {
                            ...pricingStyle.designSettings.sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    pricingStyle.designSettings.sectionBackground.align ===
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
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
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
        />
      </Tabs>
    </div>
  );
}

export default PricingSettings;
