import React, { useRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateDesignSettings,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { getCSSVariableValueByElement } from "@/helper";
import { aiThemes } from "@/constant/theme";
import ThemeItem from "./themeItem";

// Define types
export interface Theme {
  colorPallet: string;
  colorName: string;
  borderRadius: string;
  titleFontFamily: string;
  titleFontWeight: string;
  bodyFontFamily: string;
  titleFontFamilyUrl: string;
  bodyFontFamilyUrl: string;
  bodyFontWeight: string;
  primaryColor?: string;
  primaryForGround?: string;
}

function AiThemes() {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const designSettings = useAppSelector((state) => state.editor.designSettings);
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);

  const activeTheme = {
    colorPallet: designSettings.colors.primary,
    colorName: selectedPallet,
    borderRadius: designSettings.borderRadius,
    titleFontFamily: designSettings.fonts.titleFont.fontFamily,
    titleFontWeight: designSettings.fonts.titleFont.fontWeight,
    bodyFontFamily: designSettings.fonts.bodyFont.fontFamily,
    titleFontFamilyUrl: designSettings.fonts.titleFont.fontFamilyUrl,
    bodyFontFamilyUrl: designSettings.fonts.bodyFont.fontFamilyUrl,
    bodyFontWeight: designSettings.fonts.bodyFont.fontWeight,
    primaryForGround: designSettings.colors.primaryForGround,
  } as Theme;
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
              fontWeight: theme.bodyFontWeight,
            },
            titleFont: {
              ...designSettings.fonts.titleFont,
              fontFamily: theme.titleFontFamily,
              fontFamilyUrl: theme.titleFontFamilyUrl,
              fontWeight: theme.titleFontWeight,
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
        {aiThemes.map((theme: any) => (
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
