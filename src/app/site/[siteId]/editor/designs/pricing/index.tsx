import React from "react";
import Design1 from "./design1";

interface PricingProps {
  section: any;
  pageId: string;
}
function Pricing({ section, pageId }: PricingProps) {
  const designs = {
    design1: Design1,
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
