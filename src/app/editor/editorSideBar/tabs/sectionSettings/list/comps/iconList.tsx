import React, { useState, useMemo } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { Icon } from "@phosphor-icons/react";
import { iconNames } from "@/constant/iconClassNames";
import { ListItem } from "@/types/sectionsTypes/list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface IconListProps {
  handlePropertyChange: (
    propertyName: keyof ListItem,
    propertyValue: any
  ) => void;
  selectedListItem: ListItem;
}

function IconList({ handlePropertyChange, selectedListItem }: IconListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = useMemo(() => {
    return iconNames.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-3">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search Phosphor Icons"
          className="w-full appearance-none bg-background pl-8 mb-3 shadow-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-5 gap-y-3">
        {filteredIcons.map((iconName) => {
          const IconComponent = PhosphorIcons[
            iconName as keyof typeof PhosphorIcons
          ] as Icon;
          return (
            <div
              key={iconName}
              className={`hover:bg-muted h-10 rounded-md flex items-center justify-center cursor-pointer ${
                selectedListItem?.icon === iconName && "bg-secondary"
              }`}
              onClick={() => handlePropertyChange("icon", iconName)}
            >
              <IconComponent size={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IconList;
