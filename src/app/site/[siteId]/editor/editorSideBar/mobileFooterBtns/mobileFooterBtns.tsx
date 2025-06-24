import { PagesIcon, PalletIcon, SettingsIcon } from "@/icons/common";
import React from "react";
import {
  openDrawer,
  openPageSetting,
  openPagesTab,
  openPallet,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";

function MobileFooterBtns() {
  const dispatch = useAppDispatch();
  const {
    isGenerating,
    previewMode,
    openPageSetting: pageSettings,
    openPallet: pallet,
    openPages,
  } = useAppSelector((state) => state.editor.present);
  const handleOpenPallet = () => {
    if (isGenerating) return;
    dispatch(openPallet());
    dispatch(openDrawer());
  };

  if (previewMode) return null;
  return (
    <div
      style={{ zIndex: 40 }}
      className="bg-background border-t  border-muted h-20 w-full fixed bottom-0 hidden max-md:flex items-center justify-between px-4"
    >
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          dispatch(openPagesTab());
          dispatch(openDrawer());
        }}
      >
        <PagesIcon active={openPages} />
        <span className="text-sm">Pages</span>
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={handleOpenPallet}
      >
        <PalletIcon active={pallet} />
        <span className="text-sm">Design</span>
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          if (isGenerating) return;
          dispatch(openPageSetting());
          dispatch(openDrawer());
        }}
      >
        <SettingsIcon active={pageSettings} />
        <span className="text-sm">Settings</span>
      </div>
    </div>
  );
}

export default MobileFooterBtns;
