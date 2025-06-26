import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import {
  SubscriptionPlan,
  SubscriptionPlanType,
  SubscriptionPriceOption,
} from "@/types/sectionsTypes/pricing";
import React from "react";
import Benefits from "./benefits";
import Price from "./price";
import Featured from "./featured";
import SubscriptionPrice from "./subscriptionPrice";
import EditText from "../../settingsUi/EditText";
import ItemBackBtn from "@/components/shared/itemBackBtn/itemBackBtn";
import { useAppDispatch } from "@/reduxStore/hooks";
import { closeDrawer } from "@/reduxStore/action";
interface SelectedPlanProps {
  pageId: string;
  selectedSubscriptionPlan: SubscriptionPlan;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
  setPriceOption: React.Dispatch<
    React.SetStateAction<SubscriptionPriceOption | null>
  >;
  clearSubscriptionItem: () => void;
  handleDeletePlan: () => void;
  setSelectedPlan: React.Dispatch<React.SetStateAction<number>>;
}
function SelectedPlan({
  pageId,
  findSelectedSection,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
  setPriceOption,
  clearSubscriptionItem,
  handleDeletePlan,
  setSelectedPlan,
}: SelectedPlanProps) {
  const dispatch = useAppDispatch();
  const pricingContent =
    findSelectedSection?.content as SectionContentTypes["pricing"];

  if (!selectedSubscriptionPlan) return null;

  return (
    <div className="space-y-2">
      <ItemBackBtn
        title={selectedSubscriptionPlan.title}
        handleBack={clearSubscriptionItem}
        handleDelete={handleDeletePlan}
      />
      <div className="px-5 space-y-2">
        <EditText
          label="Title"
          placeholder="Add plan name"
          id="title"
          value={selectedSubscriptionPlan?.title}
          handleUpdate={(e: any) =>
            handleUpdatePlanItem("title", e.target.value)
          }
        />
        <EditText
          label="Text"
          placeholder="Add text here"
          id="Text"
          value={selectedSubscriptionPlan?.text}
          handleUpdate={(e: any) =>
            handleUpdatePlanItem("text", e.target.value)
          }
        />

        <Benefits
          benefits={selectedSubscriptionPlan?.benefits}
          pageId={pageId}
          findSelectedSection={findSelectedSection}
          selectedSubscriptionPlan={selectedSubscriptionPlan}
        />
        {pricingContent?.planType === SubscriptionPlanType.ONETIME && (
          <Price
            handleUpdatePlanItem={handleUpdatePlanItem}
            selectedSubscriptionPlan={selectedSubscriptionPlan}
            pricingContent={pricingContent}
          />
        )}
        {pricingContent?.planType === SubscriptionPlanType.SUBSCRIPTION && (
          <SubscriptionPrice
            handleUpdatePlanItem={handleUpdatePlanItem}
            selectedSubscriptionPlan={selectedSubscriptionPlan}
            pricingContent={pricingContent}
            setPriceOption={setPriceOption}
            setSelectedPlan={setSelectedPlan}
          />
        )}
        <Featured
          handleUpdatePlanItem={handleUpdatePlanItem}
          selectedSubscriptionPlan={selectedSubscriptionPlan}
        />
      </div>
    </div>
  );
}

export default SelectedPlan;
