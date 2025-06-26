import React from "react";
import SocialList from "./socialList";
import { FooterContent } from "@/types/sectionsTypes/footer";
import BackBtn from "@/components/shared/backBtn";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import SocialIconsList from "./socialIconsList";
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
        doneBtn
        label="Social links"
        handleBack={() => {
          setOpenSocialTab(false);
        }}
      />
      <div className="px-5 space-y-10">
        <SocialList
          handleDragEnd={handleDragEnd}
          socials={footerContent?.social || []}
          findSelectedSection={findSelectedSection}
          pageId={pageId}
          footerContent={footerContent}
        />
        <SocialIconsList
          social={footerContent?.social || []}
          findSelectedSection={findSelectedSection}
        />
      </div>
    </div>
  );
}

export default Social;
