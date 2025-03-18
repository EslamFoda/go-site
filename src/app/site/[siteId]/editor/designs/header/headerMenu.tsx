import React from "react";
import { HeaderOptions } from "@/types/sectionsTypes/header";
import {
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  MenuIcon5,
} from "@/icons/common";

// Add proper types for the component props
interface HeaderMenuProps {
  options: HeaderOptions;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  options,
  className = "",
  onClick,
}) => {
  // Map of icon components
  const NavIcon = {
    "icon-1": <MenuIcon1 className="animate-fadeIn" />,
    "icon-2": <MenuIcon2 className="animate-fadeIn" />,
    "icon-3": <MenuIcon3 className="animate-fadeIn" />,
    "icon-4": <MenuIcon4 className="animate-fadeIn" />,
    "icon-5": <MenuIcon5 className="animate-fadeIn" />,
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      {options.iconType === "text" && (
        <span className="text-sm">{options.openMenuText}</span>
      )}
      {options.iconType === "icon" &&
        options.menuIcon &&
        NavIcon[options.menuIcon]}
    </div>
  );
};

export default HeaderMenu;
