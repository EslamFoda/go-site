import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { PricingStyle } from "@/types/sectionsTypes/pricing";
import { FirstDesign, SecDesign } from "@/icons/pricing";
import { updateStyle } from "@/reduxStore/action";
import TextSize from "../../settingsUi/TextSize";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";

const PRICING_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
];

interface PricingStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pricingStyle: PricingStyle;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}
function PricingStyleTab({
  findSelectedSection,
  pricingStyle,
  pageId,
  setSectionBgOpened,
}: PricingStyleTabProps) {
  const dispatch = useAppDispatch();

  if (!pricingStyle) return null;

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {PRICING_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id, {
                    designName: designName,
                  })
                );
              }}
              className="h-20 flex items-center justify-center relative border-muted-bg border-solid border-[1px] rounded-sm"
              key={i}
            >
              <Icon
                active={findSelectedSection?.style.designName === designName}
              />
            </div>
          );
        })}
      </div>
      <TextSize
        label="Text"
        titleSizeValue={pricingStyle.designSettings?.text}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id, {
              designSettings: {
                ...pricingStyle.designSettings!,
                text: value,
              },
            })
          );
        }}
      />
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        {pricingStyle.designSettings.sectionBackground.color === "none" && (
          <>
            <SwitchSetting
              label="Background"
              defaultChecked={pricingStyle.designSettings.background}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      background: value,
                      border: !value, // Toggle border opposite to background
                    },
                  })
                );
              }}
            />
            <SwitchSetting
              label="Border"
              defaultChecked={pricingStyle.designSettings.border}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...pricingStyle.designSettings!,
                      border: value,
                      background: !value, // Toggle background opposite to border
                    },
                  })
                );
              }}
            />
          </>
        )}

        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setSectionBgOpened(true);
          }}
        >
          <Label>Section Background</Label>
          <ChevronRightIcon size={18} />
        </div>
      </div>
    </TabsContent>
  );
}

export default PricingStyleTab;
