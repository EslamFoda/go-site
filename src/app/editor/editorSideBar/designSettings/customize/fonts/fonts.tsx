import React, { useState, useMemo, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Check } from "lucide-react";
import {
  createFontFamilyOption,
  createFontVariantOption,
  FontFamilyOption,
  FontVariantOption,
  GoogleFontItem,
  createSelectedFontHref,
} from "@/helper/fontUtils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { updateDesignSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface FontSelectorProps {
  fontSettingsTab: string;
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  fonts: GoogleFontItem[] | undefined;
  loading: boolean;
  error: any;
}

const FontSelector = ({
  fontSettingsTab,
  fonts,
  error,
  loading,
  setFontSettingsTab,
}: FontSelectorProps) => {
  const dispatch = useAppDispatch();
  const currentFontSettings = useAppSelector(
    (state) => state.editor.designSettings.fonts
  );
  const [selectedFont, setSelectedFont] = useState<FontFamilyOption | null>(
    null
  );
  const [selectedStyle, setSelectedStyle] = useState<FontVariantOption | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 0); // Adjust debounce delay as needed

  const fontOptions = useMemo(() => {
    if (!fonts || !Array.isArray(fonts)) return [];
    return fonts.map((font: GoogleFontItem) => createFontFamilyOption(font));
  }, [fonts]);

  const filteredFonts = useMemo(() => {
    if (!debouncedSearchQuery) return fontOptions;
    return fontOptions.filter((font) =>
      font.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery, fontOptions]);

  const handleFontChange = (fontValue: string) => {
    const font = fontOptions.find((f) => f.value === fontValue);
    if (font) {
      setSelectedFont(font);
      const firstStyle = font.variants.map(createFontVariantOption)[0];
      setSelectedStyle(firstStyle || null);

      // Create and import the font link
      const fontHref = createSelectedFontHref({
        family: font,
        variant: firstStyle,
      });
      console.log(fontHref, "fontHref");
      dispatch(
        updateDesignSettings({
          fonts: {
            ...currentFontSettings,
            headerFonts: {
              ...currentFontSettings.headerFonts,
              fontFamily: font.value,
              fontWeight: firstStyle ? firstStyle.weight : "400",
              fontFamilyUrl: fontHref,
            },
          },
        })
      );
    }
  };

  const handleStyleChange = (styleValue: string) => {
    if (!selectedFont) return;
    const style = selectedFont.variants
      .map(createFontVariantOption)
      .find((s) => s.value === styleValue);
    if (style) {
      setSelectedStyle(style);

      // Create and import the font link
      const fontHref = createSelectedFontHref({
        family: selectedFont,
        variant: style,
      });

      dispatch(
        updateDesignSettings({
          fonts: {
            ...currentFontSettings,
            headerFonts: {
              ...currentFontSettings.headerFonts,
              fontWeight: style.weight,
              fontFamilyUrl: fontHref,
            },
          },
        })
      );
    }
  };

  useEffect(() => {
    if (currentFontSettings.headerFonts) {
      const font = fontOptions.find(
        (f) => f.value === currentFontSettings.headerFonts.fontFamily
      );
      if (font) {
        setSelectedFont(font);
        const style = font.variants
          .map(createFontVariantOption)
          .find((s) => s.weight === currentFontSettings.headerFonts.fontWeight);
        if (style) {
          setSelectedStyle(style);
        }
      }
    }
  }, [currentFontSettings, fontOptions]);

  console.log(currentFontSettings, "currentFontSettings");

  if (loading) return <div className="text-center">Loading fonts...</div>;
  if (error)
    return <div className="text-center text-red-500">Error loading fonts</div>;

  const itemSize = 35;
  const listHeight = Math.min(filteredFonts.length * itemSize, 300);

  return (
    <>
      <Tabs
        onValueChange={setFontSettingsTab}
        value={fontSettingsTab}
        className="w-full"
      >
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="Title">Title</TabsTrigger>
          <TabsTrigger value="Body">Body</TabsTrigger>
        </TabsList>
        <TabsContent className="px-5" value="Title">
          {" "}
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
                          onSelect={() =>
                            handleFontChange(filteredFonts[index].value)
                          }
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
                  onValueChange={handleStyleChange}
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

            {/* {selectedFont && selectedStyle && (
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
      )} */}
          </div>
        </TabsContent>
        <TabsContent className="px-5" value="Body">
          body
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FontSelector;
