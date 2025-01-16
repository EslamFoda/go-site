import React, { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
  updateStyle,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import GridBackground from "./gridBackground";
import "./styles.css";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { FluidStyle, GridCard } from "@/types/sectionsTypes/fluid";
import { renderCardContent } from "./cardContent";
import ResizeHeight from "./resizeHeight";
import { useGridDimensions } from "@/hooks/useGridDimensions";
import HoverCardActions from "./hoverCardActions";
import { useGridOperations } from "@/hooks/useGridOperations";
import { GridSettingsPanel } from "./GridSettingsPanel";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DraggableGridLayoutProps {
  section: any;
  pageId: string;
}
interface GridSettings {
  cols: { lg: number; sm: number; xs: number };
  rowHeight: number;
  padding: [number, number];
}
const DraggableGridLayout: React.FC<DraggableGridLayoutProps> = ({
  pageId,
  section,
}) => {
  const fluidSectionStyles = section.style as FluidStyle;
  const dispatch = useAppDispatch();
  const { dragItem, isDragging } = useAppSelector((state) => state.editor);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const breakpoints = { lg: 1200, sm: 768, xs: 480 };
  const [isEditing, setIsEditing] = useState(false);
  const [cardType, setCardType] = useState("");
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const { gridSettings } = fluidSectionStyles;

  const {
    containerRef,
    containerWidth,
    minHeight,
    setMinHeight,
    isLg,
    isMd,
    isXs,
  } = useGridDimensions(section.style);

  const {
    currentBreakpoint,
    setCurrentBreakpoint,
    handleDelete,
    debouncedUpdateLayout,
    updateSectionContent,
  } = useGridOperations(pageId, section);
  const handleSettingsChange = (newSettings: GridSettings) => {
    dispatch(
      updateStyle(pageId, section.id, {
        gridSettings: newSettings,
      })
    );

    // Update layouts to maintain relative positions with new column counts
    const updatedLayouts = Object.keys(section.content.gridLayout).reduce(
      (acc, breakpoint) => {
        const oldCols =
          gridSettings.cols[breakpoint as keyof typeof gridSettings.cols];
        const newCols =
          newSettings.cols[breakpoint as keyof typeof newSettings.cols];
        const ratio = newCols / oldCols;

        acc[breakpoint] = section.content.gridLayout[breakpoint].map(
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

    updateSectionContent(section.content.gridCards, updatedLayouts);
    updateGridHeight();
  };

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    const updatedLayouts = Object.keys(allLayouts).reduce((acc, key) => {
      acc[key] = allLayouts[key].map((layoutItem) => ({ ...layoutItem }));
      return acc;
    }, {} as Layouts);

    updateSectionContent(section.content.gridCards, updatedLayouts);
  };

  const onResize = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    placeholder: Layout,
    event: MouseEvent,
    element: HTMLElement
  ) => {
    const selectedCard = section.content.gridCards.find(
      (card: GridCard) => card.i === selectedItemId
    );

    if (selectedCard && selectedCard.type === "text") {
      const updatedLayouts = { ...section.content.gridLayout };

      if (currentBreakpoint === "lg") {
        Object.keys(breakpoints).forEach((breakpoint) => {
          updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map(
            (item: Layout) => {
              if (item.i === newItem.i) {
                return { ...item, w: newItem.w, h: newItem.h };
              }
              return item;
            }
          );
        });
      } else {
        updatedLayouts[currentBreakpoint] = updatedLayouts[
          currentBreakpoint
        ].map((item: Layout) => {
          if (item.i === newItem.i) {
            return { ...item, w: newItem.w, h: newItem.h };
          }
          return item;
        });
      }

      debouncedUpdateLayout(newItem, updatedLayouts);
    }
  };

  useEffect(() => {
    return () => {
      debouncedUpdateLayout.cancel();
    };
  }, [debouncedUpdateLayout]);

  const handleOnDrop = (
    layout: Layout[],
    layoutItem: Layout,
    _event: DragEvent
  ) => {
    if (dragItem) {
      const newCard: GridCard = {
        ...dragItem,
        i: `${dragItem.i}-${Date.now()}`,
      };

      const newLayout: Layout = {
        i: newCard.i,
        x: layoutItem.x,
        y: layoutItem.y,
        w: newCard.w || 3,
        h: newCard.h || 3,
        static: false,
      };

      const newGridCards = [...section.content.gridCards, newCard];

      const updatedLayouts = Object.keys(breakpoints).reduce(
        (acc, breakpoint) => {
          acc[breakpoint] = [
            ...(section.content.gridLayout[breakpoint] || []),
            { ...newLayout },
          ];
          return acc;
        },
        {} as Layouts
      );

      updateSectionContent(newGridCards, updatedLayouts);
      setSelectedItemId(newCard.i);
    }

    dispatch(updateIsDraggingItem(null));
    dispatch(updateIsDragging(false));

    updateGridHeight();
  };

  const updateGridHeight = () => {
    setTimeout(() => {
      if (!gridContainerRef.current) return;

      const containerHeight = gridContainerRef.current.clientHeight;
      let updateBreakpoint;

      if (isLg) updateBreakpoint = "lg";
      else if (isMd) updateBreakpoint = "md";
      else if (isXs) updateBreakpoint = "xs";

      if (updateBreakpoint) {
        dispatch(
          updateStyle(pageId, section.id, {
            minHeights: {
              ...fluidSectionStyles.minHeights,
              [updateBreakpoint]: containerHeight,
            },
          })
        );
      }
    }, 500);
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    setCurrentBreakpoint(newBreakpoint);
    updateGridHeight();
  };

  const showGridPattern =
    section.content.gridCards.length === 0 || isDragging || isResizing;

  return (
    <div
      ref={containerRef}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        setSelectedItemId(null);
      }}
    >
      <GridSettingsPanel
        settings={gridSettings}
        onSettingsChange={handleSettingsChange}
      />
      <div ref={gridContainerRef} className="relative border-2 border-dashed">
        {showGridPattern && (
          <GridBackground
            containerWidth={containerWidth}
            cols={
              gridSettings.cols[
                currentBreakpoint as keyof typeof gridSettings.cols
              ]
            }
            rowHeight={gridSettings.rowHeight}
            padding={gridSettings.padding}
            sectionId={section.id}
          />
        )}
        <ResponsiveGridLayout
          layouts={section.content.gridLayout}
          breakpoints={breakpoints}
          cols={gridSettings.cols}
          rowHeight={gridSettings.rowHeight}
          margin={gridSettings.padding}
          isBounded
          style={{
            minHeight: isLg
              ? minHeight.lg || fluidSectionStyles.minHeights.lg
              : isMd
              ? minHeight.md || fluidSectionStyles.minHeights.md
              : minHeight.xs || fluidSectionStyles.minHeights.xs,
            background: "transparent",
          }}
          containerPadding={[0, 0]}
          preventCollision
          compactType={null}
          isDroppable={!isEditing} // Disable dropping while editing
          isDraggable={!isEditing} // Disable dragging while editing
          isResizable={!isEditing} // Optionally disable resizing while editing
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={onBreakpointChange}
          onDrop={handleOnDrop}
          onResize={onResize}
          onDragStart={() => {
            setSelectedItemId(null);
            dispatch(updateIsDragging(true));
          }}
          onDragStop={() => dispatch(updateIsDragging(false))}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => {
            setIsResizing(false);
            updateGridHeight();
          }}
          resizeHandles={
            cardType === "text"
              ? ["e", "w", "s"]
              : ["sw", "nw", "se", "ne", "e", "w", "s", "n"]
          }
        >
          {section.content.gridCards.map((card: GridCard) => (
            <div
              onClick={(e) => e.stopPropagation()}
              key={card.i}
              className={`relative rounded-md overflow-hidden ${
                card.i === selectedItemId && "isActive"
              }`}
            >
              <HoverCard open={selectedItemId === card.i}>
                <HoverCardActions card={card} onDelete={handleDelete} />
                <HoverCardTrigger>
                  {renderCardContent({
                    card,
                    pageId,
                    dispatch,
                    isEditing,
                    section,
                    selectedItemId,
                    setSelectedItemId,
                    setCardType,
                    setIsEditing,
                    updateSectionContent,
                  })}
                </HoverCardTrigger>
              </HoverCard>
            </div>
          ))}
        </ResponsiveGridLayout>
        <ResizeHeight
          fluidSectionStyles={fluidSectionStyles}
          isLg={isLg}
          isMd={isMd}
          isXs={isXs}
          pageId={pageId}
          section={section}
          minHeight={minHeight}
          setMinHeight={setMinHeight}
        />
      </div>
    </div>
  );
};

export default DraggableGridLayout;
