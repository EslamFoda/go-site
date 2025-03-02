import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SubscriptionPlan } from "@/types/sectionsTypes/pricing";
import React from "react";
interface FeaturedProps {
  selectedSubscriptionPlan: SubscriptionPlan;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
}
function Featured({
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
}: FeaturedProps) {
  return (
    <div className="flex items-center justify-end">
      <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <div className="flex h-10 items-center justify-between px-3 py-2">
          <span>Featured</span>
          <Switch
            defaultChecked={selectedSubscriptionPlan.featured.isActive}
            checked={selectedSubscriptionPlan.featured.isActive}
            onCheckedChange={(value) => {
              handleUpdatePlanItem("featured", {
                ...selectedSubscriptionPlan.featured,
                isActive: value,
              });
            }}
          />
        </div>
        {selectedSubscriptionPlan.featured.isActive && (
          <div className="flex items-center ">
            <Input
              value={selectedSubscriptionPlan.featured.text}
              className="flex-1 border-none outline-none"
              placeholder="Add text"
              onChange={(e) => {
                handleUpdatePlanItem("featured", {
                  ...selectedSubscriptionPlan.featured,
                  text: e.target.value,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Featured;
