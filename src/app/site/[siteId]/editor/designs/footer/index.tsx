import React from "react";
import Design1 from "./design1";

interface FooterProps {
  section: any;
  pageId: string;
}
function Footer({ section, pageId }: FooterProps) {
  const designs = {
    design1: Design1,
  };

  //@ts-ignore
  const FooterSection = designs[section.style.designName];

  return <FooterSection section={section} pageId={pageId} />;
}

export default Footer;
