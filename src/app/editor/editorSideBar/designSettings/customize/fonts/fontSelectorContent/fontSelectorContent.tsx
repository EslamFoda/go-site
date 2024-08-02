import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createFontVariantOption,
  FontFamilyOption,
  FontVariantOption,
} from "@/helper/fontUtils";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FixedSizeList as List } from "react-window";
interface FontSelectorContentProps {
  selectedFont: FontFamilyOption | null;
  selectedStyle: FontVariantOption | null;
  onFontChange: (value: string) => void;
  onStyleChange: (value: string) => void;
  filteredFonts: {
    label: string;
    value: string;
    variants: string[];
  }[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
const FontSelectorContent = ({
  selectedFont,
  selectedStyle,
  onFontChange,
  onStyleChange,
  filteredFonts,
  searchQuery,
  setSearchQuery,
}: FontSelectorContentProps) => {
  const itemSize = 35;
  const listHeight = Math.min(filteredFonts.length * itemSize, 300);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search font..."
            onValueChange={setSearchQuery}
            value={searchQuery}
          />
          <CommandEmpty>No font found.</CommandEmpty>
          <CommandGroup className="overflow-y-auto">
            <CommandList>
              <List
                height={listHeight}
                itemCount={filteredFonts.length}
                itemSize={itemSize}
                width="100%"
              >
                {({ index, style }) => (
                  <CommandItem
                    key={filteredFonts[index].value}
                    value={filteredFonts[index].value}
                    onSelect={() => onFontChange(filteredFonts[index].value)}
                    style={style}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFont?.value === filteredFonts[index].value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {filteredFonts[index].label}
                  </CommandItem>
                )}
              </List>
            </CommandList>
          </CommandGroup>
        </Command>
      </div>

      {selectedFont && (
        <div className="space-y-2">
          <Label htmlFor="style-select">Style</Label>
          <Select
            onValueChange={onStyleChange}
            value={selectedStyle?.value || ""}
          >
            <SelectTrigger id="style-select">
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              {selectedFont.variants
                .map(createFontVariantOption)
                .map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedFont && selectedStyle && (
        <div
          className="mt-4 p-4 border rounded"
          style={{
            fontFamily: selectedFont.value,
            fontWeight: selectedStyle.weight,
            fontStyle: selectedStyle.italic ? "italic" : "normal",
          }}
        >
          <p className="text-lg">
            Preview: Almost before we knew it, we had left the ground.
          </p>
        </div>
      )}
    </div>
  );
};

export default FontSelectorContent;
