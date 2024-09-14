import React from "react";
import Design1 from "./design1";

interface FluidProps {
  section: any;
  pageId: string;
}
function Fluid({ section, pageId }: FluidProps) {
  const designs = {
    design1: Design1,
  };
  //@ts-ignore
  const FluidSection = designs[section.style.designName];
  return <FluidSection section={section} pageId={pageId} />;
}

export default Fluid;
