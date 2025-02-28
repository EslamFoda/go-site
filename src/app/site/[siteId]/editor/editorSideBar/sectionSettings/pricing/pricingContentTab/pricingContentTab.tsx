import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { PricingContent } from "@/types/sectionsTypes/pricing";
import React from "react";
interface PricingContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pricingContent: PricingContent;
  pageId: string;
}
function PricingContentTab({
  findSelectedSection,
  pricingContent,
  pageId,
}: PricingContentTabProps) {
  const dispatch = useAppDispatch();

  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      content tab
    </TabsContent>
  );
}

export default PricingContentTab;
