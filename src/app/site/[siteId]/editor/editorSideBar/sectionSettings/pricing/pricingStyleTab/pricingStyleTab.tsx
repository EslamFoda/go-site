import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";

import { PricingStyle } from "@/types/sectionsTypes/pricing";

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
      style tab
    </TabsContent>
  );
}

export default PricingStyleTab;
