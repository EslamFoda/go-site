import React, { useRef, useCallback } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateSelectedPallet } from "@/reduxStore/action";
import { themeMapping } from "@/constant/theme";
import { getCSSVariableValueByElement } from "@/helper";

function AiThemes() {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleThemeClick = useCallback(
    (key: string) => {
      const pageContainer = document.querySelector(
        ".page-container"
      ) as HTMLElement;
      if (!pageContainer) return;
      pageContainer.style.removeProperty("--radius");
      if (key === "default-theme") {
        pageContainer.style.removeProperty("--primary");
        pageContainer.style.removeProperty("--primary-foreground");
      } else {
        const themeElement = themeRefs.current[key];
        if (themeElement) {
          const primaryColor = getCSSVariableValueByElement(
            themeElement,
            "--primary"
          );
          pageContainer.style.setProperty("--primary", primaryColor);
        }
      }

      dispatch(updateSelectedPallet(key));
    },
    [dispatch]
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
        {Object.entries(themeMapping).map(([key, value]) => (
          <div key={key} className={key}>
            <div
              ref={setThemeRef(key)}
              className="bg-primary h-12"
              onClick={() => handleThemeClick(key)}
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
