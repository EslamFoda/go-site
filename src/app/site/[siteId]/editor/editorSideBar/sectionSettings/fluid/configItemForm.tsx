import React from "react";
import { getOr } from "lodash/fp";
import TextInput from "./misc/textInput";
import SingleCheck from "./misc/singleCheck";

function ConfigItemForm(props: any) {
  const { onChange, values = {} } = props;
  return (
    <div>
      <TextInput label={"ID"} value={values?.["i"]} disabled={true} />
      <SingleCheck
        label={"Static"}
        value={getOr(false, "static")(values)}
        onChange={(value: any) => onChange("static", value)}
      />
      <SingleCheck
        label={"Draggable"}
        value={getOr(false, "isDraggable")(values)}
        onChange={(value: any) => onChange("isDraggable", value)}
      />
      <SingleCheck
        label={"Resizable"}
        value={getOr(true, "isResizable")(values)}
        onChange={(value: any) => onChange("isResizable", value)}
      />
    </div>
  );
}

export default ConfigItemForm;
