import React from "react";
import { LayoutIcon, Trash, Copy } from "lucide-react";
import { HoverCardContent, HoverCardPortal } from "@/components/ui/hover-card"; // Import HoverCardPortal
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GridCard } from "@/types/sectionsTypes/fluid";
import {
  setDraggableModalName,
  setFluidCard,
  updateIsDraggableModal,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { cn } from "@/lib/utils";
import { MoveBackward, MoveForward } from "@/icons/common";

interface ActionButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className: string;
  disabled?: boolean;
  tooltip?: string;
}

interface ActionConfig {
  key: string;
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className: string;
  condition: boolean;
  disabled?: boolean;
  tooltip?: string;
}

interface HoverCardActionsProps {
  card: GridCard;
  maxZIndex: number;
  cardsAtMaxZIndex: number;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onZIndexChange: (id: string, direction: "forward" | "backward") => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  className,
  disabled = false,
  tooltip,
}) => {
  const buttonContent = (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(className, disabled && "opacity-50 cursor-not-allowed")}
    >
      {icon || label}
    </div>
  );

  return tooltip ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
          <TooltipArrow className="fill-muted" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    buttonContent
  );
};

const HoverCardActions: React.FC<HoverCardActionsProps> = ({
  card,
  maxZIndex,
  cardsAtMaxZIndex,
  onDelete,
  onDuplicate,
  onZIndexChange,
}) => {
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

  const actions: ActionConfig[] = [
    {
      key: "edit",
      label: `${card.type === "button" ? "Edit" : "Change"} ${card.type}`,
      onClick: handleSettingsClick,
      className:
        "h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer",
      condition: card.type !== "text",
    },
    {
      key: "edit-image",
      label: "Edit image",
      onClick: handleLayoutClick,
      className:
        "h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer",
      condition: card.type === "image" && !!card.settings.originalSrc,
    },
    {
      key: "layout",
      icon: <LayoutIcon size={16} className="stroke-primary-foreground" />,
      onClick: handleLayoutClick,
      className:
        "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer",
      condition: card.type === "button",
      tooltip: "Layout",
    },
    {
      key: "duplicate",
      icon: <Copy size={16} className="stroke-primary-foreground" />,
      onClick: () => onDuplicate(card.i),
      className:
        "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer",
      condition: true,
      tooltip: "Duplicate",
    },
    {
      key: "move-backward",
      icon: <MoveBackward />,
      onClick: () => onZIndexChange(card.i, "backward"),
      className: cn(
        "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer",
        {
          "opacity-50 cursor-not-allowed": card.zIndex === 5,
        }
      ),
      condition: true,
      disabled: card.zIndex === 5,
      tooltip: "Move Backward",
    },
    {
      key: "move-forward",
      icon: <MoveForward />,
      onClick: () => onZIndexChange(card.i, "forward"),
      className: cn(
        "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer",
        {
          "opacity-50 cursor-not-allowed":
            (card.zIndex || 5) === maxZIndex && cardsAtMaxZIndex === 1,
        }
      ),
      condition: true,
      disabled: (card.zIndex || 5) === maxZIndex && cardsAtMaxZIndex === 1,
      tooltip: "Move Forward",
    },
    {
      key: "delete",
      icon: <Trash size={16} className="stroke-destructive-foreground" />,
      onClick: () => onDelete(card.i),
      className:
        "h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-destructive hover:bg-destructive/80 transition-colors cursor-pointer",
      condition: true,
      tooltip: "Delete",
    },
  ];

  return (
    <HoverCardPortal>
      <HoverCardContent
        onMouseDown={(e) => e.stopPropagation()}
        sideOffset={10}
        side={card.type === "text" ? "right" : "top"}
        className="flex items-center justify-center gap-3 bg-transparent shadow-none border-none"
        style={{ zIndex: 49 }} // High z-index
      >
        {actions.map(
          (action) =>
            action.condition && (
              <ActionButton
                key={action.key}
                label={action.label}
                icon={action.icon}
                onClick={action.onClick}
                className={action.className}
                disabled={action.disabled}
                tooltip={action.tooltip}
              />
            )
        )}
      </HoverCardContent>
    </HoverCardPortal>
  );
};

export default HoverCardActions;
