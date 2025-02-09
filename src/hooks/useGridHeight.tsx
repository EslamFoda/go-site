import { useCallback } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";

interface UseGridHeightParams {
  pageId: string;
  sectionId: string;
  breakpoints?: {
    lg: boolean;
    md: boolean;
    xs: boolean;
  };
  currentStyles?: {
    minHeights: {
      lg: number;
      md: number;
      xs: number;
    };
  };
}

export const useGridHeight = ({
  pageId,
  sectionId,
  breakpoints = { lg: false, md: false, xs: false },
  currentStyles,
}: UseGridHeightParams) => {
  const dispatch = useAppDispatch();

  const updateGridHeight = useCallback(() => {
    setTimeout(() => {
      const gridContainer = document.getElementById(
        `fluid-grid-container-${sectionId}`
      );
      if (!gridContainer) return;

      const containerHeight = gridContainer.clientHeight;
      let updateBreakpoint: keyof typeof breakpoints | undefined;

      if (breakpoints.lg) updateBreakpoint = "lg";
      else if (breakpoints.md) updateBreakpoint = "md";
      else if (breakpoints.xs) updateBreakpoint = "xs";

      if (updateBreakpoint && currentStyles?.minHeights) {
        dispatch(
          updateStyle(pageId, sectionId, {
            minHeights: {
              ...currentStyles.minHeights,
              [updateBreakpoint]: containerHeight,
            },
          })
        );
      }
    }, 0);
  }, [pageId, sectionId, breakpoints, currentStyles, dispatch]);

  return { updateGridHeight };
};
