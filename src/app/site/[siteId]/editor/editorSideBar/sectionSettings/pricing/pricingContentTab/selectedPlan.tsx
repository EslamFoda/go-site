import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
import Benefits from "./benefits";
import Price from "./price";
import Featured from "./featured";
import SubscriptionPrice from "./subscriptionPrice";
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
}
function SelectedPlan({
  pageId,
  findSelectedSection,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
  setPriceOption,
  clearSubscriptionItem,
  handleDeletePlan,
}: SelectedPlanProps) {
  const pricingContent =
    findSelectedSection?.content as SectionContentTypes["pricing"];

  if (!selectedSubscriptionPlan) return null;

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between p-5 items-center gap-4 border-b-[1px] border-b-muted-bg mb-3"
        onClick={clearSubscriptionItem}
      >
        <div className="flex gap-4 items-center cursor-pointer">
          <ChevronLeft size={18} />
          <Label className="cursor-pointer">
            {selectedSubscriptionPlan?.title}
          </Label>
        </div>
        <div className="cursor-pointer" onClick={handleDeletePlan}>
          <Trash2 size="18px" color="red" />
        </div>
      </div>
      <div className="px-5 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="title">Title</Label>
          <Input
            className="w-4/6"
            placeholder="Add plan name"
            id="title"
            value={selectedSubscriptionPlan?.title}
            onChange={(e: any) => {
              handleUpdatePlanItem("title", e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="title">Text</Label>
          <Input
            className="w-4/6"
            placeholder="Add text here"
            id="text"
            value={selectedSubscriptionPlan?.text}
            onChange={(e: any) => {
              handleUpdatePlanItem("text", e.target.value);
            }}
          />
        </div>
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
