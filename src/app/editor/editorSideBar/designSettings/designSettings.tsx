import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import AiThemes from "./aiThemes";
import ColorPicker from "../../test/colorPicker";

function DesignSettings() {
  const [tabValue, setTabValue] = useState("ai-theme");

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="ai-theme">AI Theme</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        <TabsContent className="px-5 h " value="ai-theme">
          <AiThemes />
        </TabsContent>
        <TabsContent className="px-5 h " value="customize">
          <ColorPicker />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DesignSettings;
