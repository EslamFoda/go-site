import { Check } from "lucide-react";
import React from "react";

interface Theme {
  colorPallet: string;
  colorName: string;
  borderRadius: string;
  titleFontFamily: string;
  bodyFontFamily: string;
  titleFontFamilyUrl: string;
  bodyFontFamilyUrl: string;
}
interface ThemeItemProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

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
              style={{ fontFamily: theme.titleFontFamily }}
            >
              Title
            </span>
            <span
              className="text-sm"
              style={{ fontFamily: theme.bodyFontFamily }}
            >
              Body
            </span>
            <div
              className="bg-primary mt-2 h-7 flex justify-center items-center text-primary-foreground"
              style={{
                borderRadius: theme.borderRadius,
                fontFamily: theme.bodyFontFamily,
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
