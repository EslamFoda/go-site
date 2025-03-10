import React from "react";
import Design1 from "./design1";

interface LogosProps {
  section: any;
  pageId: string;
  sectionIndex: number;
}
function Logos({ section, pageId, sectionIndex }: LogosProps) {
  const designs = {
    design1: Design1,
  };

  //@ts-ignore
  const LogoSection = designs[section.style.designName];
  return (
    <>
      <LogoSection
        section={section}
        pageId={pageId}
        sectionIndex={sectionIndex}
      />
    </>
  );
}

export default Logos;
