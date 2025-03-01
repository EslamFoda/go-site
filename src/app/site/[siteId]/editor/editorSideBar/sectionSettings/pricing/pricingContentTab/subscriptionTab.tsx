import React from "react";
import Plan from "./plan";
import BackBtn from "@/components/shared/backBtn";
import { PricingContent } from "@/types/sectionsTypes/pricing";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { PlanType } from "@/types/common";
interface SubscriptionTabProps {
  pricingContent: PricingContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  setOpenSubscriptionTab: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubscriptionTab({
  pricingContent,
  findSelectedSection,
  pageId,
  setOpenSubscriptionTab,
}: SubscriptionTabProps) {
  const { subscriptionPlans } = pricingContent;
  const { plan1, plan2, plan3 } = subscriptionPlans;

  return (
    <div>
      <BackBtn
        label="Subscription"
        handleBack={() => setOpenSubscriptionTab(false)}
      />
      <div className="space-y-3 px-5">
        <div>
          <Plan
            label="Plan 1"
            planType={PlanType.plan1}
            plan={plan1}
            subscriptionPlans={subscriptionPlans}
            pageId={pageId}
            findSelectedSection={findSelectedSection}
          />
        </div>
        <div>
          <Plan
            label="Plan 2"
            planType={PlanType.plan2}
            plan={plan2}
            subscriptionPlans={subscriptionPlans}
            pageId={pageId}
            findSelectedSection={findSelectedSection}
          />
        </div>
        <div>
          <Plan
            label="Plan 3"
            planType={PlanType.plan3}
            plan={plan3}
            subscriptionPlans={subscriptionPlans}
            pageId={pageId}
            findSelectedSection={findSelectedSection}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTab;
