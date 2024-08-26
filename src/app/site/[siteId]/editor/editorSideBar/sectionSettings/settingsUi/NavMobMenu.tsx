import { Label } from "@/components/ui/label";
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
        {["icon-1", "icon-2", "icon-3"].map((menuIcon) => (
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
const MenuIcon1 = ({ active }: { active: boolean }) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h20v2h-20v-2zm0 7h20v2h-20v-2z"
        clip-rule="evenodd"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fill-rule="evenodd"
      ></path>
    </svg>
  );
};

const MenuIcon2 = ({ active }: { active: boolean }) => {
  return (
    <svg
      data-v-90cc7c96=""
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 7h12v2h-12v-2zm0 7h20v2h-20v-2z"
        clip-rule="evenodd"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fill-rule="evenodd"
      ></path>
    </svg>
  );
};

const MenuIcon3 = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      data-v-90cc7c96=""
      fill="none"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-90cc7c96=""
        d="m2 4.5h20v2h-20v-2zm0 14h20v2h-20v-2z"
        clip-rule="evenodd"
        className={`${active ? "fill-foreground" : "fill-muted-foreground"}`}
        fill-rule="evenodd"
      ></path>
    </svg>
  );
};
