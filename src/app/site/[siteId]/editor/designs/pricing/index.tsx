import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

interface PricingProps {
  section: any;
  pageId: string;
  sectionIndex: number;
}
function Pricing({ section, pageId }: PricingProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };

  //@ts-ignore
  const PricingSection = designs[section.style.designName];
  return (
    <>
      <PricingSection section={section} pageId={pageId} />
    </>
  );
}

export default Pricing;
