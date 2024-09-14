import React, { useState } from "react";
import { times, reject } from "lodash";
import styled from "styled-components";
import GridLayout from "./gridLayout";
import "./styles.css";
import { useAppSelector } from "@/reduxStore/hooks";

interface WidgetConfig {
  w: number;
  h: number;
  icon?: unknown;
}

const Container = styled.div`
  display: flex;
`;

const length = 0;

const cols = 24;
const rowHeight = 40;
const padding: [number, number] = [16, 16];
const layoutConfig = {
  cols,
  rowHeight,
  padding,
};

const Design1 = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [count, setCount] = useState(length);

  const droppingItem = useAppSelector((state) => state.editor.droppingItem);

  const [items, setItems] = useState(
    times(length).map((i, key, list) => ({
      i: key.toString(),
      type: "text",
      layout: {
        x: Math.floor(Math.random() * 12),
        y: Math.floor(Math.random() * 20),
        w: Math.floor(Math.random() * 4) + 1,
        h: Math.floor(Math.random() * 4) + 1,
      },
      children: <div>text</div>,
    }))
  );

  const onEdit = (id: string) => {
    console.log("onEdit: ", id);
    setVisible(!visible);
  };

  const onDrop = (layout: any, layoutItem: any) => {
    console.log("on Drop: ", layout, layoutItem);
    setItems(
      items.concat({
        i: count.toString(),
        type: "text",
        layout: layoutItem,
        children: <span>{count}</span>,
      })
    );
    setCount(count + 1);
  };

  const onRemoveItem = (id: string) => {
    console.log("on remove:", id);
    setItems(reject(items, { i: id }));
    console.log(items, "removed items");
  };

  console.log("items: ", items);

  return (
    <Container className="container max-w-container">
      <GridLayout
        droppingItem={droppingItem}
        items={items}
        onEdit={onEdit}
        onDrop={onDrop}
        onRemove={onRemoveItem}
        {...layoutConfig}
      />
    </Container>
  );
};

export default Design1;
