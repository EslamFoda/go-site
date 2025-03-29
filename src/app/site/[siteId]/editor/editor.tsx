"use client";
import React from "react";
import { Settings, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SidebarButtons from "./editorSideBar/sidebarButtons";
import EditorSidebar from "./editorSideBar";
import { Toaster } from "@/components/ui/sonner";
import ThemeToggle from "@/components/themeToggle";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { closeSideBar } from "@/reduxStore/action";
import PublishBtn from "./editorSideBar/publishBtn";
import EditorToggle from "@/components/shared/editorToggle";
import { cn } from "@/lib/utils";
import UndoAndRedo from "@/components/shared/undoAndRedo";
function Editor({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { previewMode } = useAppSelector((state) => state.editor.present);

  const mainEditorContainerClassName = cn("grid h-screen w-full pl-[55px]", {
    "pl-0": previewMode,
  });
  const editorBtnsSidebarClasses = cn(
    "inset-y fixed w-14 left-0 z-50 flex h-full flex-col border-r",
    { hidden: previewMode }
  );

  const editorSettingsSidebarClasses = cn(
    "inset-y fixed left-15 z-50 flex w-96  max-md:hidden  h-full flex-col border-r",
    { hidden: previewMode }
  );

  const editorContentClasses = cn(
    "grid flex-1 pl-[384px] max-md:pl-0 gap-4 overflow-auto  grid-cols-1",
    { "pl-0": previewMode }
  );

  const editorHeaderClasses = cn(
    "sticky top-0 flex h-[48px] items-center  border-b bg-background ps-4 ms-[1px] z-50",
    {
      "ms-0": previewMode,
    }
  );

  return (
    <div className={mainEditorContainerClassName}>
      <aside className={editorBtnsSidebarClasses}>
        <Link href="/">
          <div
            className="border-b h-12 flex items-center justify-center cursor-pointer hover:bg-muted/70"
            onClick={() => dispatch(closeSideBar())}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Home"
              className="hover:bg-transparent"
            >
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </div>
        </Link>
        <SidebarButtons />
      </aside>
      <aside className={editorSettingsSidebarClasses}>
        <div className="border-b p-2 invisible">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <div x-chunk="dashboard-03-chunk-0" className="overflow-y-auto">
          <EditorSidebar />
        </div>
      </aside>
      <div className="flex flex-col">
        <header className={editorHeaderClasses}>
          <h1 className="text-xl font-semibold">Playground</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <EditorSidebar />
            </DrawerContent>
          </Drawer>
          <div className="ml-auto h-full flex items-center justify-between">
            {!previewMode && <UndoAndRedo />}
            <div className="w-[1px] h-full bg-border" />
            <ThemeToggle />
            <div className="w-[1px] h-full bg-border" />
            <EditorToggle />
            <div className="w-[1px] h-full bg-border" />
            {!previewMode && <PublishBtn />}
          </div>
        </header>
        <main className={editorContentClasses}>{children}</main>
      </div>
      <Toaster visibleToasts={1} />
    </div>
  );
}

export default Editor;
