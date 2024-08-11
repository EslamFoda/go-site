import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import Design3 from "./design3";
import Design4 from "./design4";
import Design6 from "./design6";
import Design5 from "./design5";
interface BannerProps {
  section: any;
  pageId: string;
}
function Banner({ section, pageId }: BannerProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
    design3: Design3,
    design4: Design4,
    design5: Design5,
    design6: Design6,
  };

  //@ts-ignore
  const BannerSection = designs[section.style.designName];
  return (
    <>
      <BannerSection section={section} pageId={pageId} />
    </>
  );
}

export default Banner;
