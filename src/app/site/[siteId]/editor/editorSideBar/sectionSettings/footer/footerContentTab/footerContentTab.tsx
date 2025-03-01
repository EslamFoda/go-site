import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  EditorPage,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateGlobalContent, updatePageSetting } from "@/reduxStore/action";
import { ChevronRightIcon } from "lucide-react";

interface FooterContentTabProps {
  pageId: string;
  footerContent: FooterContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenLinkTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSocialTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCopyRightTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTextTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function FooterContentTab({
  findSelectedSection,
  footerContent,
  pageId,
  setOpenLinkTab,
  setOpenButtonsTab,
  setOpenSocialTab,
  setOpenCopyRightTab,
  setOpenTextTab,
}: FooterContentTabProps) {
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
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Site Logo"
          defaultChecked={footerContent?.siteLogo}
          onCheckedChange={(value) => {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                ...footerContent,
                siteLogo: value,
              })
            );
          }}
        />
      </div>

      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <div
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-muted/50"
          onClick={() => {
            setOpenTextTab(true);
          }}
        >
          <Label>Text</Label>
          <ChevronRightIcon size={16} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-muted/50"
          onClick={() => {
            setOpenLinkTab(true);
          }}
        >
          <Label>Links</Label>
          <ChevronRightIcon size={16} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-muted/50"
          onClick={() => {
            setOpenButtonsTab(true);
          }}
        >
          <Label>Buttons</Label>
          <ChevronRightIcon size={16} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-muted/50"
          onClick={() => {
            setOpenSocialTab(true);
          }}
        >
          <Label>Social</Label>
          <ChevronRightIcon size={16} />
        </div>
        <div
          className="flex items-center cursor-pointer justify-between p-3 hover:bg-muted/50"
          onClick={() => {
            setOpenCopyRightTab(true);
          }}
        >
          <Label>Copyright</Label>
          <ChevronRightIcon size={16} />
        </div>
        <SwitchSetting
          label="Show Footer"
          defaultChecked={pageSettings?.showFooter}
          onCheckedChange={(value) => {
            dispatch(
              updatePageSetting(pageId, {
                ...pageSettings,
                showFooter: value,
              })
            );
          }}
        />
      </div>
    </TabsContent>
  );
}

export default FooterContentTab;
