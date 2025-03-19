import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionCreators } from "redux-undo";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { Redo2, Undo2 } from "lucide-react";
import React from "react";

function UndoAndRedo() {
  const canUndo = useAppSelector((state) => state.editor.past.length > 1);
  const canRedo = useAppSelector((state) => state.editor.future.length > 0);
  const dispatch = useAppDispatch();
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };
  return (
    <>
      <div className="w-[1px] h-full bg-border" />
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Undo"
                  onClick={handleUndo}
                  disabled={!canUndo}
                >
                  <Undo2 size={20} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-background">
              <TooltipArrow />
              undo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Redo"
                  onClick={handleRedo}
                  disabled={!canRedo}
                >
                  <Redo2 size={20} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-background">
              <TooltipArrow />
              redo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

export default UndoAndRedo;
