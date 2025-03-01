"use client";

import { Button } from "@/components/ui/button";
import { File, Palette, Settings } from "lucide-react";
import React from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  openPageSetting,
  openPagesTab,
  openPallet,
} from "@/reduxStore/action";

function SidebarButtons() {
  const dispatch = useAppDispatch();
  const handleOpenPallet = () => {
    dispatch(openPallet());
  };
  return (
    <nav className="grid gap-3 p-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Playground"
        onClick={() => dispatch(openPagesTab())}
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
