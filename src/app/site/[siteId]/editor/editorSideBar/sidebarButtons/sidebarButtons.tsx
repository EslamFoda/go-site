"use client";

import { Button } from "@/components/ui/button";
import { Book, Code2, File, Palette, Settings2 } from "lucide-react";
import React from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { openPageSettings, openPallet } from "@/reduxStore/action";

function SidebarButtons() {
  const dispatch = useAppDispatch();
  const handleOpenPallet = () => {
    dispatch(openPallet());
  };
  return (
    <nav className="grid gap-1 p-2">
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
      >
        <Code2 className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Documentation"
      >
        <Book className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg"
        aria-label="Settings"
      >
        <Settings2 className="size-5" />
      </Button>
    </nav>
  );
}

export default SidebarButtons;
