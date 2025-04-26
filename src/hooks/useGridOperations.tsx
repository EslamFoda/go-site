import { useCallback, useState } from "react";
import { Layout, Layouts } from "react-grid-layout";
import debounce from "lodash/debounce";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateContent } from "@/reduxStore/action";
import { GridCard } from "@/types/sectionsTypes/fluid";
import { v4 } from "uuid";

export const useGridOperations = (pageId: string, section: any) => {
  const dispatch = useAppDispatch();
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  const updateSectionContent = (
    newGridCards: GridCard[],
    newLayouts: Layouts
  ) => {
    dispatch(
      updateContent(pageId, section.id, {
        gridCards: newGridCards,
        gridLayout: newLayouts,
      })
    );
  };

  const handleDelete = useCallback(
    (id: string) => {
      const updatedGridCards = section.content.gridCards.filter(
        (card: GridCard) => card.i !== id
      );
      const updatedLayouts = {
        ...section.content.gridLayout,
        [currentBreakpoint]: section.content.gridLayout[
          currentBreakpoint
        ].filter((item: Layout) => item.i !== id),
      };

      updateSectionContent(updatedGridCards, updatedLayouts);
    },
    [currentBreakpoint, section.content.gridCards, section.content.gridLayout]
  );

  const handleDuplicate = useCallback(
    (cardId: string) => {
      const gridCards = section.content.gridCards as GridCard[];
      const cardToDuplicate = gridCards.find((card) => card.i === cardId);
      if (!cardToDuplicate) return;

      // Create a new card with a unique ID
      const newCard: GridCard = {
        ...cardToDuplicate,
        i: v4(), // Generate a new unique ID
        zIndex: cardToDuplicate.zIndex || 5, // Maintain same zIndex
      };

      // Update layouts for all breakpoints
      const updatedLayouts = { ...section.content.gridLayout };
      const breakpoints = ["lg", "sm", "xs"]; // Define all breakpoints

      breakpoints.forEach((breakpoint) => {
        const originalLayout = section.content.gridLayout[breakpoint].find(
          (layout: Layout) => layout.i === cardId
        );

        if (originalLayout) {
          updatedLayouts[breakpoint] = [
            ...section.content.gridLayout[breakpoint],
            {
              ...originalLayout,
              i: newCard.i,
              x: originalLayout.x + 1, // Offset x by 1
              y: originalLayout.y + 1, // Offset y by 1
              w: originalLayout.w,
              h: originalLayout.h,
              static: false,
            },
          ];
        }
      });

      // Update section content with new card and layouts
      const updatedGridCards = [...gridCards, newCard];
      updateSectionContent(updatedGridCards, updatedLayouts);
    },
    [section.content.gridCards, section.content.gridLayout]
  );

  const debouncedUpdateLayout = useCallback(
    debounce((updatedLayouts: Layouts) => {
      updateSectionContent(section.content.gridCards, updatedLayouts);
    }, 100),
    [section.content.gridCards]
  );

  return {
    currentBreakpoint,
    setCurrentBreakpoint,
    handleDelete,
    handleDuplicate,
    debouncedUpdateLayout,
    updateSectionContent,
  };
};