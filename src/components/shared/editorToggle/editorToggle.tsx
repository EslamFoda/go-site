import { togglePreviewMode } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { Play } from "lucide-react";
import React from "react";

function EditorToggle() {
  const { previewMode } = useAppSelector((state) => state.editor.present);
  const dispatch = useAppDispatch();
  return (
    <div
      className="flex items-center h-12 w-14 relative justify-center group cursor-pointer hover:bg-muted/70 select-none"
      onClick={() => dispatch(togglePreviewMode())}
    >
      {previewMode ? (
        <span>Edit</span>
      ) : (
        <div>
          <Play size={18} className="fill-foreground" />
        </div>
      )}
      {!previewMode && (
        <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
          <span>Preview</span>
        </div>
      )}
    </div>
  );
}

export default EditorToggle;
