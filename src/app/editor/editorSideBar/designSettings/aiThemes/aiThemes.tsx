import { updateSelectedPallet } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import Color from "color";
import React, { useRef } from "react";

function AiThemes() {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const themeMapping: Record<string, string> = {
    "theme-rose": "Rose",
    "theme-green": "Green",
    "theme-orange": "Orange",
    "default-theme": "default",
  };

  const getCSSVariableValue = (
    element: HTMLElement | null,
    variableName: string
  ): string => {
    if (!element) return "";
    return getComputedStyle(element).getPropertyValue(variableName).trim();
  };
  const updatePageContainerColor = (primaryColor: string): void => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      pageContainer.style.setProperty("--primary", primaryColor);
    }
  };

  return (
    <div className="pb-20">
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(themeMapping).map(([key, value]) => (
          <div key={key} className={key}>
            <div
              ref={(el: HTMLDivElement | null) => {
                themeRefs.current[key] = el;
              }}
              className="bg-primary h-12"
              onClick={() => {
                dispatch(updateSelectedPallet(key));
                const primaryColor = getCSSVariableValue(
                  themeRefs.current[key],
                  "--primary"
                );
                updatePageContainerColor(primaryColor);
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiThemes;
