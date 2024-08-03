import React, { useState, useMemo, useEffect } from "react";
import {
  createFontFamilyOption,
  createFontVariantOption,
  FontFamilyOption,
  FontVariantOption,
  GoogleFontItem,
  createSelectedFontHref,
} from "@/helper/fontUtils";
import { updateDesignSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import FontSelectorContent from "./fontSelectorContent/fontSelectorContent";
import BackBtn from "@/components/shared/backBtn";

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
  fonts: GoogleFontItem[] | undefined;
  loading: boolean;
  error: any;
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  setOpenFonts: React.Dispatch<React.SetStateAction<boolean>>;
}

const FontSelector = ({
  fontSettingsTab,
  fonts,
  error,
  loading,
  setFontSettingsTab,
  setOpenFonts,
}: FontSelectorProps) => {
  const dispatch = useAppDispatch();
  const currentFontSettings = useAppSelector(
    (state) => state.editor.designSettings.fonts
  );
  console.log(currentFontSettings, "currentFontSettings");
  const designSettings = useAppSelector((state) => state.editor.designSettings);
  const [selectedTitleFont, setSelectedTitleFont] =
    useState<FontFamilyOption | null>(null);
  const [selectedTitleStyle, setSelectedTitleStyle] =
    useState<FontVariantOption | null>(null);
  const [selectedBodyFont, setSelectedBodyFont] =
    useState<FontFamilyOption | null>(null);
  const [selectedBodyStyle, setSelectedBodyStyle] =
    useState<FontVariantOption | null>(null);
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

  const handleFontChange = (fontValue: string, isTitle: boolean) => {
    const font = fontOptions.find((f) => f.value === fontValue);
    if (font) {
      const firstStyle = font.variants.map(createFontVariantOption)[0];
      const fontHref = createSelectedFontHref({
        family: font,
        variant: firstStyle,
      });

      if (isTitle) {
        setSelectedTitleFont(font);
        setSelectedTitleStyle(firstStyle || null);
        dispatch(
          updateDesignSettings({
            ...designSettings,
            fonts: {
              ...currentFontSettings,
              titleFont: {
                ...currentFontSettings.titleFont,
                fontFamily: font.value,
                fontWeight: firstStyle ? firstStyle.weight : "400",
                fontFamilyUrl: fontHref,
              },
            },
          })
        );
      } else {
        setSelectedBodyFont(font);
        setSelectedBodyStyle(firstStyle || null);
        dispatch(
          updateDesignSettings({
            ...designSettings,
            fonts: {
              ...currentFontSettings,
              bodyFont: {
                ...currentFontSettings.bodyFont,
                fontFamily: font.value,
                fontWeight: firstStyle ? firstStyle.weight : "400",
                fontFamilyUrl: fontHref,
              },
            },
          })
        );
      }
    }
  };

  const handleStyleChange = (styleValue: string, isTitle: boolean) => {
    const selectedFont = isTitle ? selectedTitleFont : selectedBodyFont;
    if (!selectedFont) return;

    const style = selectedFont.variants
      .map(createFontVariantOption)
      .find((s) => s.value === styleValue);

    if (style) {
      const fontHref = createSelectedFontHref({
        family: selectedFont,
        variant: style,
      });

      if (isTitle) {
        setSelectedTitleStyle(style);
        dispatch(
          updateDesignSettings({
            ...designSettings,
            fonts: {
              ...currentFontSettings,
              titleFont: {
                ...currentFontSettings.titleFont,
                fontWeight: style.weight,
                fontFamilyUrl: fontHref,
              },
            },
          })
        );
      } else {
        setSelectedBodyStyle(style);
        dispatch(
          updateDesignSettings({
            ...designSettings,
            fonts: {
              ...currentFontSettings,
              bodyFont: {
                ...currentFontSettings.bodyFont,
                fontWeight: style.weight,
                fontFamilyUrl: fontHref,
              },
            },
          })
        );
      }
    }
  };

  useEffect(() => {
    if (currentFontSettings.titleFont) {
      const titleFont = fontOptions.find(
        (f) => f.value === currentFontSettings.titleFont.fontFamily
      );
      if (titleFont) {
        setSelectedTitleFont(titleFont);
        const titleStyle = titleFont.variants
          .map(createFontVariantOption)
          .find((s) => s.weight === currentFontSettings.titleFont.fontWeight);
        if (titleStyle) {
          setSelectedTitleStyle(titleStyle);
        }
      }
    }

    if (currentFontSettings.bodyFont) {
      const bodyFont = fontOptions.find(
        (f) => f.value === currentFontSettings.bodyFont.fontFamily
      );
      if (bodyFont) {
        setSelectedBodyFont(bodyFont);
        const bodyStyle = bodyFont.variants
          .map(createFontVariantOption)
          .find((s) => s.weight === currentFontSettings.bodyFont.fontWeight);
        if (bodyStyle) {
          setSelectedBodyStyle(bodyStyle);
        }
      }
    }
  }, [currentFontSettings, fontOptions]);

  if (loading) return <div className="text-center">Loading fonts...</div>;
  if (error)
    return <div className="text-center text-red-500">Error loading fonts</div>;

  return (
    <>
      <BackBtn label="Fonts" handleBack={() => setOpenFonts(false)} />
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
          {/* Title font selector */}
          <FontSelectorContent
            selectedFont={selectedTitleFont}
            selectedStyle={selectedTitleStyle}
            onFontChange={(value: string) => handleFontChange(value, true)}
            onStyleChange={(value: string) => handleStyleChange(value, true)}
            filteredFonts={filteredFonts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
        <TabsContent className="px-5" value="Body">
          {/* Body font selector */}
          <FontSelectorContent
            selectedFont={selectedBodyFont}
            selectedStyle={selectedBodyStyle}
            onFontChange={(value) => handleFontChange(value, false)}
            onStyleChange={(value) => handleStyleChange(value, false)}
            filteredFonts={filteredFonts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FontSelector;
