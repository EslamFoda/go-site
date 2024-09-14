import Icon from "@/components/fluidIcons";
import React from "react";

function ToolBoxItem(props: any) {
  const { box } = props;
  const onDragStart = (e: any) => {
    e.dataTransfer.setData("text/plain", box.id);
  };

  return (
    <div className="col" draggable={true} onDragStart={onDragStart}>
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        title={box.title}
      >
        <Icon {...box} />
      </button>
    </div>
  );
}

export default ToolBoxItem;
