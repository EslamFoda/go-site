import React from "react";
import { map } from "lodash/fp";
import ToolBoxItem from "./toolBoxItem";
import { TOOL_BOX_LIST } from "@/constant/fluid-constant";

function ToolBox(props: any) {
  const items = map((box: any) => <ToolBoxItem key={box.id} box={box} />)(
    TOOL_BOX_LIST
  );
  return <div className="row row-cols-auto">{items}</div>;
}

export default ToolBox;
