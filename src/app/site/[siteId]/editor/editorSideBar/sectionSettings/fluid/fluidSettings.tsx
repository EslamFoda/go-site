import React from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { Container, AddItem } from "./styles";
import { updateDroppingItem } from "@/reduxStore/action";

function FluidSettings() {
  const dispatch = useAppDispatch();
  const onDragStart = (item: any) => {
    // setDroppingItem(item);
    dispatch(updateDroppingItem(item));
  };

  return (
    <div>
      <Container style={{ height: "60px" }}>
        <AddItem
          draggable={true}
          onDragStart={() => onDragStart({ i: "dropping", w: 4, h: 3 })}
        >
          Add chart
        </AddItem>
        <AddItem
          draggable={true}
          onDragStart={() => onDragStart({ i: "dropping", w: 3, h: 1 })}
        >
          Add filter
        </AddItem>
        <AddItem
          draggable={true}
          onDragStart={() => onDragStart({ i: "dropping", w: 2, h: 1 })}
        >
          Add Text
        </AddItem>
      </Container>
    </div>
  );
}

export default FluidSettings;
