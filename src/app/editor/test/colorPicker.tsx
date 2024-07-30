import React, { useState, useEffect, useRef } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { updateSelectedPallet } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Color from "color";

const ColorPicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const themeMapping: Record<string, string> = {
    "theme-rose": "Rose",
    "theme-green": "Green",
    "theme-orange": "Orange",
    "default-theme": "default",
  };

  const [selectedColor, setSelectedColor] = useState<string>("#F8EDE3");
  const [textColor, setTextColor] = useState<string>("#000000");
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);

  useEffect(() => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      const primaryColor = getCSSVariableValue(pageContainer, "--primary");
      const hexColor = cssColorToHex(primaryColor);
      setSelectedColor(hexColor);
      updateTextColor(hexColor);
      updatePageContainerColor(hexColor);
    }
  }, []);

  const updateTextColor = (bgColor: string): void => {
    try {
      const rgb = Color(bgColor).rgb().object();
      const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
      setTextColor(luminance > 0.5 ? "#000000" : "#FFFFFF");
    } catch (error) {
      console.error("Error calculating text color:", error);
      setTextColor("#000000"); // Default to black text if calculation fails
    }
  };

  const updatePageContainerColor = (color: string): void => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      console.log(color, "color");
      const hslColor = Color(color).hsl().string();
      const hslValues = hslColor.replace(/hsl\(|\)|,/g, "").trim();
      pageContainer.style.setProperty("--primary", hslValues);
    }
  };

  const getCSSVariableValue = (
    element: HTMLElement | null,
    variableName: string
  ): string => {
    if (!element) return "";
    return getComputedStyle(element).getPropertyValue(variableName).trim();
  };

  const cssColorToHex = (cssColor: string): string => {
    try {
      // Check if the color is in HSL format
      const hslMatch = cssColor.match(
        /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/
      );
      if (hslMatch) {
        const [, h, s, l] = hslMatch;
        return Color.hsl(parseFloat(h), parseFloat(s), parseFloat(l)).hex();
      }
      // If not HSL, assume it's a valid color string
      return Color(cssColor).hex();
    } catch (error) {
      console.error("Error converting color:", error);
      return "#000000"; // Return a default color if conversion fails
    }
  };

  return (
    <div className="flex flex-col w-64">
      <div className="flex flex-wrap">
        {Object.entries(themeMapping).map(([key, value]) => (
          <div key={key} className={key}>
            <div
              ref={(el: HTMLDivElement | null) => {
                themeRefs.current[key] = el;
              }}
              className="w-8 h-8 m-1 cursor-pointer border bg-primary border-gray-300"
              onClick={() => {
                dispatch(updateSelectedPallet(key));
                const primaryColor = getCSSVariableValue(
                  themeRefs.current[key],
                  "--primary"
                );
                const hexColor = cssColorToHex(primaryColor);
                setSelectedColor(hexColor);
                updateTextColor(hexColor);
                updatePageContainerColor(hexColor);
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className={selectedPallet}>
        <HexColorPicker
          color={selectedColor}
          onChange={(color) => {
            setSelectedColor(color);
            updateTextColor(color);
            updatePageContainerColor(color);
          }}
        />
        <HexColorInput
          color={selectedColor}
          onChange={(color) => {
            setSelectedColor(color);
            updateTextColor(color);
            updatePageContainerColor(color);
          }}
          className="mt-2 px-2 py-1 w-full border border-gray-300 rounded"
        />
        <div
          className="mt-4 p-4 bg-primary text-center rounded"
          style={{ color: textColor, backgroundColor: selectedColor }}
        >
          Sample Text
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
