import React, { useState, useMemo } from "react";
import { iconNames } from "@/constant/iconClassNames";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BackBtn from "@/components/shared/backBtn";
import { getPhosphorIcon } from "@/helper/phosphorIcons";

interface IconListProps {
  icon: string;
  listHeight?: string;
  backBtnLabel?: string;
  backBtnClassName?: string;
  handlePropertyChange: (propertyValue: string) => void;
  handleBack: () => void;
}

function IconList({
  icon,
  listHeight = "calc(100vh - 220px)",
  backBtnLabel = "Add Icon",
  backBtnClassName,
  handlePropertyChange,
  handleBack,
}: IconListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = useMemo(() => {
    return iconNames.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <BackBtn
        backBtnClassName={backBtnClassName}
        label={backBtnLabel}
        handleBack={handleBack}
      />
      <div className="relative m-3">
        <Input
          type="search"
          placeholder="Search Icons"
          className="w-full appearance-none bg-background pl-8 mb-3 shadow-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
          size={10}
        />
      </div>
      <div className="px-3 overflow-y-auto" style={{ height: listHeight }}>
        <div className="grid grid-cols-5 gap-y-3">
          {filteredIcons.map((iconName) => {
            const IconComponent = getPhosphorIcon(iconName);
            return (
              <div
                key={iconName}
                className={`hover:bg-muted h-10 rounded-md flex items-center justify-center cursor-pointer ${
                  icon === iconName && "bg-secondary"
                }`}
                onClick={() => handlePropertyChange(iconName)}
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
