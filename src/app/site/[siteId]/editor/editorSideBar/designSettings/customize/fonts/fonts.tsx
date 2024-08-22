import React, { useState, useEffect } from "react";
import { updateDesignSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import BackBtn from "@/components/shared/backBtn";
import SelectGFont from "./selectFont";
import { Font, FontOption } from "@/types/common";

interface FontSelectorProps {
  fontSettingsTab: string;
  fonts: Font[];
  fontOptions: FontOption[];
  // loading: boolean;
  // error: any;
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  setOpenFonts: React.Dispatch<React.SetStateAction<boolean>>;
}

const FontSelector = ({
  fontSettingsTab,
  fonts,
  fontOptions,
  // error,
  // loading,
  setFontSettingsTab,
  setOpenFonts,
}: FontSelectorProps) => {
  const dispatch = useAppDispatch();

  const designSettings = useAppSelector((state) => state.editor.designSettings);
  const storedFonts = useAppSelector(
    (state) => state.editor.designSettings.fonts
  );

  const [selectedTitleFont, setSelectedTitleFont] = useState<FontOption | null>(
    null
  );
  const [selectedBodyFont, setSelectedBodyFont] = useState<FontOption | null>(
    null
  );
  const [selectedBodyVariant, setSelectedBodyVariant] = useState<string | null>(
    null
  );
  const [selectedTitleVariant, setSelectedTitleVariant] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Set initial selected fonts based on Redux store
    const titleFontOption = fontOptions.find(
      (option) => option.label === storedFonts.titleFont.fontFamily
    );
    const bodyFontOption = fontOptions.find(
      (option) => option.label === storedFonts.bodyFont.fontFamily
    );
    setSelectedTitleVariant(storedFonts.titleFont.fontWeight);
    setSelectedBodyVariant(storedFonts.bodyFont.fontWeight);

    if (titleFontOption) setSelectedTitleFont(titleFontOption);
    if (bodyFontOption) setSelectedBodyFont(bodyFontOption);
  }, [storedFonts, fontOptions]);

  const updateFontSettings = (
    family: string,
    variant: string,
    isTitle: boolean,
    fontUrl: string
  ) => {
    dispatch(
      updateDesignSettings({
        ...designSettings,
        fonts: {
          ...designSettings.fonts,
          [isTitle ? "titleFont" : "bodyFont"]: {
            fontFamily: family,
            fontWeight: variant,
            fontFamilyUrl: fontUrl,
          },
        },
      })
    );
  };

  const config = {
    key: "AIzaSyC_ulHC5c08LdfxEAAXnTV5hm-2YCwFY2g",
    containerFonte: fontSettingsTab === "Title" ? "titleFont" : "bodyFont",
    containerVariante: "defaultVariant",
    onSelectFonte: (family: string, variant: string, fontData: any) => {
      const fontUrl = fontData.files[variant];
      updateFontSettings(family, variant, fontSettingsTab === "Title", fontUrl);
    },
    onSelectVariante: (family: string, variant: string, fontData: any) => {
      const fontUrl = fontData.files[variant];
      updateFontSettings(family, variant, fontSettingsTab === "Title", fontUrl);
    },
  };

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
          <SelectGFont
            config={config}
            fontOptions={fontOptions}
            fonts={fonts}
            selectedFont={selectedTitleFont}
            setSelectedFont={setSelectedTitleFont}
            selectedFontVariant={selectedTitleVariant}
          />
        </TabsContent>
        <TabsContent className="px-5" value="Body">
          {/* Body font selector */}
          <SelectGFont
            config={config}
            fontOptions={fontOptions}
            fonts={fonts}
            selectedFont={selectedBodyFont}
            setSelectedFont={setSelectedBodyFont}
            selectedFontVariant={selectedBodyVariant}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FontSelector;
