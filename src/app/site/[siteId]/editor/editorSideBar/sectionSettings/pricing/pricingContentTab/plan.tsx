import { Label } from "@/components/ui/label";
import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  SubscriptionPlans,
  SubscriptionPlanSettings,
} from "@/types/sectionsTypes/pricing";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateContent } from "@/reduxStore/action";
import { PlanType } from "@/types/common";
interface PlanProps {
  plan: SubscriptionPlanSettings;
  label: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  subscriptionPlans: SubscriptionPlans;
  planType: PlanType;
}
function Plan({
  plan,
  label,
  findSelectedSection,
  pageId,
  subscriptionPlans,
  planType,
}: PlanProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="label">{label}</Label>
      <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <div>
          <input
            className="w-full h-10 border-none bg-transparent outline-none bg-none focus:bg-muted/50 px-3 py-2 placeholder:text-muted-foreground/50"
            placeholder="Billing cycle"
            value={plan.billingCycle}
            onChange={(e) => {
              dispatch(
                updateContent(pageId, findSelectedSection.id, {
                  subscriptionPlans: {
                    ...subscriptionPlans,
                    [planType]: {
                      ...subscriptionPlans[planType],
                      billingCycle: e.target.value,
                    },
                  },
                })
              );
            }}
          />
        </div>
        <div>
          <input
            className="w-full h-10 border-none bg-transparent outline-none bg-none focus:bg-muted/50 px-3 py-2 placeholder:text-muted-foreground/50"
            placeholder="Cycle duration"
            value={plan.cycleDuration}
            onChange={(e) => {
              dispatch(
                updateContent(pageId, findSelectedSection.id, {
                  subscriptionPlans: {
                    ...subscriptionPlans,
                    [planType]: {
                      ...subscriptionPlans[planType],
                      cycleDuration: e.target.value,
                    },
                  },
                })
              );
            }}
          />
        </div>
        {plan.billingCycle.length > 0 && (
          <div className="flex h-10 items-center justify-between px-3 py-2">
            <span>Set as default</span>
            <Switch
              defaultChecked={plan.default}
              checked={plan.default}
              onCheckedChange={(value) =>
                dispatch(
                  updateContent(pageId, findSelectedSection.id, {
                    subscriptionPlans: {
                      ...subscriptionPlans,
                      [planType]: {
                        ...subscriptionPlans[planType],
                        default: value,
                      },
                    },
                  })
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Plan;
