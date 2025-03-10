import React from "react";
import Design1 from "./design1";

interface AccordionProps {
  section: any;
  pageId: string;
  sectionIndex: number;
}
function Accordion({ section, pageId, sectionIndex }: AccordionProps) {
  const designs = {
    design1: Design1,
  };

  //@ts-ignore
  const AccordionSection = designs[section.style.designName];
  return (
    <>
      <AccordionSection
        section={section}
        pageId={pageId}
        sectionIndex={sectionIndex}
      />
    </>
  );
}

export default Accordion;
