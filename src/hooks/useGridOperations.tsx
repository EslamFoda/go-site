// hooks/useGridOperations.ts
import { useCallback, useState } from "react";
import { Layout, Layouts } from "react-grid-layout";
import debounce from "lodash/debounce";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateContent } from "@/reduxStore/action";
import { GridCard } from "@/types/sectionsTypes/fluid";

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

  const debouncedUpdateLayout = useCallback(
    debounce((newItem: Layout, updatedLayouts: Layouts) => {
      updateSectionContent(section.content.gridCards, updatedLayouts);
    }, 100),
    [section.content.gridCards]
  );

  return {
    currentBreakpoint,
    setCurrentBreakpoint,
    handleDelete,
    debouncedUpdateLayout,
    updateSectionContent,
  };
};
