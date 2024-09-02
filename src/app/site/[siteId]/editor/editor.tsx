"use client";
import React from "react";
import { Settings, Share, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SidebarButtons from "./editorSideBar/sidebarButtons";
import EditorSidebar from "./editorSideBar";
import { Toaster } from "@/components/ui/sonner";
import ThemeToggle from "@/components/themeToggle";
import Link from "next/link";
import { useAppDispatch } from "@/reduxStore/hooks";
import { closeSideBar } from "@/reduxStore/action";
function Editor({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  return (
    <div className="grid h-screen w-full pl-[46px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2" onClick={() => dispatch(closeSideBar())}>
          <Link href="/">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
            </Button>
          </Link>
        </div>
        <SidebarButtons />
      </aside>
      <aside className="inset-y fixed left-15 z-20 flex w-96  max-md:hidden  h-full flex-col border-r">
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
        <header className="sticky top-0 z-10 flex h-[48px] items-center gap-1 border-b bg-background px-4">
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
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
          <ThemeToggle />
        </header>
        <main className="grid flex-1 pl-[400px] max-md:pl-0 gap-4 overflow-auto  grid-cols-1">
          {children}
        </main>
      </div>
      <Toaster visibleToasts={1} />
    </div>
  );
}

export default Editor;
