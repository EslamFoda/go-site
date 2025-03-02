import { Label } from "@/components/ui/label";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Benefit, SubscriptionPlan } from "@/types/sectionsTypes/pricing";
import React from "react";
import { Minus, PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Make sure you have this package installed
import { Input } from "@/components/ui/input";

interface BenefitsProps {
  benefits: Benefit[];
  pageId: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  selectedSubscriptionPlan: SubscriptionPlan;
}

function Benefits({
  benefits,
  findSelectedSection,
  pageId,
  selectedSubscriptionPlan,
}: BenefitsProps) {
  const dispatch = useAppDispatch();

  const handleUpdateBenefit = (benefitId: string, title: string) => {
    // First, find the current subscription content
    const pricingContent =
      findSelectedSection?.content as SectionContentTypes["pricing"];

    // Create a new array of updated subscriptions
    const updatedSubscriptions = pricingContent.subscriptions.map(
      (subscription) => {
        if (subscription.id === selectedSubscriptionPlan.id) {
          // For the selected subscription, update the specific benefit
          return {
            ...subscription,
            benefits: subscription.benefits.map((benefit) =>
              benefit.id === benefitId ? { ...benefit, title } : benefit
            ),
          };
        }
        return subscription;
      }
    );

    // Update the subscription plan in the selected item state
    const updatedSelectedPlan = {
      ...selectedSubscriptionPlan,
      benefits: selectedSubscriptionPlan.benefits.map((benefit) =>
        benefit.id === benefitId ? { ...benefit, title } : benefit
      ),
    };

    // Update the selected item state
    dispatch(updateSelectedItem(updatedSelectedPlan));

    // Update the content in Redux
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptions: updatedSubscriptions,
      })
    );
  };

  const handleDeleteBenefit = (benefitId: string) => {
    // Find the current subscription content
    const pricingContent =
      findSelectedSection?.content as SectionContentTypes["pricing"];

    // Create a new array of updated subscriptions
    const updatedSubscriptions = pricingContent.subscriptions.map(
      (subscription) => {
        if (subscription.id === selectedSubscriptionPlan.id) {
          // Filter out the deleted benefit
          return {
            ...subscription,
            benefits: subscription.benefits.filter(
              (benefit) => benefit.id !== benefitId
            ),
          };
        }
        return subscription;
      }
    );

    // Update the selected plan without the deleted benefit
    const updatedSelectedPlan = {
      ...selectedSubscriptionPlan,
      benefits: selectedSubscriptionPlan.benefits.filter(
        (benefit) => benefit.id !== benefitId
      ),
    };

    // Update the selected item state
    dispatch(updateSelectedItem(updatedSelectedPlan));

    // Update the content in Redux
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptions: updatedSubscriptions,
      })
    );
  };

  const handleAddBenefit = () => {
    // Find the current subscription content
    const pricingContent =
      findSelectedSection?.content as SectionContentTypes["pricing"];

    // Create a new benefit
    const newBenefit: Benefit = {
      id: uuidv4(),
      title: `Add benefit ${benefits.length + 1}`,
    };

    // Create a new array of updated subscriptions
    const updatedSubscriptions = pricingContent.subscriptions.map(
      (subscription) => {
        if (subscription.id === selectedSubscriptionPlan.id) {
          // Add the new benefit to the selected subscription
          return {
            ...subscription,
            benefits: [...subscription.benefits, newBenefit],
          };
        }
        return subscription;
      }
    );

    // Update the selected plan with the new benefit
    const updatedSelectedPlan = {
      ...selectedSubscriptionPlan,
      benefits: [...selectedSubscriptionPlan.benefits, newBenefit],
    };

    // Update the selected item state
    dispatch(updateSelectedItem(updatedSelectedPlan));

    // Update the content in Redux
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        subscriptions: updatedSubscriptions,
      })
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="label">Benefits</Label>
        <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="flex items-center group overflow-hidden"
            >
              <Input
                className="flex-1 border-none outline-none "
                placeholder={`Benefit ${index + 1}`}
                value={benefit.title || ""}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleUpdateBenefit(benefit.id, e.target.value);
                }}
              />
              <div
                className="focus:outline-none group-focus-within:bg-muted/50 pe-3 h-10 w-max flex  text-destructive items-center justify-center"
                onClick={() => handleDeleteBenefit(benefit.id)}
              >
                <Minus size={16} />
              </div>
            </div>
          ))}
          <div
            className="group flex items-center justify-between cursor-pointer ps-3 pe-2 py-2 h-10"
            onClick={handleAddBenefit}
          >
            <span>Add benefit</span>
            <PlusIcon
              size={16}
              className="hidden group-hover:block transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
