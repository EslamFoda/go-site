import React from "react";
import Design1 from "./design1";

interface AccordionProps {
  section: any;
}
function Accordion({ section }: AccordionProps) {
  const designs = {
    design1: Design1,
  };

  //@ts-ignore
  const AccordionSection = designs[section.style.designName];
  return (
    <>
      <AccordionSection section={section} />
    </>
  );
}

export default Accordion;
