import { Label } from "@/components/ui/label";
import { SubscriptionPlanType } from "@/types/sectionsTypes/pricing";
import React from "react";
interface SubscriptionTypeProps {
  planTypeValue: SubscriptionPlanType;
  onValueChange: (value: SubscriptionPlanType) => void;
}
function SubscriptionType({
  planTypeValue,
  onValueChange,
}: SubscriptionTypeProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Plan Type</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {[SubscriptionPlanType.ONETIME, SubscriptionPlanType.SUBSCRIPTION].map(
          (planType: SubscriptionPlanType) => (
            <div
              key={planType}
              onClick={() => {
                onValueChange(planType as SubscriptionPlanType);
              }}
              className={`${
                planTypeValue === planType ? "bg-muted-bg" : ""
              } flex items-center justify-center cursor-pointer w-full`}
            >
              {planType === SubscriptionPlanType.ONETIME && (
                <span>One-Time</span>
              )}
              {planType === SubscriptionPlanType.SUBSCRIPTION && (
                <span>Subscription</span>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SubscriptionType;
