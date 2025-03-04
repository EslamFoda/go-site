import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import {
  PricingContent,
  SubscriptionPlan,
  SubscriptionPlanType,
} from "@/types/sectionsTypes/pricing";
import React from "react";
import SelectCurrency from "../../settingsUi/SelectCurrency";
import SubscriptionType from "../../settingsUi/subscriptionType";
import DraggableList from "@/components/ui/DraggableList";
import { v4 } from "uuid";
import { ChevronRightIcon } from "lucide-react";
interface PricingContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pricingContent: PricingContent;
  pageId: string;
  setOpenSubscriptionTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function PricingContentTab({
  findSelectedSection,
  pricingContent,
  pageId,
  setOpenSubscriptionTab,
}: PricingContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...pricingContent.subscriptions];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { subscriptions: newItems })
    );
  };

  const handleAddPlan = () => {
    const newItem = {
      id: v4(),
      title: "Plus",
      text: "",
      benefits: [
        {
          id: v4(),
          title: "Benefit 1",
        },
        {
          id: v4(),
          title: "Benefit 2",
        },
        {
          id: v4(),
          title: "Benefit 3",
        },
      ],
      oneTimePlan: {
        id: v4(),
        originalPrice: "60",
        salePrice: "50",
        isSale: false,
        offer: "",
        button: {
          text: "Get Started",
          link: "",
          openNewTab: false,
        },
      },
      price: [
        {
          originalPrice: "60",
          salePrice: "50",
          isSale: false,
          offer: "",
          button: {
            text: "Get Started",
            link: "",
            openNewTab: false,
          },
        },
        {
          originalPrice: "50",
          salePrice: "40",
          isSale: false,
          offer: "",
          button: {
            text: "Get Started",
            link: "",
            openNewTab: false,
          },
        },
      ],
      featured: {
        isActive: false,
        text: "Best Deal",
      },
    } as SubscriptionPlan;
    const newItems = [
      ...pricingContent.subscriptions,
      newItem,
    ] as SubscriptionPlan[];
    dispatch(
      updateContent(pageId, findSelectedSection.id, { subscriptions: newItems })
    );
  };

  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
          placeholder="Add label"
          value={pricingContent?.label}
          onChange={(e: any) => {
            updateContent(pageId, findSelectedSection.id, {
              label: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="title">Title</Label>
        <Input
          className="w-4/6"
          id="title"
          placeholder="Add title"
          value={pricingContent?.title}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                title: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea 
          className="w-4/6 "
          placeholder="Add subtitle"
          id={findSelectedSection?.id + "subtitle"}
          value={pricingContent?.subtitle}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                subtitle: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="Currency">Currency</Label>
        <div className="w-4/6 ">
          <SelectCurrency
            value={pricingContent?.currency.code}
            onChange={(currency) =>
              dispatch(
                updateContent(pageId, findSelectedSection?.id!, {
                  currency: currency,
                })
              )
            }
          />
        </div>
      </div>
      <SubscriptionType
        planTypeValue={pricingContent?.planType}
        onValueChange={(value) =>
          dispatch(
            updateContent(pageId, findSelectedSection?.id!, { planType: value })
          )
        }
      />
      {pricingContent?.planType === SubscriptionPlanType.SUBSCRIPTION && (
        <div className="flex items-center justify-end">
          <div
            className="w-4/6 px-3 h-10 border flex items-center justify-between cursor-pointer hover:bg-muted/50"
            onClick={() => setOpenSubscriptionTab(true)}
          >
            <span>Subscription</span>
            <ChevronRightIcon size={16} />
          </div>
        </div>
      )}
      <DraggableList
        label="Pricing"
        handleDragEnd={handleDragEnd}
        items={pricingContent?.subscriptions || []}
        handleAdd={handleAddPlan}
        updateSelectedItem={updateSelectedItem}
        maxItems={4}
      />
    </TabsContent>
  );
}

export default PricingContentTab;
