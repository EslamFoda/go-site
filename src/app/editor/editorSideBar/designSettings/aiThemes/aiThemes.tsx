import React, { useRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateDesignSettings,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { getCSSVariableValueByElement } from "@/helper";
import { aiThemes } from "@/constant/theme";
import { Check } from "lucide-react";

// Define types
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

// Separate component for theme item
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

function AiThemes() {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const designSettings = useAppSelector((state) => state.editor.designSettings);
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);

  const activeTheme = useMemo(
    () =>
      aiThemes.find((theme) => theme.colorPallet === selectedPallet) as Theme,
    [selectedPallet]
  );

  const handleThemeClick = useCallback(
    (theme: Theme) => {
      const pageContainer = document.querySelector(
        ".page-container"
      ) as HTMLElement;
      if (!pageContainer) return;

      if (theme.colorPallet === "default-theme") {
        pageContainer.style.removeProperty("--primary");
        pageContainer.style.removeProperty("--primary-foreground");
        pageContainer.style.removeProperty("--radius");
      } else {
        const themeElement = themeRefs.current[theme.colorPallet];
        if (themeElement) {
          const primaryColor = getCSSVariableValueByElement(
            themeElement,
            "--primary"
          );
          const primaryForGround = getCSSVariableValueByElement(
            themeElement,
            "--primary-foreground"
          );
          pageContainer.style.setProperty("--primary", primaryColor);
          pageContainer.style.setProperty("--radius", theme.borderRadius);
          pageContainer.style.setProperty(
            "--primary-foreground",
            primaryForGround
          );
        }
      }

      dispatch(updateSelectedPallet(theme.colorPallet));
      dispatch(
        updateDesignSettings({
          ...designSettings,
          borderRadius: theme.borderRadius,
          colors: {
            ...designSettings.colors,
            primary:
              theme.colorPallet === "default-theme"
                ? ""
                : getCSSVariableValueByElement(
                    themeRefs.current[theme.colorPallet],
                    "--primary"
                  ),
            primaryForGround:
              theme.colorPallet === "default-theme"
                ? ""
                : getCSSVariableValueByElement(
                    themeRefs.current[theme.colorPallet],
                    "--primary-foreground"
                  ),
          },
          fonts: {
            ...designSettings.fonts,
            bodyFont: {
              ...designSettings.fonts.bodyFont,
              fontFamily: theme.bodyFontFamily,
              fontFamilyUrl: theme.bodyFontFamilyUrl,
            },
            titleFont: {
              ...designSettings.fonts.titleFont,
              fontFamily: theme.titleFontFamily,
              fontFamilyUrl: theme.titleFontFamilyUrl,
            },
          },
        })
      );
    },
    [dispatch, designSettings]
  );

  const setThemeRef = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      themeRefs.current[key] = el;
    },
    []
  );

  return (
    <div className="pb-20">
      <div className="grid grid-cols-2 gap-2">
        {/* Selected Theme */}
        <ThemeItem
          theme={activeTheme}
          isSelected={true}
          onClick={() => {}}
          setRef={setThemeRef(activeTheme.colorPallet)}
        />

        {/* Theme Options */}
        {aiThemes.map((theme) => (
          <ThemeItem
            key={theme.colorPallet}
            theme={theme}
            isSelected={selectedPallet === theme.colorPallet}
            onClick={() => handleThemeClick(theme)}
            setRef={setThemeRef(theme.colorPallet)}
          />
        ))}
      </div>
    </div>
  );
}

export default AiThemes;
