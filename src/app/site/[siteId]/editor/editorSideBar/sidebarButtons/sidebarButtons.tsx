"use client";

import { Button } from "@/components/ui/button";
import { File, Palette, Settings, Undo2, Redo2 } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openPageSetting,
  openPageSettings,
  openPallet,
} from "@/reduxStore/action";
import { ActionCreators } from "redux-undo";

function SidebarButtons() {
  const dispatch = useAppDispatch();

  // Add selectors for undo/redo state
  const canUndo = useAppSelector((state) => state.editor.past.length > 1);
  const canRedo = useAppSelector((state) => state.editor.future.length > 0);

  const handleOpenPallet = () => {
    dispatch(openPallet());
  };

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
    console.log(canUndo);
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <nav className="grid gap-3 p-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Undo"
        onClick={handleUndo}
        disabled={!canUndo}
      >
        <Undo2 className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Redo"
        onClick={handleRedo}
        disabled={!canRedo}
      >
        <Redo2 className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Playground"
        onClick={() => dispatch(openPageSettings())}
      >
        <File className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Models"
        onClick={handleOpenPallet}
      >
        <Palette className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="API"
        onClick={() => dispatch(openPageSetting())}
      >
        <Settings className="size-5" />
      </Button>
    </nav>
  );
}

export default SidebarButtons;
