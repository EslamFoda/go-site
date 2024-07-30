import { useEffect, useState } from "react";

export const useGoogleFonts = () => {
  const NX_GOOGLE_FONTS_API_KEY = "AIzaSyC_ulHC5c08LdfxEAAXnTV5hm-2YCwFY2g";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [fonts, setFonts] = useState();

  useEffect(() => {
    const fetchFonts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${NX_GOOGLE_FONTS_API_KEY}`
        );
        const { items } = await response.json();
        setFonts(items);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchFonts();
  }, []);

  return { fonts, loading, error };
};
