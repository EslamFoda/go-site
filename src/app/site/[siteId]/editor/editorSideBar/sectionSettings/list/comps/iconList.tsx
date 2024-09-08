import React, { useState, useMemo } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { Icon } from "@phosphor-icons/react";
import { iconNames } from "@/constant/iconClassNames";
import { ListItem } from "@/types/sectionsTypes/list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BackBtn from "@/components/shared/backBtn";
import { useAppDispatch } from "@/reduxStore/hooks";
import { closeChooseIcon } from "@/reduxStore/action";

interface IconListProps {
  handlePropertyChange: (
    propertyName: keyof ListItem,
    propertyValue: any
  ) => void;
  selectedListItem: ListItem;
}

function IconList({ handlePropertyChange, selectedListItem }: IconListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const filteredIcons = useMemo(() => {
    return iconNames.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <BackBtn
        label="Add Icon"
        handleBack={() => dispatch(closeChooseIcon())}
      />
      <div className="relative m-3">
        <Input
          type="search"
          placeholder="Search Phosphor Icons"
          className="w-full appearance-none bg-background pl-8 mb-3 shadow-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" size={10}/>
      </div>
      <div
        className="px-3 overflow-y-auto"
        style={{ height: "calc(100vh - 220px)" }}
      >
        <div className="grid grid-cols-5   gap-y-3">
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
    </>
  );
}

export default IconList;
