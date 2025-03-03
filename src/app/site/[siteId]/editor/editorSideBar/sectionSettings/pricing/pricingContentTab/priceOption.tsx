import BackBtn from "@/components/shared/backBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  PricingContent,
  SubscriptionPlan,
  SubscriptionPriceOption,
} from "@/types/sectionsTypes/pricing";
import React from "react";
import validator from "validator";

interface PriceOptionProps {
  priceOption: SubscriptionPriceOption;
  selectedPlan: number | null;
  setPriceOption: React.Dispatch<
    React.SetStateAction<SubscriptionPriceOption | null>
  >;
  pricingContent: PricingContent;
  selectedSubscriptionPlan: SubscriptionPlan;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
}
function PriceOption({
  selectedPlan,
  priceOption,
  pricingContent,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
  setPriceOption,
}: PriceOptionProps) {
  if (selectedPlan === null) return null;

  const billingCycleText =
    pricingContent.subscriptionPlans[selectedPlan].billingCycle;
  return (
    <div>
      <BackBtn
        label={billingCycleText}
        handleBack={() => setPriceOption(null)}
      />
      <div className="px-5 space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="label">Price</Label>
          <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
            <div className="flex items-center group overflow-hidden">
              <div className="focus:outline-none group-focus-within:bg-muted/50 ps-3 h-10 w-max flex  items-center justify-center">
                {pricingContent.currency.symbol}
              </div>
              <Input
                value={
                  selectedSubscriptionPlan.price[selectedPlan].originalPrice
                }
                className="flex-1 border-none outline-none"
                placeholder="0"
                onChange={(e) => {
                  handleUpdatePlanItem("price", {
                    ...selectedSubscriptionPlan.price,
                    [selectedPlan]: {
                      ...selectedSubscriptionPlan.price[selectedPlan],
                      originalPrice: e.target.value,
                    },
                  });
                }}
              />
            </div>
            {selectedSubscriptionPlan.price[selectedPlan].isSale && (
              <div className="flex items-center group overflow-hidden">
                <div className="focus:outline-none group-focus-within:bg-muted/50 ps-3 h-10 w-max flex  items-center justify-center">
                  {pricingContent.currency.symbol}
                </div>
                <Input
                  value={selectedSubscriptionPlan.price[selectedPlan].salePrice}
                  className="flex-1 border-none outline-none"
                  placeholder="0"
                  onChange={(e) => {
                    handleUpdatePlanItem("price", {
                      ...selectedSubscriptionPlan.price,
                      [selectedPlan]: {
                        ...selectedSubscriptionPlan.price[selectedPlan],
                        salePrice: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            )}
            <div className="flex h-10 items-center justify-between px-3 py-2">
              <span>Sale Price</span>
              <Switch
                defaultChecked={
                  selectedSubscriptionPlan.price[selectedPlan].isSale
                }
                checked={selectedSubscriptionPlan.price[selectedPlan].isSale}
                onCheckedChange={(value) => {
                  handleUpdatePlanItem("price", {
                    ...selectedSubscriptionPlan.price,
                    [selectedPlan]: {
                      ...selectedSubscriptionPlan.price[selectedPlan],
                      isSale: value,
                    },
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
            value={selectedSubscriptionPlan?.price[selectedPlan].offer}
            onChange={(e: any) => {
              handleUpdatePlanItem("price", {
                ...selectedSubscriptionPlan.price,
                [selectedPlan]: {
                  ...selectedSubscriptionPlan.price[selectedPlan],
                  offer: e.target.value,
                },
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
            value={selectedSubscriptionPlan?.price[selectedPlan].button.text}
            onChange={(e: any) => {
              handleUpdatePlanItem("price", {
                ...selectedSubscriptionPlan.price,
                [selectedPlan]: {
                  ...selectedSubscriptionPlan.price[selectedPlan],
                  button: {
                    ...selectedSubscriptionPlan.price[selectedPlan].button,
                    text: e.target.value,
                  },
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
                value={
                  selectedSubscriptionPlan?.price[selectedPlan].button.link
                }
                className="flex-1 border-none outline-none"
                placeholder="Paste link"
                onChange={(e) => {
                  handleUpdatePlanItem("price", {
                    ...selectedSubscriptionPlan.price,
                    [selectedPlan]: {
                      ...selectedSubscriptionPlan.price[selectedPlan],
                      button: {
                        ...selectedSubscriptionPlan.price[selectedPlan].button,
                        link: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>

            {validator.isURL(
              selectedSubscriptionPlan?.price[selectedPlan].button.link
            ) && (
              <div className="flex h-10 items-center justify-between px-3 py-2">
                <span>Open in new tab</span>
                <Switch
                  defaultChecked={
                    selectedSubscriptionPlan?.price[selectedPlan].button
                      .openNewTab
                  }
                  checked={
                    selectedSubscriptionPlan?.price[selectedPlan].button
                      .openNewTab
                  }
                  onCheckedChange={(value) => {
                    handleUpdatePlanItem("price", {
                      ...selectedSubscriptionPlan.price,
                      [selectedPlan]: {
                        ...selectedSubscriptionPlan.price[selectedPlan],
                        button: {
                          ...selectedSubscriptionPlan.price[selectedPlan]
                            .button,
                          openNewTab: value,
                        },
                      },
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceOption;
