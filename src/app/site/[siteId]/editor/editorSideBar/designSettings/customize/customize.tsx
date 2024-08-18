import React from "react";
import ColorPicker from "./colorPicker";
import Shape from "./shape";
import FontButtons from "./fonts/fontButtons";
import WidthBtn from "./width/widthBtn";

interface CustomizeProps {
  setFontSettingsTab: React.Dispatch<React.SetStateAction<string>>;
  setOpenFonts: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWidth: React.Dispatch<React.SetStateAction<boolean>>;
}

function Customize({
  setFontSettingsTab,
  setOpenFonts,
  setOpenWidth,
}: CustomizeProps) {
  return (
    <div className="space-y-4">
      <ColorPicker />
      <FontButtons
        setFontSettingsTab={setFontSettingsTab}
        setOpenFonts={setOpenFonts}
      />
      <Shape />
      <WidthBtn setOpenWidth={setOpenWidth} />
    </div>
  );
}

export default Customize;
