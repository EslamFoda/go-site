"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { openPageSetting, openPagesTab, openPallet } from "@/reduxStore/action";
import { PagesIcon, PalletIcon, SettingsIcon } from "@/icons/common";

function SidebarButtons() {
  const dispatch = useAppDispatch();
  const {
    isGenerating,
    openPageSetting: pageSettings,
    openPallet: pallet,
    openPages,
  } = useAppSelector((state) => state.editor.present);
  const handleOpenPallet = () => {
    dispatch(openPallet());
  };
  return (
    <nav className="flex flex-col">
      <div
        className="flex items-center h-12 relative justify-center group cursor-pointer hover:bg-muted/70"
        onClick={() => dispatch(openPagesTab())}
      >
        <PagesIcon active={openPages} />
        <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
          <span>Pages</span>
        </div>
      </div>
      <div
        className="flex items-center h-12 justify-center cursor-pointer hover:bg-muted/70 relative group"
        onClick={handleOpenPallet}
      >
        <PalletIcon active={pallet} />
        <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
          <span>Design</span>
        </div>
      </div>

      <div
        className="flex items-center h-12 justify-center cursor-pointer hover:bg-muted/70 relative group"
        onClick={() => {
          if (isGenerating) return;
          dispatch(openPageSetting());
        }}
      >
        <SettingsIcon active={pageSettings} />
        <div className="hidden group-hover:flex items-center justify-center bg-foreground : text-background w-full h-5 text-xs absolute -bottom-4 right-0">
          <span>Settings</span>
        </div>
      </div>
    </nav>
  );
}

export default SidebarButtons;
