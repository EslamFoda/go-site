import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { updateStyle } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Layouts } from "react-grid-layout";
import { useGridOperations } from "@/hooks/useGridOperations";
import { useGridHeight } from "@/hooks/useGridHeight";
import { useGridDimensions } from "@/hooks/useGridDimensions";
import GridSettingsPanel from "./gridSettingsPanel";

interface GridSettings {
  cols: { lg: number; sm: number; xs: number };
  rowHeight: number;
  padding: [number, number];
}
interface FluidSettingsTabProps {
  section: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;
  pageId: string;
}
function FluidSettingsTab({ section, pageId }: FluidSettingsTabProps) {
  const dispatch = useAppDispatch();
  const fluidStyle = section?.style as SectionStyleTypes["fluid"];
  const fluidContent = section?.content as SectionContentTypes["fluid"];
  const { updateSectionContent } = useGridOperations(pageId, section);
  const { isLg, isMd, isXs } = useGridDimensions(fluidStyle);

  const { updateGridHeight } = useGridHeight({
    pageId,
    sectionId: section.id,
    breakpoints: {
      lg: isLg,
      md: isMd,
      xs: isXs,
    },
    currentStyles: {
      minHeights: fluidStyle.minHeights,
    },
  });

  const { gridSettings } = fluidStyle;
  const handleSettingsChange = (newSettings: GridSettings) => {
    dispatch(
      updateStyle(pageId, section.id, {
        gridSettings: newSettings,
      })
    );

    // Update layouts to maintain relative positions with new column counts
    const updatedLayouts = Object.keys(fluidContent.gridLayout).reduce(
      (acc, breakpoint) => {
        const oldCols =
          gridSettings.cols[breakpoint as keyof typeof gridSettings.cols];
        const newCols =
          newSettings.cols[breakpoint as keyof typeof newSettings.cols];
        const ratio = newCols / oldCols;

        acc[breakpoint] = fluidContent.gridLayout[breakpoint].map(
          (item: any) => ({
            ...item,
            x: Math.round(item.x * ratio),
            w: Math.round(item.w * ratio),
          })
        );
        return acc;
      },
      {} as Layouts
    );

    updateSectionContent(fluidContent.gridCards, updatedLayouts);
    updateGridHeight();
  };

  return (
    <TabsContent className="space-y-2 px-5" value="settings">
      <GridSettingsPanel
        settings={gridSettings}
        onSettingsChange={handleSettingsChange}
      />
    </TabsContent>
  );
}

export default FluidSettingsTab;
