import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateDesignSettings } from "@/reduxStore/action";
import { calculateTextColor, cssColorToHex } from "@/helper";
import Color from "color";

export const useColorManagement = () => {
  const dispatch = useAppDispatch();
  const designSettings = useAppSelector((state) => state.editor.designSettings);

  const updateColors = useCallback(
    (bgColor: string) => {
      const hexColor = cssColorToHex(bgColor);
      const newTextColor = calculateTextColor(hexColor);

      dispatch(
        updateDesignSettings({
          ...designSettings,
          colors: {
            primary: hexColor,
            primaryForGround: newTextColor,
          },
        })
      );

      updatePageContainerColor(hexColor, newTextColor);
    },
    [dispatch]
  );

  const updatePageContainerColor = (bgColor: string, textColorHSL: string) => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      const hslColor = Color(bgColor).hsl().string();
      const hslValues = hslColor.replace(/hsl\(|\)|,/g, "").trim();
      pageContainer.style.setProperty("--primary", hslValues);
      pageContainer.style.setProperty("--primary-foreground", textColorHSL);
    }
  };

  return {
    selectedColor: designSettings.colors.primary,
    textColor: designSettings.colors.primaryForGround,
    updateColors,
  };
};
