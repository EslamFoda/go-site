import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";
import {
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import GridBackground from "./gridBackground";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { FluidStyle, GridCard } from "@/types/sectionsTypes/fluid";
import { renderCardContent } from "./cardContent";
import ResizeHeight from "./resizeHeight";
import { useGridDimensions } from "@/hooks/useGridDimensions";
import HoverCardActions from "./hoverCardActions";
import { useGridOperations } from "@/hooks/useGridOperations";
import { useGridHeight } from "@/hooks/useGridHeight";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DraggableGridLayoutProps {
  section: any;
  pageId: string;
}

const DraggableGridLayout: React.FC<DraggableGridLayoutProps> = ({
  pageId,
  section,
}) => {
  const fluidSectionStyles = section.style as FluidStyle;
  const dispatch = useAppDispatch();
  const { dragItem, isDragging, selectedSection } = useAppSelector(
    (state) => state.editor.present
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const breakpoints = { lg: 1200, sm: 768, xs: 480 };
  const [isEditing, setIsEditing] = useState(false);
  const [cardType, setCardType] = useState("");
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

  const { updateGridHeight } = useGridHeight({
    pageId,
    sectionId: section.id,
    breakpoints: {
      lg: isLg,
      md: isMd,
      xs: isXs,
    },
    currentStyles: {
      minHeights: fluidSectionStyles.minHeights,
    },
  });

  const {
    currentBreakpoint,
    setCurrentBreakpoint,
    handleDelete,
    debouncedUpdateLayout,
    updateSectionContent,
  } = useGridOperations(pageId, section);

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

      debouncedUpdateLayout(updatedLayouts);
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

  const onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Update isDragging state
    const updatedLayouts = { ...section.content.gridLayout };
    updatedLayouts[currentBreakpoint] = updatedLayouts[currentBreakpoint].map(
      (item: Layout) => {
        if (item.i === newItem.i) {
          return { ...item, x: newItem.x, y: newItem.y };
        }
        return item;
      }
    );

    debouncedUpdateLayout(updatedLayouts);
    dispatch(updateIsDragging(false));
    updateGridHeight();
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    setCurrentBreakpoint(newBreakpoint);
  };

  const handleZIndexChange = (
    cardId: string,
    direction: "forward" | "backward"
  ) => {
    // Get all gridCards
    const gridCards = section.content.gridCards as GridCard[];

    // Find the current card and the maximum zIndex
    const currentCard = gridCards.find((card) => card.i === cardId);
    if (!currentCard) return; // Exit if card not found

    const currentZIndex = currentCard.zIndex || 5; // Default to 5
    const maxZIndex = Math.max(...gridCards.map((card) => card.zIndex || 5));
    const cardsAtMaxZIndex = gridCards.filter(
      (card) => (card.zIndex || 5) === maxZIndex
    ).length;

    // Calculate new zIndex based on direction
    let newZIndex = currentZIndex;
    if (direction === "forward") {
      // Only increment if the card is at the max zIndex and there are multiple cards at that level
      if (currentZIndex === maxZIndex && cardsAtMaxZIndex > 1) {
        newZIndex = maxZIndex + 1;
      } else if (currentZIndex < maxZIndex) {
        newZIndex = currentZIndex + 1; // Move forward up to maxZIndex
      }
      // If already at maxZIndex with only one card, no change
    } else if (direction === "backward") {
      newZIndex = Math.max(5, currentZIndex - 1); // Never go below 5
    }

    // Update gridCards with the new zIndex
    const updatedGridCards = gridCards.map((card) =>
      card.i === cardId ? { ...card, zIndex: newZIndex } : card
    );

    // Persist changes
    updateSectionContent(updatedGridCards, section.content.gridLayout);
  };

  const showGridPattern =
    section.content.gridCards.length === 0 ||
    (isDragging && selectedSection?.id === section.id) ||
    (isResizing && selectedSection?.id === section.id);

  const maxZIndex = Math.max(
    ...section.content.gridCards.map((card: GridCard) => card.zIndex || 5)
  );
  const cardsAtMaxZIndex = section.content.gridCards.filter(
    (card: GridCard) => (card.zIndex || 5) === maxZIndex
  ).length;

  return (
    <section className="container max-w-container">
      <div
        ref={containerRef}
        onClick={() => {
          dispatch(updateSelectedSection(pageId, section.id));
          dispatch(updateSelectedItem(null));
          setSelectedItemId(null);
        }}
      >
        <div
          id={`fluid-grid-container-${section.id}`}
          className="relative border border-primary border-dashed"
        >
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
            compactType={null}
            allowOverlap={true}
            preventCollision={false}
            isDroppable={!isEditing} // Disable dropping while editing
            isDraggable={!isEditing} // Disable dragging while editing
            isResizable={!isEditing} // Optionally disable resizing while editing
            onLayoutChange={handleLayoutChange}
            onBreakpointChange={onBreakpointChange}
            onDrop={handleOnDrop}
            onResize={onResize}
            onDragStart={() => {
              setSelectedItemId(null);
              updateGridHeight();
              dispatch(updateIsDragging(true));
            }}
            onDragStop={onDragStop}
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
            {section.content.gridCards.map((card: GridCard) => {
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  key={card.i}
                  className={`relative rounded-md overflow-hidden select-none ${
                    card.i === selectedItemId && "isActive"
                  }`}
                  style={{
                    zIndex: card.i === selectedItemId ? 100 : card.zIndex,
                  }}
                >
                  <HoverCard open={selectedItemId === card.i}>
                    <HoverCardActions
                      card={card}
                      onDelete={handleDelete}
                      onZIndexChange={handleZIndexChange}
                      maxZIndex={maxZIndex}
                      cardsAtMaxZIndex={cardsAtMaxZIndex}
                    />
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
              );
            })}
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
    </section>
  );
};

export default DraggableGridLayout;
