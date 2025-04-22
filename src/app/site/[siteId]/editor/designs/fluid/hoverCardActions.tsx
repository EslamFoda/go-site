import React from "react";
import { ChevronDown, ChevronUp, LayoutIcon, Trash } from "lucide-react";
import { HoverCardContent } from "@/components/ui/hover-card";
import { GridCard } from "@/types/sectionsTypes/fluid";
import {
  setDraggableModalName,
  setFluidCard,
  updateIsDraggableModal,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { cn } from "@/lib/utils";

interface HoverCardActionsProps {
  card: GridCard;
  maxZIndex: number;
  cardsAtMaxZIndex: any;
  onDelete: (id: string) => void;
  onZIndexChange: (id: string, direction: "forward" | "backward") => void;
}

const HoverCardActions = ({
  card,
  maxZIndex,
  cardsAtMaxZIndex,
  onDelete,
  onZIndexChange,
}: HoverCardActionsProps) => {
  const dispatch = useAppDispatch();
  const moveForwardClassName = cn(
    "h-8 w-8 rounded-full flex items-center hover:bg-primary/80 shadow-md justify-center bg-primary transition-colors cursor-pointer",
    {
      "opacity-50 cursor-not-allowed":
        (card.zIndex || 5) === maxZIndex && cardsAtMaxZIndex === 1,
    }
  );
  const moveBackwardClassName = cn(
    "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer",
    {
      "opacity-50 cursor-not-allowed": card.zIndex === 5,
    }
  );
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
      {/* Move Backward Button */}
      <div
        onClick={() => onZIndexChange(card.i, "backward")}
        className={moveBackwardClassName}
      >
        <ChevronDown size={16} className="stroke-primary-foreground" />
      </div>

      {/* Move Forward Button */}
      <div
        onClick={() => onZIndexChange(card.i, "forward")}
        className={moveForwardClassName}
      >
        <ChevronUp size={16} className="stroke-primary-foreground" />
      </div>
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
