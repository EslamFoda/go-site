import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { map } from "lodash/fp";
import { closest } from "@/utlis/fluid-helper";
import {
  BREAKPOINTS,
  COLS,
  MAP_TYPE_ELEMENTS,
} from "@/constant/fluid-constant";
import Form from "../../editorSideBar/sectionSettings/fluid/toolBox/form";
import Card from "../../editorSideBar/sectionSettings/fluid/toolBox/card";
import CustomImage from "../../editorSideBar/sectionSettings/fluid/toolBox/image";
import Carousel from "../../editorSideBar/sectionSettings/fluid/toolBox/carousel";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ElementDictionary = {
  [MAP_TYPE_ELEMENTS.FORM_TYPE]: Form,
  [MAP_TYPE_ELEMENTS.CARD_TYPE]: Card,
  [MAP_TYPE_ELEMENTS.IMAGE_TYPE]: CustomImage,
  [MAP_TYPE_ELEMENTS.CAROUSEL_TYPE]: Carousel,
};

function DynamicGrid(props: any) {
  const {
    onBreakpointChange,
    onLayoutChange,
    onPutItem,
    layouts,
    currentBreakpoint,
    onDrop,
    elements,
    allowOverlap,
    onChange,
    currentItem,
  } = props;

  const generateDOM = () => {
    return map((l: any) => {
      const currentElement = elements[l.i];
      const Element = currentElement?.type
        ? ElementDictionary[currentElement.type]
        : null;
      return (
        <div
          key={l.i}
          data-key={l.i}
          className={
            (l.static ? "overflow-hidden static" : "overflow-hidden") +
            (currentItem === l.i ? " border border-danger" : "")
          }
          onClick={onClick}
        >
          <div
            className="hide-button"
            onClick={() => onPutItem(l)}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ zIndex: 100 }}
          >
            &times;
          </div>
          {Element && <Element />}
        </div>
      );
    })(layouts[currentBreakpoint]);
  };

  const onClick = (e: any) => {
    const el = e.target;
    const value = closest(el);
    onChange("currentItem", value);
  };

  return (
    <ResponsiveReactGridLayout
      style={{ minHeight: 400 }}
    //   layouts={layouts}
      allowOverlap={allowOverlap}
      breakpoints={BREAKPOINTS}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      measureBeforeMount={false}
      preventCollision
      cols={COLS}
      compactType={null}
      onDrop={onDrop}
      isDroppable={true}
      rowHeight={30}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  );
}

export default DynamicGrid;
