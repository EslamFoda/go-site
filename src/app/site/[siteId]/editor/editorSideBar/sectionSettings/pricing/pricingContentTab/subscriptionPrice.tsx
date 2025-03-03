import { Label } from "@/components/ui/label";
import {
  PricingContent,
  SubscriptionPlan,
  SubscriptionPriceOption,
} from "@/types/sectionsTypes/pricing";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
interface SubscriptionPriceProps {
  pricingContent: PricingContent;
  selectedSubscriptionPlan: SubscriptionPlan;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
  setPriceOption: React.Dispatch<
    React.SetStateAction<SubscriptionPriceOption | null>
  >;
  setSelectedPlan: React.Dispatch<React.SetStateAction<number>>;
}
function SubscriptionPrice({
  pricingContent,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
  setPriceOption,
  setSelectedPlan,
}: SubscriptionPriceProps) {
  const subscriptionPlans = pricingContent.subscriptionPlans;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="label">Price</Label>
        <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          {subscriptionPlans.map((plan, index) => {
            if (!plan.billingCycle) return null;
            return (
              <div
                key={index}
                className="flex items-center justify-end"
                onClick={() => {
                  setPriceOption(selectedSubscriptionPlan.price[index]);
                  setSelectedPlan(index);
                }}
              >
                <div className="w-full px-3 h-10  flex items-center justify-between cursor-pointer hover:bg-muted/50">
                  <span>{plan.billingCycle}</span>
                  <ChevronRightIcon size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPrice;
