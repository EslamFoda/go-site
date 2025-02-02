import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { updateGlobalContent, updatePageSetting } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  EditorPage,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { HeaderContent } from "@/types/sectionsTypes/header";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import SwitchSetting from "../../settingsUi/SwitchSetting";
interface HeaderContentTabProps {
  pageId: string;
  headerContent: HeaderContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenLinkTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAnnounceTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderContentTab({
  findSelectedSection,
  headerContent,
  pageId,
  setOpenButtonsTab,
  setOpenLinkTab,
  setOpenAnnounceTab,
}: HeaderContentTabProps) {
  const dispatch = useAppDispatch();
  const {
    editor: { pages },
    settings: { homePage },
  } = useAppSelector((state) => state.editor.present);

  const findActivePage =
    pages.find((page) => page.pageId === pageId) ||
    pages.find((page) => page.pageId === homePage);

  const { pageSettings } = findActivePage as EditorPage;

  return (
    <TabsContent className="space-y-2 px-5" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="logo">Logo</Label>
        <Input
          id="logo"
          className="w-4/6"
          value={headerContent?.Logo.text}
          onChange={(e: any) => {
            // @ts-ignore
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                ...headerContent,
                Logo: {
                  ...headerContent.Logo,
                  text: e.target.value,
                },
              })
            );
          }}
        />
      </div>
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenLinkTab(true);
          }}
        >
          <Label>Links</Label>
          <ChevronRightIcon size={18} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenButtonsTab(true);
          }}
        >
          <Label>Buttons</Label>
          <ChevronRightIcon size={18} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setOpenAnnounceTab(true);
          }}
        >
          <Label>Announcement</Label>
          <ChevronRightIcon size={18} />
        </div>
        <SwitchSetting
          label="Show Header"
          defaultChecked={pageSettings?.showHeader}
          onCheckedChange={(value) => {
            dispatch(
              updatePageSetting(pageId, {
                ...pageSettings,
                showHeader: value,
              })
            );
          }}
        />
      </div>
    </TabsContent>
  );
}

export default HeaderContentTab;
