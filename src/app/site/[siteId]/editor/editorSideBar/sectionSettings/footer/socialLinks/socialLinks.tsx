import React from "react";
import SocialList from "./socialList";
import { SocialLink } from "@/types/sectionsTypes/footer";
import BackBtn from "@/components/shared/backBtn";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
interface SocialLinksProps {
  pageId: string;
  social: SocialLink[];
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  handleDragEnd: (result: any) => void;
}
function SocialLinks({
  findSelectedSection,
  pageId,
  social,
  handleDragEnd,
}: SocialLinksProps) {
  return (
    <div>
      <BackBtn label="Social links" handleBack={() => {}} />
      <SocialList
        handleDragEnd={handleDragEnd}
        items={social}
        findSelectedSection={findSelectedSection}
        pageId={pageId}
      />
    </div>
  );
}

export default SocialLinks;
