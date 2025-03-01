import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { SubscriptionPlan } from "@/types/sectionsTypes/pricing";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
interface SelectedPlanProps {
  pageId: string;
  selectedSubscriptionPlan: SubscriptionPlan;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  handleUpdatePlanItem: (field: keyof SubscriptionPlan, value: any) => void;
  clearSubscriptionItem: () => void;
  handleDeletePlan: () => void;
}
function SelectedPlan({
  pageId,
  findSelectedSection,
  selectedSubscriptionPlan,
  handleUpdatePlanItem,
  clearSubscriptionItem,
  handleDeletePlan,
}: SelectedPlanProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between p-5 items-center gap-4 border-b-[1px] border-b-muted-bg mb-3"
        onClick={clearSubscriptionItem}
      >
        <div className="flex gap-4 items-center cursor-pointer">
          <ChevronLeft size={18} />
          <Label className="cursor-pointer">
            {selectedSubscriptionPlan.title}
          </Label>
        </div>
        <div className="cursor-pointer" onClick={handleDeletePlan}>
          <Trash2 size="18px" color="red" />
        </div>
      </div>
      <div className="px-5 space-y-2">
        <div className="space-y-1 flex items-center justify-between">
          <Label htmlFor="title">Title</Label>
          <Input
            className="w-4/6"
            placeholder="Add plan name"
            id="title"
            value={selectedSubscriptionPlan?.title}
            onChange={(e: any) => {
              handleUpdatePlanItem("title", e.target.value);
            }}
          />
        </div>
        <div className="space-y-1 flex items-center justify-between">
          <Label htmlFor="title">Text</Label>
          <Input
            className="w-4/6"
            placeholder="Add text here"
            id="text"
            value={selectedSubscriptionPlan?.text}
            onChange={(e: any) => {
              handleUpdatePlanItem("text", e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectedPlan;
