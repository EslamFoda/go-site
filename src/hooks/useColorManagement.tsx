import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateDesignSettings } from "@/reduxStore/action";
import { calculateTextColor, cssColorToHex } from "@/helper";
import Color from "color";

export const useColorManagement = () => {
  const dispatch = useAppDispatch();
  const designSettings = useAppSelector(
    (state) => state.editor.present.designSettings
  );

  const updateColors = (bgColor: string) => {
    const hexColor = cssColorToHex(bgColor);
    const hslColor = Color(hexColor).hsl().string();
    const hslPrimaryColor = hslColor.replace(/hsl\(|\)|,/g, "").trim();
    const newTextColor = calculateTextColor(hexColor);

    dispatch(
      updateDesignSettings({
        ...designSettings,
        colors: {
          primary: hslPrimaryColor,
          primaryForGround: newTextColor,
        },
      })
    );
  };

  return {
    selectedColor: designSettings.colors.primary,
    textColor: designSettings.colors.primaryForGround,
    updateColors,
  };
};
