import React, { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface LinkSelectorProps {
  fullWidth?: boolean;
  noLabel?: boolean;
  label?: string;
  links: { id: string; link: string }[];
  selectedLink: string;
  onSelect: (link: string) => void;
}

const LinkSelector: React.FC<LinkSelectorProps> = ({
  noLabel = false,
  fullWidth = false,
  label,
  links,
  selectedLink,
  onSelect,
}) => {
  const [value, setValue] = useState<string>(
    selectedLink.startsWith("/") ? selectedLink : `/${selectedLink}`
  );
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectLink = (currentValue: string) => {
    const formattedValue = currentValue.startsWith("/")
      ? currentValue
      : `/${currentValue}`;
    setValue(formattedValue === value ? "" : formattedValue);
    setOpen(false);
    onSelect(formattedValue);
  };

  const triggerBtnClassNames = cn("w-4/6 justify-between", {
    "w-full": fullWidth,
  });

  return (
    <div className="space-y-1 flex items-center justify-between">
      {!noLabel && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={triggerBtnClassNames}
          >
            {value || "Select link..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search link..." />
            <CommandList>
              <CommandEmpty>No link found.</CommandEmpty>
              <CommandGroup>
                {links.map((link) => (
                  <CommandItem
                    key={link.id}
                    value={link.link}
                    onSelect={(currentValue: string) =>
                      handleSelectLink(currentValue)
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `/${link.link}` ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {`/${link.link}`}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LinkSelector;
