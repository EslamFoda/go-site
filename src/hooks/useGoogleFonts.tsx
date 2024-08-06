import { Font, FontOption } from "@/types/common";
import { useState, useEffect } from "react";

const useGoogleFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [fontOptions, setFontOptions] = useState<FontOption[]>([]);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const cachedFonts = localStorage.getItem("googleFonts");
        if (cachedFonts) {
          const { fonts: cachedFontData, timestamp } = JSON.parse(cachedFonts);
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            // 24 hours
            setFonts(cachedFontData);
            setFontOptions(
              cachedFontData.map((font: Font, index: number) => ({
                value: index,
                label: font.family,
                category: font.category,
              }))
            );
            return;
          }
        }

        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyC_ulHC5c08LdfxEAAXnTV5hm-2YCwFY2g`
        );
        const data = await response.json();
        setFonts(data.items);

        const options: FontOption[] = data.items.map(
          (font: Font, index: number) => ({
            value: index,
            label: font.family,
            category: font.category,
          })
        );
        setFontOptions(options);

        localStorage.setItem(
          "googleFonts",
          JSON.stringify({ fonts: data.items, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Failed to load Google Fonts data:", error);
      }
    };

    fetchFonts();
  }, []);

  return { fonts, fontOptions };
};

export default useGoogleFonts;
