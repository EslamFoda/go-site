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
import { SubscriptionPlan } from "@/types/sectionsTypes/pricing";
import SelectedPlan from "./pricingContentTab/selectedPlan";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";

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
  };

  const clearSubscriptionItem = () => {
    dispatch(updateSelectedItem(null));
  };

  if (selectedSubscriptionPlan) {
    return (
      <SelectedPlan
        clearSubscriptionItem={clearSubscriptionItem}
        handleUpdatePlanItem={handleUpdatePlanItem}
        handleDeletePlan={handleDeletePlan}
        selectedSubscriptionPlan={selectedSubscriptionPlan}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
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
