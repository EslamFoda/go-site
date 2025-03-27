import React, { useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateDesignSettings,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { aiThemes } from "@/constant/theme";
import ThemeItem from "./themeItem";
import { useMotion } from "@/hooks/useMotion";

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

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function AiThemes() {
  const dispatch = useAppDispatch();
  const { motion } = useMotion();
  const themeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const designSettings = useAppSelector(
    (state) => state.editor.present.designSettings
  );
  const selectedPallet = useAppSelector(
    (state) => state.editor.present.selectedPallet
  );

  const activeTheme = {
    colorName: selectedPallet,
    borderRadius: designSettings.borderRadius,
    titleFontFamily: designSettings.fonts.titleFont.fontFamily,
    titleFontWeight: designSettings.fonts.titleFont.fontWeight,
    bodyFontFamily: designSettings.fonts.bodyFont.fontFamily,
    titleFontFamilyUrl: designSettings.fonts.titleFont.fontFamilyUrl,
    bodyFontFamilyUrl: designSettings.fonts.bodyFont.fontFamilyUrl,
    bodyFontWeight: designSettings.fonts.bodyFont.fontWeight,
    primaryForGround:
      selectedPallet === "custom" ? designSettings.colors.primaryForGround : "",
    colorPallet:
      selectedPallet === "custom"
        ? designSettings.colors.primary
        : selectedPallet,
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
      } else {
        const themeElement = themeRefs.current[theme.colorPallet];
        if (themeElement) {
          pageContainer.style.removeProperty("--primary");
          pageContainer.style.removeProperty("--primary-foreground");
          pageContainer.style.setProperty("--radius", theme.borderRadius);
        }
      }

      const updatedDesignSettings = {
        ...designSettings,
        borderRadius: theme.borderRadius,
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
      };

      dispatch(updateSelectedPallet(theme.colorPallet));
      dispatch(updateDesignSettings(updatedDesignSettings));
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
    <div className="overflow-y-auto" style={{ height: "calc(92vh - 70px)" }}>
      <motion.div
        className="grid grid-cols-2 gap-2"
        variants={variants}
        initial="closed"
        animate="open"
      >
        {/* Selected Theme */}
        <ThemeItem
          noAnimation
          key={activeTheme.colorPallet}
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
      </motion.div>
    </div>
  );
}

export default AiThemes;
