import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  PricingContent,
  SubscriptionPlan,
} from "@/types/sectionsTypes/pricing";
import validator from "validator";
interface PriceProps {
  pricingContent: PricingContent;
  selectedSubscriptionPlan: SubscriptionPlan;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
}
function Price({
  pricingContent,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
}: PriceProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="label">Price</Label>
        <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          <div className="flex items-center group overflow-hidden">
            <div className="focus:outline-none group-focus-within:bg-muted/50 ps-3 h-10 w-max flex  items-center justify-center">
              {pricingContent.currency.symbol}
            </div>
            <Input
              value={selectedSubscriptionPlan.oneTimePlan.originalPrice}
              className="flex-1 border-none outline-none"
              placeholder="0"
              onChange={(e) => {
                handleUpdatePlanItem("oneTimePlan", {
                  ...selectedSubscriptionPlan.oneTimePlan,
                  originalPrice: e.target.value,
                });
              }}
            />
          </div>
          {selectedSubscriptionPlan.oneTimePlan.isSale && (
            <div className="flex items-center group overflow-hidden">
              <div className="focus:outline-none group-focus-within:bg-muted/50 ps-3 h-10 w-max flex  items-center justify-center">
                {pricingContent.currency.symbol}
              </div>
              <Input
                value={selectedSubscriptionPlan.oneTimePlan.salePrice}
                className="flex-1 border-none outline-none"
                placeholder="0"
                onChange={(e) => {
                  handleUpdatePlanItem("oneTimePlan", {
                    ...selectedSubscriptionPlan.oneTimePlan,
                    salePrice: e.target.value,
                  });
                }}
              />
            </div>
          )}
          <div className="flex h-10 items-center justify-between px-3 py-2">
            <span>Sale Price</span>
            <Switch
              defaultChecked={selectedSubscriptionPlan.oneTimePlan.isSale}
              checked={selectedSubscriptionPlan.oneTimePlan.isSale}
              onCheckedChange={(value) => {
                handleUpdatePlanItem("oneTimePlan", {
                  ...selectedSubscriptionPlan.oneTimePlan,
                  isSale: value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="Offer">Offer</Label>
        <Input
          className="w-4/6"
          placeholder="25% off"
          id="Offer"
          value={selectedSubscriptionPlan?.oneTimePlan.offer}
          onChange={(e: any) => {
            handleUpdatePlanItem("oneTimePlan", {
              ...selectedSubscriptionPlan.oneTimePlan,
              offer: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="Button">Button</Label>
        <Input
          className="w-4/6"
          placeholder="Add button text"
          id="Button"
          value={selectedSubscriptionPlan?.oneTimePlan.button.text}
          onChange={(e: any) => {
            handleUpdatePlanItem("oneTimePlan", {
              ...selectedSubscriptionPlan.oneTimePlan,
              button: {
                ...selectedSubscriptionPlan.oneTimePlan.button,
                text: e.target.value,
              },
            });
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="Link">Link</Label>
        <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
          <div className="flex items-center">
            <Input
              value={selectedSubscriptionPlan.oneTimePlan.button.link}
              className="flex-1 border-none outline-none"
              placeholder="Paste link"
              onChange={(e) => {
                handleUpdatePlanItem("oneTimePlan", {
                  ...selectedSubscriptionPlan.oneTimePlan,
                  button: {
                    ...selectedSubscriptionPlan.oneTimePlan.button,
                    link: e.target.value,
                  },
                });
              }}
            />
          </div>

          {validator.isURL(
            selectedSubscriptionPlan.oneTimePlan.button.link
          ) && (
            <div className="flex h-10 items-center justify-between px-3 py-2">
              <span>Open in new tab</span>
              <Switch
                defaultChecked={
                  selectedSubscriptionPlan.oneTimePlan.button.openNewTab
                }
                checked={selectedSubscriptionPlan.oneTimePlan.button.openNewTab}
                onCheckedChange={(value) => {
                  handleUpdatePlanItem("oneTimePlan", {
                    ...selectedSubscriptionPlan.oneTimePlan,
                    button: {
                      ...selectedSubscriptionPlan.oneTimePlan.button,
                      openNewTab: value,
                    },
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Price;
