import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ChevronRight, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/reduxStore/hooks";
import { DragItems, SelectedItemType } from "@/types/common";
import { SubLink } from "@/types/sectionsTypes/header";
import { ImagePlaceHolder } from "@/icons/common";
import { useTheme } from "next-themes";
import { Logo } from "@/types/sectionsTypes/logos";

interface DraggableListProps {
  label: string;
  items: DragItems;
  maxItems?: number;
  draggableContainerClassName?: string;
  listType?: "testimonial";
  handleDragEnd: (result: any) => void;
  handleAdd: () => void;
  updateSelectedItem: (item: SelectedItemType | SubLink) => {
    type: string;
    payload: SelectedItemType | SubLink;
  };
  hasImg?: boolean;
}

function DraggableList({
  hasImg = false,
  label,
  items,
  maxItems,
  draggableContainerClassName,
  updateSelectedItem,
  handleDragEnd,
  handleAdd,
}: DraggableListProps) {
  const dispatch = useAppDispatch();

  const listClassName = cn(
    "flex items-center cursor-pointer justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm"
  );

  const ListItem = ({ item, index }: any) => {
    const { theme } = useTheme();
    const logoItem = item as Logo;
    const logoImg =
      theme === "dark"
        ? logoItem.urlDark || logoItem.urlLight
        : logoItem.urlLight || logoItem.urlDark;

    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
        data-vaul-no-drag="true"
      >
        {(provided) => (
          <div
            data-vaul-no-drag="true"
            onClick={() => {
              dispatch(updateSelectedItem(item));
            }}
            className={listClassName}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="drag-handle cursor-grab"
                  {...provided.dragHandleProps}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <GripVertical size={16} />
                </div>
                {hasImg && (
                  <div
                    className="w-20 flex items-center justify-center rounded-sm h-7 bg-muted"
                    style={{
                      backgroundImage: `url(${item.url || logoImg})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {!item.url && !logoImg && (
                      <ImagePlaceHolder width={20} height={20} />
                    )}
                  </div>
                )}
              </div>
              <span className="flex-1 truncate min-w-0">
                {item.title || item.name || item.text}
              </span>
              <div>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div
      className={cn("pt-4 space-y-2", draggableContainerClassName)}
      data-vaul-no-drag="true"
    >
      <DragDropContext
        data-vaul-no-drag="true"
        onDragEnd={(dropResult) => {
          handleDragEnd(dropResult);
        }}
      >
        <Droppable droppableId="droppable" data-vaul-no-drag="true">
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
      {(!maxItems || items.length < maxItems) && (
        <div
          className={listClassName}
          onClick={() => {
            handleAdd();
          }}
        >
          <span>Add {label}</span>
          <Plus size={16} />
        </div>
      )}
    </div>
  );
}

export default DraggableList;
