import React from "react";
import { LayoutIcon, Trash } from "lucide-react";
import { HoverCardContent } from "@/components/ui/hover-card";
import { GridCard } from "@/types/sectionsTypes/fluid";
import {
  setDraggableModalName,
  setFluidCard,
  updateIsDraggableModal,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";

interface HoverCardActionsProps {
  card: GridCard;
  onDelete: (id: string) => void;
}

const HoverCardActions = ({ card, onDelete }: HoverCardActionsProps) => {
  const dispatch = useAppDispatch();
  const handleSettingsClick = () => {
    dispatch(updateIsDraggableModal(true));
    dispatch(setDraggableModalName("SETTINGS"));
    dispatch(setFluidCard(card));
  };

  const handleLayoutClick = () => {
    dispatch(updateIsDraggableModal(true));
    dispatch(setDraggableModalName("LAYOUT"));
    dispatch(setFluidCard(card));
  };

  return (
    <HoverCardContent
      onMouseDown={(e) => e.stopPropagation()}
      sideOffset={10}
      side={card.type === "text" ? "right" : "top"}
      className="flex items-center justify-center gap-3 bg-transparent shadow-none border-none"
    >
      {card.type !== "text" && (
        <div
          onClick={handleSettingsClick}
          className="h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
        >
          <span>
            {card.type === "button" ? "Edit" : "Change"} {card.type}
          </span>
        </div>
      )}

      {card.type === "image" && card.settings.originalSrc && (
        <div
          onClick={handleLayoutClick}
          className="h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
        >
          <span>Edit image</span>
        </div>
      )}

      {card.type === "button" && (
        <div
          onClick={handleLayoutClick}
          className="h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer"
        >
          <LayoutIcon size={16} className="stroke-primary-foreground" />
        </div>
      )}

      <div
        onClick={() => onDelete(card.i)}
        className="h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer"
      >
        <Trash size={16} className="stroke-primary-foreground" />
      </div>
    </HoverCardContent>
  );
};

export default HoverCardActions;
