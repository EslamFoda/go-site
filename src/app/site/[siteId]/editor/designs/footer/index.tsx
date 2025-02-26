import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import Design3 from "./design3";
import Design4 from "./design4";

interface FooterProps {
  section: any;
  pageId: string;
}
function Footer({ section, pageId }: FooterProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
    design3: Design3,
    design4: Design4,
  };

  //@ts-ignore
  const FooterSection = designs[section.style.designName];

  return <FooterSection section={section} pageId={pageId} />;
}

export default Footer;
