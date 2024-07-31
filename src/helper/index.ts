import Color from "color";

export const getCSSVariableValueByClassName = (
  className: string,
  variableName: string
): string => {
  const element = document.querySelector(`.${className}`);
  if (!element) return "";
  return getComputedStyle(element).getPropertyValue(variableName).trim();
};

export const getCSSVariableValueByElement = (
  element: HTMLElement | null,
  variableName: string
): string => {
  if (!element) return "";
  return getComputedStyle(element).getPropertyValue(variableName).trim();
};

// Helper functions
export const cssColorToHex = (cssColor: string): string => {
  try {
    const hslMatch = cssColor.match(
      /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/
    );
    if (hslMatch) {
      const [, h, s, l] = hslMatch;
      return Color.hsl(parseFloat(h), parseFloat(s), parseFloat(l)).hex();
    }
    return Color(cssColor).hex();
  } catch (error) {
    console.error("Error converting color:", error);
    return "#000000";
  }
};

export const calculateTextColor = (bgColor: string): string => {
  try {
    const rgb = Color(bgColor).rgb().object();
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    const newTextColor = luminance > 0.5 ? Color("#000000") : Color("#FFFFFF");
    return newTextColor
      .hsl()
      .string()
      .replace(/hsl\(|\)|,/g, "")
      .trim();
  } catch (error) {
    console.error("Error calculating text color:", error);
    return "0 0% 0%";
  }
};
