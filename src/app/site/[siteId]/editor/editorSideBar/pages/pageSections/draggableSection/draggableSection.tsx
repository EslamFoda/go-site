import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useScrollTo } from "@/hooks/useScrollTo";
import SectionDropMenu from "../sectionDropMenu";

interface DraggableSectionProps {
  items: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[];
  draggableContainerClassName?: string;
  pageId: string | string[];
  handleDragEnd: (result: any) => void;
}

function DraggableSection({
  items,
  draggableContainerClassName,
  pageId,
  handleDragEnd,
}: DraggableSectionProps) {
  const { scrollToElement } = useScrollTo();
  const listClassName = cn(
    "flex items-center cursor-pointer justify-between h-10 w-full hover:bg-muted rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm"
  );

  const ListItem = ({ item, index }: any) => {
    return (
      <Draggable
        isDragDisabled={index === 0}
        key={item.id}
        draggableId={item.id}
        index={index}
        data-vaul-no-drag="true"
      >
        {(provided) => (
          <div
            data-vaul-no-drag="true"
            className={listClassName}
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() => {
              scrollToElement(`section-${index}`);
            }}
          >
            <div className="flex items-center justify-between w-full gap-2">
              {index !== 0 && (
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
                </div>
              )}
              <span className="flex-1 truncate min-w-0">
                {`${item.sectionName} ${(item?.content?.title && "- ") || ""} ${
                  item?.content?.title || ""
                }`}
              </span>
              <SectionDropMenu
                sections={items}
                sectionId={item.id}
                pageId={pageId}
                sectionIndex={index}
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div
      className={cn("space-y-2", draggableContainerClassName)}
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
    </div>
  );
}

export default DraggableSection;
