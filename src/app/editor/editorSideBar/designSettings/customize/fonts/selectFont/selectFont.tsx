import React, { useState, useEffect, useCallback, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Font, FontOption, VariantOption } from "@/types/common";

interface SelectGFontConfig {
  key: string;
  containerFonte: string;
  containerVariante: string;
  sort?: string;
  onSelectFonte?: (family: string, variant: string, fontData: Font) => void;
  onSelectVariante?: (family: string, variant: string, fontData: Font) => void;
}

interface SelectGFontProps {
  config: SelectGFontConfig;
  fonts: Font[];
  selectedFont: FontOption | null;
  fontOptions: FontOption[];
  setSelectedFont: React.Dispatch<React.SetStateAction<FontOption | null>>;
  selectedFontVariant: string | null;
}

const SelectGFont: React.FC<SelectGFontProps> = ({
  config,
  fonts,
  selectedFont,
  fontOptions,
  selectedFontVariant,
  setSelectedFont,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | null>(
    null
  );
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFontOptions, setFilteredFontOptions] = useState(fontOptions);
  const itemSize = 35;
  const listHeight = Math.min(filteredFontOptions.length * itemSize, 300);
  const listRef = useRef(null);

  useEffect(() => {
    if (selectedFont) {
      const font = fonts[selectedFont.value];
      const variantOpts: VariantOption[] = font.variants.map((variant) => ({
        value: variant,
        label: variant,
      }));
      setVariantOptions(variantOpts);
      setSelectedVariant(
        variantOpts.find((v) => v.value === "regular") || variantOpts[0]
      );
      //@ts-ignore
      if (listRef.current) listRef.current?.scrollToItem(selectedFont.value);
    }
  }, [selectedFont, fonts]);

  useEffect(() => {
    const filtered = fontOptions.filter((font) =>
      font.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFontOptions(filtered);
  }, [searchTerm, fontOptions]);

  const handleFontChange = useCallback(
    (option: FontOption) => {
      setSelectedFont(option);
      if (config.onSelectFonte) {
        config.onSelectFonte(
          fonts[option.value].family,
          "regular",
          fonts[option.value]
        );
      }
    },
    [fonts, setSelectedFont, config]
  );

  const handleVariantChange = (variant: string) => {
    const selectedVariantOption = variantOptions.find(
      (option) => option.value === variant
    );
    if (selectedVariantOption && selectedFont) {
      setSelectedVariant(selectedVariantOption);
      if (config.onSelectVariante) {
        config.onSelectVariante(
          fonts[selectedFont.value].family,
          variant,
          fonts[selectedFont.value]
        );
      }
    }
  };

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const font = filteredFontOptions[index];
      return (
        <div
          style={style}
          onClick={() => handleFontChange(font)}
          className={`flex items-center justify-between px-3 py-1.5 cursor-pointer hover:bg-muted ${
            selectedFont?.value === font.value ? "bg-muted" : ""
          }`}
        >
          <span>{font.label}</span>
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedFont?.value === font.value ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      );
    },
    [filteredFontOptions, selectedFont, handleFontChange]
  );

  return (
    <div className="space-y-4 mb-2">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Search fonts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="rounded-md border shadow-md overflow-hidden">
          {filteredFontOptions.length === 0 ? (
            <div className="p-2 text-center">No font found.</div>
          ) : (
            <List
              height={listHeight}
              itemCount={filteredFontOptions.length}
              itemSize={itemSize}
              width="100%"
              ref={listRef}
            >
              {Row}
            </List>
          )}
        </div>
      </div>

      <Select
        onValueChange={handleVariantChange}
        value={selectedFontVariant || selectedVariant?.value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a variant" />
        </SelectTrigger>
        <SelectContent>
          {variantOptions.map((variant) => (
            <SelectItem
              className="px-3"
              key={variant.value}
              value={variant.value}
            >
              {variant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectGFont;
