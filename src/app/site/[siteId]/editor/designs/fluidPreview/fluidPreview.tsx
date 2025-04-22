import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { FluidStyle, GridCard } from "@/types/sectionsTypes/fluid";
import { renderCardContent } from "./cardContent";
import { useMediaQuery } from "react-responsive";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface FluidPreviewProps {
  section: any;
  pageId: string;
}

const FluidPreview: React.FC<FluidPreviewProps> = ({ section }) => {
  const fluidSectionStyles = section.style as FluidStyle;
  const breakpoints = { lg: 1024, sm: 768, xs: 480 };
  const { gridSettings } = fluidSectionStyles;
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <div id={`fluid-grid-container-${section.id}`}>
      <ResponsiveGridLayout
        className="container max-w-container"
        layouts={section.content.gridLayout}
        breakpoints={breakpoints}
        cols={gridSettings.cols}
        rowHeight={gridSettings.rowHeight}
        margin={gridSettings.padding}
        isBounded
        style={{
          minHeight: isLg
            ? fluidSectionStyles.minHeights.lg
            : isMd
            ? fluidSectionStyles.minHeights.md
            : fluidSectionStyles.minHeights.xs,
          background: "transparent",
        }}
        containerPadding={[0, 0]}
        compactType={null}
        allowOverlap={true}
        preventCollision={false}
        isDroppable={false} // Disable dropping while editing
        isDraggable={false} // Disable dragging while editing
        isResizable={false} // Optionally disable resizing while editing
      >
        {section.content.gridCards.map((card: GridCard) => (
          <div key={card.i} className="relative rounded-md overflow-hidden">
            {renderCardContent({
              card,
            })}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default FluidPreview;
