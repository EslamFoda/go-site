import { Check } from "lucide-react";
import React from "react";
import { Theme } from "../aiThemes";
import { Noto_Serif_SC, Gloock } from "next/font/google";

interface ThemeItemProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

// Define all your local fonts
const gloock = Gloock({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

// Add more local fonts as needed
// const anotherFont = localFont({
//   src: "../../../../../../fonts/AnotherFont.ttf",
// });

// Create a mapping of font names to their localFont objects
const fontMap = {
  Gloock: gloock,
  "Noto Serif SC": notoSerifSC,
  // "Another Font": anotherFont,
  // Add more fonts to the map as needed
};

const getFontFamily = (fontName: string) => {
  const font = fontMap[fontName as keyof typeof fontMap];
  return font ? font.style.fontFamily : fontName;
};

const ThemeItem: React.FC<ThemeItemProps> = React.memo(
  ({ theme, isSelected, onClick, setRef }) => (
    <div className={theme.colorPallet} onClick={onClick}>
      <div
        style={{ borderRadius: "4px" }}
        className={`${
          isSelected ? "bg-muted-foreground/65" : "bg-muted"
        } p-2 hover:bg-muted-foreground/65 cursor-pointer`}
      >
        <div style={{ borderRadius: "4px" }} className="bg-background p-2">
          <div className="flex flex-col">
            <span
              className="text-sm"
              style={{
                fontFamily: getFontFamily(theme.titleFontFamily),
                fontWeight: theme.titleFontWeight,
              }}
            >
              Title
            </span>
            <span
              className="text-sm"
              style={{
                fontFamily: getFontFamily(theme.bodyFontFamily),
                fontWeight: theme.bodyFontWeight,
              }}
            >
              Body
            </span>
            <div
              className="bg-primary text-sm mt-2 h-7 flex justify-center items-center text-primary-foreground"
              style={{
                borderRadius: theme.borderRadius,
                fontFamily: getFontFamily(theme.bodyFontFamily),
                fontWeight: theme.bodyFontWeight,
              }}
            >
              Link
            </div>
          </div>
          <div ref={setRef}></div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm">{theme.colorName}</span>
          {isSelected && <Check size={15} />}
        </div>
      </div>
    </div>
  )
);

ThemeItem.displayName = "AccordionItem";

export default ThemeItem;
