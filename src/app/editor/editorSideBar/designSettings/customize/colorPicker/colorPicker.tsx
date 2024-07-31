import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { updateSelectedPallet } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { getCSSVariableValueByElement } from "@/helper";
import { Label } from "@/components/ui/label";
import { themeMapping } from "@/constant/theme";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useColorManagement } from "@/hooks/useColorManagement";

const ColorPicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { selectedColor, textColor, updateColors } = useColorManagement();
  const selectedPalette = useAppSelector(
    (state) => state.editor.selectedPallet
  );

  useEffect(() => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      const primaryColor = getCSSVariableValueByElement(
        pageContainer,
        "--primary"
      );
      updateColors(primaryColor);
    }
  }, [updateColors]);

  const handleThemeClick = useCallback(
    (key: string) => {
      dispatch(updateSelectedPallet(key));

      if (key === "default-theme") {
        const pageContainer = document.querySelector(
          ".page-container"
        ) as HTMLElement;
        if (pageContainer) {
          pageContainer.style.removeProperty("--primary");
          pageContainer.style.removeProperty("--primary-foreground");
        }
      } else {
        const primaryColor = getCSSVariableValueByElement(
          themeRefs.current[key],
          "--primary"
        );
        updateColors(primaryColor);
      }
    },
    [dispatch, updateColors]
  );

  const themeButtons = useMemo(
    () =>
      Object.entries(themeMapping)
        .slice(0, 8)
        .map(([key]) => (
          <div
            key={key}
            className={`${key} flex items-center justify-center rounded-[4px] h-8 hover:bg-muted cursor-pointer`}
            onClick={() => handleThemeClick(key)}
          >
            <div
              ref={(el: HTMLDivElement | null) => {
                themeRefs.current[key] = el;
              }}
              className="w-4 h-4 m-1 rounded-full bg-primary"
            ></div>
          </div>
        )),
    [handleThemeClick]
  );

  return (
    <div className="flex flex-col">
      <div className={`space-y-1 flex items-center justify-between`}>
        <Label>Color</Label>
        <div className="border-solid border divide-y rounded-sm w-4/6">
          <div className="grid grid-cols-4 gap-1 p-1">{themeButtons}</div>
          <div className={selectedPalette}>
            <Popover>
              <PopoverTrigger>
                <HexColorInput
                  prefixed
                  className="px-2 w-full focus:outline-none focus-within:outline-none outline-none rounded-b-[4px] h-10"
                  style={{
                    color: `hsl(${textColor})`,
                    backgroundColor: selectedColor,
                  }}
                  color={selectedColor}
                  onChange={updateColors}
                />
              </PopoverTrigger>
              <PopoverContent align="start" className="border-none w-auto p-0">
                <HexColorPicker color={selectedColor} onChange={updateColors} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
