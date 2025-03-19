import { togglePreviewMode } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React from "react";

function EditorToggle() {
  const { previewMode } = useAppSelector((state) => state.editor.present);
  const dispatch = useAppDispatch();
  return (
    <div
      className="cursor-pointer"
      onClick={() => dispatch(togglePreviewMode())}
    >
      {previewMode ? <span>Edit</span> : <span>Preview</span>}
    </div>
  );
}

export default EditorToggle;
