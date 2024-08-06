import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useMemo, useState } from "react";
import AiThemes from "./aiThemes";
import Customize from "./customize";
import Fonts from "./customize/fonts";
import useGoogleFonts from "@/hooks/useGoogleFonts";
function DesignSettings() {
  const [tabValue, setTabValue] = useState("ai-theme");
  const [fontSettingsTab, setFontSettingsTab] = useState("Title");
  const [openFonts, setOpenFonts] = useState(false);
  const { fonts, fontOptions } = useGoogleFonts();

  const fontSelectorProps = useMemo(
    () => ({
      fontSettingsTab,
      fonts,
      fontOptions,
      setFontSettingsTab,
      setOpenFonts,
    }),
    [fontSettingsTab, fonts, fontOptions]
  );

  if (openFonts) {
    return <Fonts {...fontSelectorProps} />;
  }

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="ai-theme">AI Theme</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        <TabsContent className="px-5" value="ai-theme">
          <AiThemes />
        </TabsContent>
        <TabsContent className="px-5" value="customize">
          <Customize
            setFontSettingsTab={setFontSettingsTab}
            setOpenFonts={setOpenFonts}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesignSettings;
