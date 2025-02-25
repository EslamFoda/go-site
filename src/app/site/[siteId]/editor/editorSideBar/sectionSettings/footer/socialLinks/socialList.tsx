import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateGlobalContent, updateSelectedItem } from "@/reduxStore/action";
import { LinkedinLogo } from "@phosphor-icons/react";
import { SocialLink } from "@/types/sectionsTypes/footer";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";

interface SocialListProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  items: SocialLink[];
  handleDragEnd: (result: any) => void;
}
function SocialList({
  pageId,
  findSelectedSection,
  items,
  handleDragEnd,
}: SocialListProps) {
  const dispatch = useAppDispatch();

  const handleUpdateLinkItem = ({
    updates,
    selectedLinkId,
  }: {
    updates: Partial<SocialLink>;
    selectedLinkId: string;
  }) => {
    const updatedSocial = items.map((social) =>
      social.id === selectedLinkId ? { ...social, ...updates } : social
    );

    dispatch(
      updateGlobalContent(findSelectedSection.id, { social: updatedSocial })
    );
  };

  const listClassName = cn(
    "flex items-center  justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm"
  );
  const ListItem = ({ item, index }: { item: SocialLink; index: number }) => {
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
                <GripVertical size={14} />
              </div>

              <LinkedinLogo size={14} />
            </div>
            <input
              className="w-full mx-2 border-none bg-transparent outline-none bg-none"
              placeholder="insert your link here"
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={item.link}
              onChange={(e) => {
                handleUpdateLinkItem({
                  updates: { link: e.target.value },
                  selectedLinkId: item.id,
                });
              }}
            />
            <div>
              <X size={15} className="cursor-pointer text-destructive" />
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  return (
    <div className="pt-4 px-5 space-y-2">
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
    </div>
  );
}

export default SocialList;
