import { calculateTextColor, cssColorToHex } from "@/helper";
import Color from "color";
import { useCallback, useState } from "react";

// Custom hook for color management
export const useColorManagement = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#F8EDE3");
  const [textColor, setTextColor] = useState<string>("0 0% 0%");

  const updateColors = useCallback((bgColor: string) => {
    const hexColor = cssColorToHex(bgColor);
    setSelectedColor(hexColor);
    const newTextColor = calculateTextColor(hexColor);
    setTextColor(newTextColor);
    updatePageContainerColor(hexColor, newTextColor);
  }, []);

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

  return { selectedColor, textColor, updateColors };
};
