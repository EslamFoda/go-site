import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

import useEditor from "../../store/editorStore";
interface CardsProps {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
}
function Cards({ section, handleSelectedSection }: CardsProps) {
  const { handleSelectedItem } = useEditor();
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  //@ts-ignore
  const CardsSection = designs[section.style.designName];
  return (
    <CardsSection
      section={section}
      handleSelectedSection={handleSelectedSection}
      handleSelectedItem={handleSelectedItem}
    />
  );
}

export default Cards;
