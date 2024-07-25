import React from "react";
import Design1 from "./design1";

interface ListProps {
  section: any;
}
function List({ section }: ListProps) {
  const designs = {
    design1: Design1,
  };
  //@ts-ignore
  const ListSection = designs[section.style.designName];
  return <ListSection section={section} />;
}

export default List;
