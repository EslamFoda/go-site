import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import React from "react";
interface FontButtonsProps {
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  setOpenFonts: React.Dispatch<React.SetStateAction<boolean>>;
}
function FontButtons({ setFontSettingsTab, setOpenFonts }: FontButtonsProps) {
  return (
    <div className="flex items-center justify-between space-y-1">
      <Label htmlFor="shape-selector">Fonts</Label>
      <div
        id="shape-selector"
        className="flex flex-col w-4/6 divide-y  border border-solid border-muted-bg rounded-sm"
      >
        <div
          className="flex w-full cursor-pointer h-10 px-2 items-center justify-between"
          onClick={() => {
            setOpenFonts(true);
            setFontSettingsTab("Title");
          }}
        >
          <span className="text-sm text-title">Title</span>
          <ChevronRight size={16} />
        </div>
        <div
          className="flex  w-full cursor-pointer h-10 px-2 items-center justify-between"
          onClick={() => {
            setOpenFonts(true);
            setFontSettingsTab("Body");
          }}
        >
          <span className="text-sm text-body">Body</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}

export default FontButtons;
