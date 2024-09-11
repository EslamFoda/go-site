import React from "react";
import design1 from "./design1";

interface FluidProps {
  section: any;
  pageId: string;
}
function Fluid({ section, pageId }: FluidProps) {
  const designs = {
    design1: design1,
  };

  //@ts-ignore
  const FluidSection = designs[section.style.designName];
  return (
    <>
      <FluidSection section={section} pageId={pageId} />
    </>
  );
}

export default Fluid;
