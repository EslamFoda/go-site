import React, { useState } from "react";
// @ts-ignore
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridBackground from "./grid";
import { Container, Item, Actions } from "./styles";
import { Delete, Edit } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  padding: [number, number];
  cols: number;
  rowHeight: number;
  droppingItem: any;
  items: any;
  onEdit: (id: string) => void;
  onDrop: (layout: any, item: any) => void;
  onRemove: (id: string) => void;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayout = (props: Props) => {
  const {
    padding,
    cols,
    rowHeight,
    droppingItem,
    items,
    onEdit,
    onDrop,
    onRemove,
  } = props;
  const [width, setWidth] = useState<number>(0);

  const onWidthChange = (containerWidth: number) => {
    setWidth(containerWidth);
  };

  const onLayoutChange = (layout: unknown, ...rest: any) => {
    console.log("layout change: ", layout, rest);
  };

  const onDragStop = (layouts: any, oldItem: any, newItem: any) => {
    console.log("onDragStop: ", layouts, newItem);
  };

  const renderItem = (item: any) => {
    const { i, layout, children } = item;
    return (
      <Item key={i} data-grid={layout}>
        {children}
        <Actions>
          <Edit
            onClick={(e) => {
              console.log("clickedd edit");
              onEdit(i);
            }}
          />
        </Actions>
        <Popover>
          <div onMouseDown={(e) => e.stopPropagation()}>
            <PopoverTrigger>Open</PopoverTrigger>
          </div>
          <PopoverContent>
            <div onClick={() => onRemove(i)}>delete me</div>
          </PopoverContent>
        </Popover>
      </Item>
    );
  };

  return (
    <Container>
      <GridBackground
        containerWidth={width}
        cols={cols}
        rowHeight={rowHeight}
        padding={padding}
      />
      <ResponsiveReactGridLayout
        style={{ minHeight: "100%", background: "transparent" }}
        margin={padding}
        containerPadding={[0, 0]}
        cols={{ lg: cols }}
        rowHeight={rowHeight}
        breakpoints={{ lg: 600 }}
        compactType={null}
        isDroppable={true}
        droppingItem={droppingItem}
        onDragStop={onDragStop}
        preventCollision={true} // Prevent elements from moving other elements
        // @ts-ignore
        onDrop={onDrop}
        onWidthChange={onWidthChange}
        onLayoutChange={onLayoutChange}
      >
        {items.map(renderItem)}
      </ResponsiveReactGridLayout>
    </Container>
  );
};

GridLayout.defaultProps = {
  padding: [16, 16],
  cols: 12,
  rowHeight: 36,
};

export default GridLayout;
