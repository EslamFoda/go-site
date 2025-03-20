import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateGlobalContent, updateSelectedItem } from "@/reduxStore/action";
import { FooterContent, SocialLink } from "@/types/sectionsTypes/footer";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { iconMap } from "./socialIcons";

interface SocialListProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  socials: SocialLink[];
  footerContent: FooterContent;
  handleDragEnd: (result: any) => void;
}
function SocialList({
  pageId,
  footerContent,
  findSelectedSection,
  socials,
  handleDragEnd,
}: SocialListProps) {
  const dispatch = useAppDispatch();

  const handleTextChange = (index: number, link: string) => {
    const updatedSocials = socials.map((social, i) =>
      i === index ? { ...social, link } : social
    );

    dispatch(
      updateGlobalContent(findSelectedSection.id, {
        ...footerContent,
        social: updatedSocials,
      })
    );
  };

  const handleDeleteLink = (socialId: string) => {
    const filterSocials = socials.filter(
      (link: SocialLink) => link.id !== socialId
    );

    dispatch(
      updateGlobalContent(findSelectedSection.id, { social: filterSocials })
    );
  };

  const listClassName = cn(
    "flex items-center  justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm"
  );
  const SocialItem = ({
    social,
    index,
  }: {
    social: SocialLink;
    index: number;
  }) => {
    const [inputValue, setInputValue] = React.useState(social.link);

    return (
      <Draggable
        data-vaul-no-drag="true"
        key={social.id}
        draggableId={social.id}
        index={index}
      >
        {(provided) => (
          <div
            data-vaul-no-drag="true"
            onClick={() => dispatch(updateSelectedItem(social))}
            className={listClassName}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="flex items-center justify-center gap-2">
              <div
                className="drag-handle cursor-grab"
                {...provided.dragHandleProps}
              >
                <GripVertical size={16} />
              </div>

              {iconMap[social.icon]}
            </div>
            <input
              className="w-full mx-2 border-none bg-transparent outline-none bg-none"
              placeholder="insert your link here"
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onBlur={() => handleTextChange(index, inputValue)}
            />
            <div onClick={() => handleDeleteLink(social.id)}>
              <X size={16} className="cursor-pointer text-destructive" />
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  return (
    <div data-vaul-no-drag="true" className="pt-4 space-y-2">
      <DragDropContext data-vaul-no-drag="true" onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" data-vaul-no-drag="true">
          {(provided) => (
            <div
              data-vaul-no-drag="true"
              className="space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {socials.map((social: SocialLink, index: any) => (
                <SocialItem key={social.id} social={social} index={index} />
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
