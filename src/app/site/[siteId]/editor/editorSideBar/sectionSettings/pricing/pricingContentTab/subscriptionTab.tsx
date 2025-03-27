import React from "react";
import Plan from "./plan";
import BackBtn from "@/components/shared/backBtn";
import { PricingContent } from "@/types/sectionsTypes/pricing";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
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

  return (
    <div>
      <BackBtn
        label="Subscription"
        handleBack={() => setOpenSubscriptionTab(false)}
      />
      <div className="space-y-3 px-5">
        {subscriptionPlans.map((plan, index) => (
          <Plan
            key={index}
            label={`Plan ${index + 1}`}
            planIndex={index}
            plan={plan}
            subscriptionPlans={subscriptionPlans}
            pageId={pageId}
            findSelectedSection={findSelectedSection}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionTab;
