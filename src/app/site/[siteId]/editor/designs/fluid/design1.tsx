import React, { useEffect } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { updateSelectedItem, updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";

interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ pageId, section }: DesignProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    var grid = GridStack.init({
      float: true,
      resizable: { handles: "e, se, s, sw, w" },
      acceptWidgets: true,
    });
  });
  return (
    <section onClick={()=>{
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
    }}>
      <div className="grid-stack">
        <div
          className="grid-stack-item border-dark bg-primary"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">Item 1</div>
        </div>
        <div
          className="grid-stack-item border-dark bg-muted"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">Item 2</div>
        </div>
        <div
          className="grid-stack-item border-dark bg-gray-500"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">Item 3</div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
