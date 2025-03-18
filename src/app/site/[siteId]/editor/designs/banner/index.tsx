import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import Design3 from "./design3";
import Design4 from "./design4";
import Design6 from "./design6";
import Design5 from "./design5";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
interface BannerProps {
  section: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;
  pageId: string;
  sectionIndex: number;
}
function Banner({ section, pageId, sectionIndex }: BannerProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
    design3: Design3,
    design4: Design4,
    design5: Design5,
    design6: Design6,
  };

  const BannerSection =
    designs[section.style.designName as keyof typeof designs];
  return (
    <BannerSection
      section={section}
      pageId={pageId}
      sectionIndex={sectionIndex}
    />
  );
}

export default Banner;
