// DraggableList.js
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ChevronRight, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/types/sectionsTypes/cards";
import { ListItem } from "@/types/sectionsTypes/list";
import { useAppDispatch } from "@/reduxStore/hooks";
import { Accordion } from "@/types/sectionsTypes/accordion";
import { SelectedItemType } from "@/types/common";
import { Testimonial } from "@/types/sectionsTypes/testimonials";
interface DraggableListProps {
  label: string;
  items: Card[] | ListItem[] | Accordion[] | Testimonial[];
  handleDragEnd: (result: any) => void;
  handleAdd: () => void;
  updateSelectedItem: (item: SelectedItemType) => {
    type: string;
    payload: SelectedItemType;
  };
  listType?: "testimonial";
}
function DraggableList({
  label,
  items,
  updateSelectedItem,
  handleDragEnd,
  handleAdd,
}: DraggableListProps) {
  const dispatch = useAppDispatch();
  const listClassName = cn(
    "flex items-center cursor-pointer justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm"
  );
  const ListItem = ({ item, index }: any) => {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            onClick={() => dispatch(updateSelectedItem(item))}
            className={listClassName}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="flex items-center justify-center gap-2">
              <div
                className="drag-handle cursor-grab"
                {...provided.dragHandleProps}
              >
                <GripVertical size={15} />
              </div>
              <span>{item.title || item.name}</span>
            </div>
            <div>
              <ChevronRight size={15} />
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  return (
    <div className="pt-4 space-y-2">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item: any, index: any) => (
                <ListItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={listClassName} onClick={handleAdd}>
        <span>Add {label}</span>
        <Plus size={15} />
      </div>
    </div>
  );
}

export default DraggableList;
