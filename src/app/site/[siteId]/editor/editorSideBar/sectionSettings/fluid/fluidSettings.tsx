import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import ElementTab from "./elementsTab";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import FluidSettingsTab from "./fluidSettingsTab";
import BackBtn from "@/components/shared/backBtn";
import { closeDrawer, closeSideBar } from "@/reduxStore/action";

interface FluidSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function FluidSettings({ pageId, sections }: FluidSettingsProps) {
  const [tabValue, setTabValue] = useState("elements");
  const dispatch = useAppDispatch();
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  return (
    <div>
      <BackBtn
        label="Fluid"
        btnContainerClassName="max-md:hidden"
        handleBack={() => dispatch(closeSideBar())}
      />
      <BackBtn
        doneBtn
        btnContainerClassName="w-full md:hidden"
        label="Fluid"
        handleBack={() => dispatch(closeDrawer())}
      />
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="settings">Grid settings</TabsTrigger>
        </TabsList>

        <ElementTab />
        <FluidSettingsTab pageId={pageId} section={findSelectedSection} />
      </Tabs>
    </div>
  );
}

export default FluidSettings;
