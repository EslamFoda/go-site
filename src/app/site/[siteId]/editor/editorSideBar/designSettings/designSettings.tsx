import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useMemo, useState } from "react";
import AiThemes from "./aiThemes";
import Customize from "./customize";
import Fonts from "./customize/fonts";
import useGoogleFonts from "@/hooks/useGoogleFonts";
import Width from "./customize/width";
import BackBtn from "@/components/shared/backBtn";
import { closeDrawer } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
function DesignSettings() {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState("ai-theme");
  const [fontSettingsTab, setFontSettingsTab] = useState("Title");
  const [openFonts, setOpenFonts] = useState(false);
  const [openWidth, setOpenWidth] = useState(false);
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

  if (openWidth) {
    return <Width setOpenWidth={setOpenWidth} />;
  }

  return (
    <div>
      <BackBtn
        doneBtn
        handleDone={() => dispatch(closeDrawer())}
        btnContainerClassName="w-full md:hidden"
        label="Design"
        handleBack={() => dispatch(closeDrawer())}
      />
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
            setOpenWidth={setOpenWidth}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesignSettings;
