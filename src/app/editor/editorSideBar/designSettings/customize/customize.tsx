import React from "react";
import ColorPicker from "./colorPicker";
import Shape from "./shape";
import FontButtons from "./fonts/fontButtons";

interface CustomizeProps {
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  setOpenFonts: React.Dispatch<React.SetStateAction<boolean>>;
}

function Customize({ setFontSettingsTab, setOpenFonts }: CustomizeProps) {
  return (
    <div className="space-y-4">
      <ColorPicker />
      <Shape />
      <FontButtons
        setFontSettingsTab={setFontSettingsTab}
        setOpenFonts={setOpenFonts}
      />
    </div>
  );
}

export default Customize;
