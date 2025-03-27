import React from "react";
import ThemeItem from "@/app/site/[siteId]/editor/editorSideBar/designSettings/aiThemes/themeItem";
import { themes } from "@/constant/createSiteThemes";
import { Button } from "@/components/ui/button";

interface ThemeSelectorProps {
  selectedPallet: (typeof themes)[0];
  setSelectedPallet: (theme: (typeof themes)[0]) => void;
  onContinue: () => void;
  setRef: (key: string) => (el: HTMLDivElement | null) => void;
}

export function ThemeSelector({
  selectedPallet,
  setSelectedPallet,
  onContinue,
  setRef,
}: ThemeSelectorProps) {
  return (
    <>
      <div className="py-3 space-y-4">
        <p className="text-muted-foreground text-center text-sm px-16">
          Customize your site instantly with matching fonts, colors, and shapes.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme: any) => (
            <ThemeItem
              key={theme.colorPallet}
              theme={theme}
              isSelected={selectedPallet.colorPallet === theme.colorPallet}
              onClick={() => setSelectedPallet(theme)}
              setRef={setRef(theme.colorPallet)}
            />
          ))}
        </div>
      </div>
      <div className="gap-3">
        <Button className="w-full" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </>
  );
}
