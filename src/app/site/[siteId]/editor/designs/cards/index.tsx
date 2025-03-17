import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

interface CardsProps {
  section: any;
  pageId: string;
  sectionIndex: number;
}
function Cards({ section, pageId }: CardsProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  //@ts-ignore
  const CardsSection = designs[section.style.designName];
  return <CardsSection section={section} pageId={pageId} />;
}

export default Cards;
