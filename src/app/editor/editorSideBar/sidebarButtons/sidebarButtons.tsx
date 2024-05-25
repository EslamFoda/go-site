"use client";

import { Button } from "@/components/ui/button";
import { Book, Code2, Palette, Settings2, SquareTerminal } from "lucide-react";
import React from "react";
import useEditor from "../../../../store/editorStore";

function SidebarButtons() {
  const { handleOpenPallet } = useEditor();
  return (
    <nav className="grid gap-1 p-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg bg-muted"
        aria-label="Playground"
      >
        <SquareTerminal className="size-5" />
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
