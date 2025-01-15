import { FluidStyle } from "@/types/sectionsTypes/fluid";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export const useGridDimensions = (fluidSectionStyles: FluidStyle) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState({
    lg: fluidSectionStyles.minHeights.lg,
    md: fluidSectionStyles.minHeights.md,
    xs: fluidSectionStyles.minHeights.xs,
  });

  const isLg = useMediaQuery({ query: "(min-width: 1640px)" });
  const isMd = useMediaQuery({
    query: "(min-width: 1208px) and (max-width: 1639px)",
  });
  const isXs = useMediaQuery({ query: "(max-width: 1207px)" });

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return {
    containerRef,
    containerWidth,
    minHeight,
    setMinHeight,
    isLg,
    isMd,
    isXs,
  };
};
