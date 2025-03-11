import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateContent } from "@/reduxStore/action";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { SubscriptionPlanItem } from "@/types/sectionsTypes/pricing";

interface PlanProps {
  plan: SubscriptionPlanItem;
  label: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  subscriptionPlans: SubscriptionPlanItem[];
  planIndex: number;
}

const Plan: React.FC<PlanProps> = ({
  plan,
  label,
  findSelectedSection,
  pageId,
  subscriptionPlans,
  planIndex,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (
    key: keyof SubscriptionPlanItem,
    value: string | boolean
  ) => {
    // Always create a fresh copy of the array with proper typing
    let updatedSubscriptionPlans: SubscriptionPlanItem[] =
      subscriptionPlans.map((p) => ({ ...p }));

    if (key === "billingCycle") {
      // Check if this is the first plan with a billingCycle after all were empty
      const allPlansEmpty = updatedSubscriptionPlans.every(
        (p) => !p.billingCycle
      );

      // Update the current plan - ensure we're setting string value for billingCycle
      updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) => {
        if (idx === planIndex) {
          return { ...p, billingCycle: value as string };
        }
        return p;
      });

      // If all plans were empty and we're now adding a value, make this the default
      if (allPlansEmpty && value) {
        updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) => ({
          ...p,
          default: idx === planIndex,
        }));
      } else if (!value) {
        // If we're removing the billingCycle from the current plan
        const currentPlanIsDefault =
          updatedSubscriptionPlans[planIndex].default;

        if (currentPlanIsDefault) {
          // First make this plan not default
          updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) =>
            idx === planIndex ? { ...p, default: false } : p
          );

          // Find another plan with a billingCycle to make default
          const plansWithBillingCycle = updatedSubscriptionPlans.filter(
            (p, idx) => idx !== planIndex && p.billingCycle
          );

          if (plansWithBillingCycle.length > 0) {
            // Make the first plan with a billingCycle the default
            const indexToMakeDefault = updatedSubscriptionPlans.findIndex(
              (p, idx) => idx !== planIndex && p.billingCycle
            );

            updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) =>
              idx === indexToMakeDefault ? { ...p, default: true } : p
            );
          }
        }
      }
    } else if (key === "default") {
      // Count how many plans have billingCycle
      const plansWithBillingCycle = updatedSubscriptionPlans.filter(
        (p) => p.billingCycle
      );
      const currentPlanHasBillingCycle =
        !!updatedSubscriptionPlans[planIndex].billingCycle;

      if (value) {
        // If turning on default, make this the only default
        updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) => ({
          ...p,
          default: idx === planIndex,
        }));
      } else {
        // If turning off default...

        // If this is the only plan with billingCycle, prevent turning off
        if (plansWithBillingCycle.length === 1 && currentPlanHasBillingCycle) {
          // Don't make any changes - keep this plan as default
          // Return original plans to prevent toggling off
          return;
        }

        // Otherwise, if there are other plans with billingCycle, switch default to another plan
        if (plansWithBillingCycle.length > 1 && currentPlanHasBillingCycle) {
          // Find another plan with billingCycle to make default
          const indexToMakeDefault = updatedSubscriptionPlans.findIndex(
            (p, idx) => idx !== planIndex && p.billingCycle
          );

          updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) => ({
            ...p,
            default: idx === indexToMakeDefault,
          }));
        } else {
          // If no other plans with billingCycle, allow turning off
          updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) =>
            idx === planIndex ? { ...p, default: false } : p
          );
        }
      }
    } else if (key === "cycleDuration") {
      // For cycleDuration, ensure we're setting a string value
      updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) =>
        idx === planIndex ? { ...p, cycleDuration: value as string } : p
      );
    } else {
      // For other fields, ensure proper typing
      updatedSubscriptionPlans = updatedSubscriptionPlans.map((p, idx) => {
        if (idx === planIndex) {
          // Use type assertion to handle the correct type based on the key
          const updatedPlan = { ...p };
          if (typeof value === "boolean") {
            (updatedPlan as any)[key] = value;
          } else {
            (updatedPlan as any)[key] = value;
          }
          return updatedPlan;
        }
        return p;
      });
    }

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptionPlans: updatedSubscriptionPlans,
      })
    );
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="label">{label}</Label>
      <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        {["billingCycle", "cycleDuration"].map((field) => (
          <div key={field}>
            <input
              className="w-full h-10 border-none bg-transparent outline-none focus:bg-muted/50 px-3 py-2 placeholder:text-muted-foreground/50"
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              value={plan[field as keyof SubscriptionPlanItem] as string}
              onChange={(e) =>
                handleChange(
                  field as keyof SubscriptionPlanItem,
                  e.target.value
                )
              }
            />
          </div>
        ))}
        {Boolean(plan.billingCycle) && (
          <div className="flex h-10 items-center justify-between px-3 py-2">
            <span>Set as default</span>
            <Switch
              checked={plan.default}
              onCheckedChange={(value) => handleChange("default", value)}
              disabled={
                plan.default &&
                plan.billingCycle !== "" &&
                subscriptionPlans.filter((p) => p.billingCycle).length === 1
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
