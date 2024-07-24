import React from "react";
import Design1 from "./design1";

import useEditor from "../../../../store/editorStore";
interface ListProps {
  section: any;
  handleSelectedSection: (selectedSection: any) => void;
}
function List({ section, handleSelectedSection }: ListProps) {
  const { handleSelectedItem, closeChooseIcon } = useEditor();
  const designs = {
    design1: Design1,
  };
  //@ts-ignore
  const ListSection = designs[section.style.designName];
  return (
    <ListSection
      section={section}
      handleSelectedSection={handleSelectedSection}
      handleSelectedItem={handleSelectedItem}
      closeChooseIcon={closeChooseIcon}
    />
  );
}

export default List;
