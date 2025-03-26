import { Check } from "lucide-react";
import React from "react";
import { Theme } from "../aiThemes";
import { useMotion } from "@/hooks/useMotion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface ThemeItemProps {
  theme: Theme;
  isSelected: boolean;
  onClick: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

const ThemeItem: React.FC<ThemeItemProps> = React.memo(
  ({ theme, isSelected, onClick, setRef }) => {
    const { motion } = useMotion();

    // Normalize font weight for CSS (e.g., "regular" -> "400")
    const normalizeFontWeight = (weight: string) => {
      return weight === "regular" ? "400" : weight.replace(/[^0-9]/g, "");
    };

    // Generate unique font family names to avoid conflicts
    const titleFontFamily = `${theme.colorName}-title-${theme.titleFontFamily}`;
    const bodyFontFamily = `${theme.colorName}-body-${theme.bodyFontFamily}`;

    return (
      <>
        {/* Inject @font-face styles */}
        <style jsx>{`
          @font-face {
            font-family: "${titleFontFamily}";
            src: url("${theme.titleFontFamilyUrl}") format("truetype");
            font-weight: ${normalizeFontWeight(theme.titleFontWeight)};
            font-style: normal;
          }
          @font-face {
            font-family: "${bodyFontFamily}";
            src: url("${theme.bodyFontFamilyUrl}") format("truetype");
            font-weight: ${normalizeFontWeight(theme.bodyFontWeight)};
            font-style: normal;
          }
        `}</style>

        <motion.div
          variants={variants}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          className={theme.colorPallet}
          onClick={onClick}
        >
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
                    fontFamily: titleFontFamily,
                    fontWeight: normalizeFontWeight(theme.titleFontWeight),
                  }}
                >
                  Title
                </span>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: bodyFontFamily,
                    fontWeight: normalizeFontWeight(theme.bodyFontWeight),
                  }}
                >
                  Body
                </span>
                <div
                  className="bg-primary text-sm mt-2 h-7 flex justify-center items-center text-primary-foreground"
                  style={{
                    borderRadius: theme.borderRadius,
                    fontFamily: bodyFontFamily,
                    fontWeight: normalizeFontWeight(theme.bodyFontWeight),
                    backgroundColor:
                      theme.colorName === "default-theme" && !theme.colorPallet
                        ? ""
                        : `hsl(${theme.colorPallet})`,
                    color:
                      theme.colorName === "default-theme" && !theme.colorPallet
                        ? ""
                        : `hsl(${theme.primaryForGround})`,
                  }}
                >
                  Link
                </div>
              </div>
              <div ref={setRef}></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm capitalize">
                {theme.colorName.replace("theme-", "")}
              </span>
              {isSelected && <Check size={15} />}
            </div>
          </div>
        </motion.div>
      </>
    );
  }
);

ThemeItem.displayName = "ThemeItem";

export default ThemeItem;
