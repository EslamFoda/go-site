import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import AiThemes from "./aiThemes";
import Customize from "./customize";
import Fonts from "./customize/fonts";
import { useGoogleFonts } from "@/hooks/useFont";
function DesignSettings() {
  const [tabValue, setTabValue] = useState("ai-theme");
  const [fontSettingsTab, setFontSettingsTab] = useState("Title");
  const [openFonts, setOpenFonts] = useState(false);
  const { fonts, loading, error } = useGoogleFonts();

  if (openFonts)
    return (
      <Fonts
        fontSettingsTab={fontSettingsTab}
        setFontSettingsTab={setFontSettingsTab}
        fonts={fonts}
        loading={loading}
        error={error}
        setOpenFonts={setOpenFonts}
      />
    );

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
