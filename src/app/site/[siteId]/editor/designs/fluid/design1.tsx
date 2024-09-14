import React, { useReducer } from "react";

import { v4 as uuidv4 } from "uuid";
import { map, omit, cloneDeep, flow } from "lodash/fp";

import { findIndex } from "lodash";
import {
  getCurrentItem,
  getWidthByBreakpoint,
  objectToArray,
  transformToOptions,
} from "@/utlis/fluid-helper";
import {
  BREAKPOINTS,
  STATE_PREVIEW,
  TOOL_BOX_ITEM,
} from "@/constant/fluid-constant";
import ToolBox from "../../editorSideBar/sectionSettings/fluid/toolBar/toolBox";
import Dropdown from "../../editorSideBar/sectionSettings/fluid/misc/dropdown";
import SingleCheck from "../../editorSideBar/sectionSettings/fluid/misc/singleCheck";
import DynamicGrid from "./dynamicGrid";
import ConfigItemForm from "../../editorSideBar/sectionSettings/fluid/configItemForm";

const cb = (prevState: any, nextState: any) => ({ ...prevState, ...nextState });

const transformTo = (data: any) => (key: any) => ({ value: key, label: key });

const defaultStyle = {
  minHeight: 400,
};

const defaultState = {
  layouts: { lg: [] },
  currentBreakpoint: "lg",
  elements: {},
  allowOverlap: false,
  style: defaultStyle,
  options: transformToOptions(BREAKPOINTS),
  currentItem: null,
  display: "lg",
};

function Layout(props: any) {
  const [state, setState] = useReducer(cb, defaultState);
  const {
    currentBreakpoint,
    layouts,
    elements,
    style,
    options,
    allowOverlap,
    currentItem,
    display,
  } = state;

  const onChange = (key: any, value: any) => {
    setState({ [key]: value });
  };

  const onChangeItem = (key: any, value: any) => {
    const clonedLayout = cloneDeep(layouts);
    const index = findIndex(
      clonedLayout[currentBreakpoint],
      (item: any) => item.i === currentItem
    );
    if (index !== -1) {
      clonedLayout[currentBreakpoint][index][key] = value;
      setState({ layouts: clonedLayout });
    }
  };

  const onBreakpointChange = (breakpoint: any) =>
    setState({ currentBreakpoint: breakpoint });

  const onLayoutChange = (layout: any, layouts: any) => {
    setState({ layouts });
  };

  const onPutItem = (item: any) => {
    setState({
      layouts: {
        ...layouts,
        [currentBreakpoint]: layouts[currentBreakpoint].filter(
          ({ i }: any) => i !== item.i
        ),
      },
      elements: omit([item.i])(elements),
      currentItem: currentItem === item.i ? null : currentItem,
    });
  };

  const onDrop = (layout: any, layoutItem: any, event: any) => {
    const id = event.dataTransfer.getData("text");
    onInsert(layout, layoutItem, id);
  };

  const onInsert = (layout: any, layoutItem: any, id: any) => {
    const newItem = { ...layoutItem, i: uuidv4(), ...TOOL_BOX_ITEM[id] };
    const items = map((item: any) =>
      item.i === layoutItem.i ? newItem : item
    )(layout);
    const element = { [newItem.i]: { id: newItem.i, type: id } };
    setState({
      layouts: {
        ...layouts,
        ...{ [currentBreakpoint]: items },
      },
      elements: { ...elements, ...element },
    });
  };

  const onSave = (e: any) => {
    const currentState = flow(
      cloneDeep,
      omit(["style", "options", "currentItem"])
    )(state);
    window.localStorage.setItem(STATE_PREVIEW, JSON.stringify(currentState));

    const w = getWidthByBreakpoint(BREAKPOINTS, display);

    const h = 800;

    const dualScreenLeft =
      //@ts-ignore
      window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop =
      //@ts-ignore
      window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;

    window.open(
      "preview",
      "",
      `width=${w},height=${h},top=${top},left=${left}`
    );
  };

  return (
    <>
      <div className="text-center">
        <h1>Dynamic Dashboard</h1>
      </div>
      <div className={"container"}>
        <div className="row">
          <div className="col">
            <ToolBox />
          </div>
          <div className="col">
            <Dropdown
              label={"Breakpoint"}
              //@ts-ignore
              selectedValue={BREAKPOINTS[currentBreakpoint]}
              options={options}
            />
            <SingleCheck
              label={"Allow overlap"}
              value={allowOverlap}
              onChange={(value: any) => onChange("allowOverlap", value)}
            />
          </div>
          <div className="col">
            <ConfigItemForm
              onChange={onChangeItem}
              values={getCurrentItem(layouts?.[currentBreakpoint], currentItem)}
            />
          </div>
          <div className={"col-1"}>
            <Dropdown
              label={"Display:"}
              selectedValue={display}
              options={objectToArray(BREAKPOINTS, transformTo)}
              onChange={(value: any) => onChange("display", value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              //   onClick={(e) => onSave()}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <div className={"container"} style={style}>
        <DynamicGrid
          currentItem={currentItem}
          onChange={onChange}
          allowOverlap={allowOverlap}
          onLayoutChange={onLayoutChange}
          elements={elements}
          onBreakpointChange={onBreakpointChange}
          layouts={layouts}
          currentBreakpoint={currentBreakpoint}
          onPutItem={onPutItem}
          onDrop={onDrop}
        />
      </div>
    </>
  );
}

export default Layout;
