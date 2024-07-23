import React from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { Icon } from "@phosphor-icons/react";
import { iconNames } from "@/constant/iconClassNames";
import { ListItem } from "@/types/sectionsTypes/list";
interface IconListProps {
  handlePropertyChange: (
    propertyName: keyof ListItem,
    propertyValue: any
  ) => void;
}
function IconList({ handlePropertyChange }: IconListProps) {
  return (
    <div className="grid grid-cols-5 p-3 gap-y-3  ">
      {iconNames.map((iconName) => {
        const IconComponent = PhosphorIcons[
          iconName as keyof typeof PhosphorIcons
        ] as Icon;
        return (
          <div
            key={iconName}
            className="hover:bg-muted h-10 rounded-md flex items-center justify-center  cursor-pointer"
            onClick={() => handlePropertyChange("icon", iconName)}
          >
            <IconComponent size={20} />
          </div>
        );
      })}
    </div>
  );
}

export default IconList;
