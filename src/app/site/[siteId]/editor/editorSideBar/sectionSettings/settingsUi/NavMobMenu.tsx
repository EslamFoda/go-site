import { Label } from "@/components/ui/label";
import { MenuIcon1, MenuIcon2, MenuIcon3 } from "@/icons/common";
import { MobileMenuIconType } from "@/types/sectionsTypes/header";
import React from "react";
interface NavMobMenuProps {
  menuValue: MobileMenuIconType;
  onValueChange: (value: MobileMenuIconType) => void;
}
function NavMobMenu({ menuValue, onValueChange }: NavMobMenuProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Mobile</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["icon-1", "icon-2", "icon-3"].map((menuIcon: any) => (
          <div
            key={menuIcon}
            onClick={() => {
              onValueChange(menuIcon as MobileMenuIconType);
            }}
            className={`${
              menuValue === menuIcon ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {menuIcon === "icon-1" && (
              <MenuIcon1 active={menuValue === menuIcon} />
            )}
            {menuIcon === "icon-2" && (
              <MenuIcon2 active={menuValue === menuIcon} />
            )}
            {menuIcon === "icon-3" && (
              <MenuIcon3 active={menuValue === menuIcon} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavMobMenu;
