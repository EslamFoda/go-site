import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import PricingContentTab from "./pricingContentTab";
import PricingStyleTab from "./pricingStyleTab";

interface PricingSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function PricingSettings({ pageId, sections }: PricingSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);

  const dispatch = useAppDispatch();
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const selectedItem = useAppSelector(
    (state) => state.editor.present.selectedItem
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const pricingContent =
    findSelectedSection?.content as SectionContentTypes["pricing"];
  const pricingStyle =
    findSelectedSection?.style as SectionStyleTypes["pricing"];

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
        </TabsList>
        <PricingContentTab
          findSelectedSection={findSelectedSection}
          pageId={pageId}
          pricingContent={pricingContent}
        />
        <PricingStyleTab
          findSelectedSection={findSelectedSection}
          pageId={pageId}
          pricingStyle={pricingStyle}
          setSectionBgOpened={setSectionBgOpened}
        />
      </Tabs>
    </div>
  );
}

export default PricingSettings;
