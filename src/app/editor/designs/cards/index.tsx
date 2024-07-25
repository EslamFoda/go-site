import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

interface CardsProps {
  section: any;
}
function Cards({ section }: CardsProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  //@ts-ignore
  const CardsSection = designs[section.style.designName];
  return <CardsSection section={section} />;
}

export default Cards;
