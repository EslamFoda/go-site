"use client";
import React from "react";
import { Settings, Share, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ThemeProvider } from "@/lib/theme-provider";
import { ModeToggle } from "@/components/modes/modeToggle";
import { useAppSelector } from "@/reduxStore/hooks";
import { Inter } from "next/font/google";
import SidebarButtons from "./editorSideBar/sidebarButtons";
import EditorSidebar from "./editorSideBar";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });
function Editor({ children }: { children: React.ReactNode }) {
  const { designSettings } = useAppSelector((state) => state.editor);
  const { bodyFont, titleFont } = designSettings.fonts;

  return (
    <>
      <head>
        <link rel="preconnect" href="https://maps.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com/"></link>
        <style
          dangerouslySetInnerHTML={{
            __html: `
    ${
      titleFont.fontFamilyUrl
        ? `
      @font-face {
        font-family: ${titleFont.fontFamily}-title;
        src: url("${titleFont.fontFamilyUrl}");
      }
    `
        : ""
    }
  `,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
    ${
      bodyFont.fontFamilyUrl
        ? `
      @font-face {
        font-family: ${bodyFont.fontFamily}-body;
        src: url("${bodyFont.fontFamilyUrl}");
      }
    `
        : ""
    }
  `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
    ${
      titleFont.fontFamilyUrl && titleFont.fontFamily
        ? `
      .page-container h1,
      .page-container h2,
      .page-container h3,
      .page-container h4,
      .page-container h5,
      .page-container h6,
      .text-title {
        font-family: "${titleFont.fontFamily}-title";
      }
    `
        : ""
    }
  `,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
    ${
      bodyFont.fontFamilyUrl && bodyFont.fontFamily
        ? `
      .page-container span,
      .page-container p,
      .page-container div,
      .text-body {
        font-family: "${bodyFont.fontFamily}-body";
      }
    `
        : ""
    }
  `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="grid h-screen w-full pl-[56px]">
            <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
              <div className="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                  <Triangle className="size-5 fill-foreground" />
                </Button>
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
              <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
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
                <ModeToggle />
              </header>
              <main className="grid flex-1 pl-[400px] max-md:pl-0 gap-4 overflow-auto  grid-cols-1">
                {children}
              </main>
              <Toaster visibleToasts={1} />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </>
  );
}

export default Editor;
