import React from "react";
import SocialList from "./socialList";
import { FooterContent } from "@/types/sectionsTypes/footer";
import BackBtn from "@/components/shared/backBtn";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
interface SocialProps {
  pageId: string;
  footerContent: FooterContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  handleDragEnd: (result: any) => void;
  setOpenSocialTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function Social({
  findSelectedSection,
  pageId,
  footerContent,
  handleDragEnd,
  setOpenSocialTab,
}: SocialProps) {
  return (
    <div>
      <BackBtn
        label="Social links"
        handleBack={() => {
          setOpenSocialTab(false);
        }}
      />
      <SocialList
        handleDragEnd={handleDragEnd}
        items={footerContent?.social || []}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
        footerContent={footerContent}
      />
    </div>
  );
}

export default Social;
