import { Label } from "@/components/ui/label";
import {
  PricingContent,
  SubscriptionPlan,
} from "@/types/sectionsTypes/pricing";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
interface SubscriptionPriceOption {
  pricingContent: PricingContent;
  selectedSubscriptionPlan: SubscriptionPlan;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
//   setPriceOption: React.Dispatch<React.SetStateAction<SubscriptionPriceOption | null>>
}
function SubscriptionPrice({
  pricingContent,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
//   setPriceOption,
}: SubscriptionPriceOption) {
  const { plan1, plan2, plan3 } = pricingContent.subscriptionPlans;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="label">Price</Label>
        <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          {plan1.billingCycle && (
            <div className="flex items-center justify-end">
              <div
                className="w-full px-3 h-10  flex items-center justify-between cursor-pointer hover:bg-muted/50"
                onClick={() => {
                //   setPriceOption(selectedSubscriptionPlan.price.monthly);
                }}
              >
                <span>{plan1.billingCycle}</span>
                <ChevronRightIcon size={16} />
              </div>
            </div>
          )}
          {plan2.billingCycle && (
            <div className="flex items-center justify-end">
              <div
                className="w-full px-3 h-10  flex items-center justify-between cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  //   setOpenPriceTab(true);
                }}
              >
                <span>{plan2.billingCycle}</span>
                <ChevronRightIcon size={16} />
              </div>
            </div>
          )}
          {plan3.billingCycle && (
            <div className="flex items-center justify-end">
              <div
                className="w-full px-3 h-10  flex items-center justify-between cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  //   setOpenPriceTab(true);
                }}
              >
                <span>{plan3.billingCycle}</span>
                <ChevronRightIcon size={16} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPrice;
