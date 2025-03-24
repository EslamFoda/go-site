import { Button } from "@/components/ui/button";
import { ActionCreators } from "redux-undo";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { Redo2, Undo2 } from "lucide-react";
import React from "react";

function UndoAndRedo() {
  const canUndo = useAppSelector((state) => state.editor.past.length > 3);
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
      <div className="flex gap-0">
        <Button
          variant="ghost"
          className="flex items-center h-12 w-14 relative justify-center group cursor-pointer hover:bg-muted/70 select-none"
          aria-label="Undo"
          onClick={handleUndo}
          disabled={!canUndo}
        >
          <Undo2 size={20} />
          <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
            <span>Undo</span>
          </div>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="flex items-center h-12 w-14 relative justify-center group cursor-pointer hover:bg-muted/70 select-none"
          aria-label="Redo"
          onClick={handleRedo}
          disabled={!canRedo}
        >
          <Redo2 size={20} />
          <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
            <span>Redo</span>
          </div>
        </Button>
      </div>
    </>
  );
}

export default UndoAndRedo;
