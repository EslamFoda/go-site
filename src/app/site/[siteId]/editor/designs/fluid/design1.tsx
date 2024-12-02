import React, { useState, useCallback, useRef, useEffect } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { CardData } from "@/types/common";
import {
  updateIsDraggableModal,
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
  updateContent,
  setFluidCard,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import GridBackground from "./gridBackground";
import "./styles.css";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Trash } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DraggableGridLayoutProps {
  section: any;
  pageId: string;
}

const DraggableGridLayout: React.FC<DraggableGridLayoutProps> = ({
  pageId,
  section,
}) => {
  const dispatch = useAppDispatch();
  const { dragItem, isDragging } = useAppSelector((state) => state.editor);

  const [layouts, setLayouts] = useState<Layouts>(section.content.gridLayout);
  const [gridCards, setGridCards] = useState<CardData[]>(
    section.content.gridCards
  );
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const breakpoints = { lg: 1200, sm: 768, xs: 480 };
  const cols = { lg: 45, sm: 20, xs: 15 };
  const rowHeight = 40;
  const padding: [number, number] = [10, 10];

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

  const renderCardContent = (card: CardData) => {
    const isSelected = card.i === selectedItemId;
    return (
      <div
        className={`relative w-full h-full ${
          isSelected && "outline outline-1 cursor-move"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItemId(card.i);
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {(() => {
            switch (card.type) {
              case "button":
                return (
                  <Button className="w-full h-full">{card.content}</Button>
                );
              case "image":
                return (
                  <div className="w-full h-full bg-muted flex justify-center items-center rounded-md">
                    <ImagePlaceHolder fillColor={"fill-background"} />
                  </div>
                );
              default:
                return <div>{card.content}</div>;
            }
          })()}
        </div>
      </div>
    );
  };

  const updateSectionContent = (
    newGridCards: CardData[],
    newLayouts: Layouts
  ) => {
    dispatch(
      updateContent(pageId, section.id, {
        gridCards: newGridCards,
        gridLayout: newLayouts,
      })
    );
  };

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    // Create new layout copies to avoid mutation
    const updatedLayouts = Object.keys(allLayouts).reduce((acc, key) => {
      acc[key] = allLayouts[key].map((layoutItem) => ({ ...layoutItem }));
      return acc;
    }, {} as Layouts);

    setLayouts(updatedLayouts);
    updateSectionContent(gridCards, updatedLayouts);
  };

  const onDragStop = useCallback(
    (layout: Layout[], oldItem: Layout, newItem: Layout) => {
      setSelectedItemId(newItem.i); // Set the dragged item as the selected item
      dispatch(updateIsDragging(false));
    },
    [dispatch]
  );

  const onResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const onResizeStop = useCallback(
    (layout: Layout[], oldItem: Layout, newItem: Layout) => {
      setSelectedItemId(newItem.i); // Ensure the resized item becomes selected
      setIsResizing(false);
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updatedGridCards = gridCards.filter((card) => card.i !== id);
      const updatedLayouts = {
        ...layouts,
        [currentBreakpoint]: layouts[currentBreakpoint].filter(
          (item) => item.i !== id
        ),
      };

      setGridCards(updatedGridCards);
      setLayouts(updatedLayouts);
      updateSectionContent(updatedGridCards, updatedLayouts);
    },
    [gridCards, layouts, currentBreakpoint]
  );

  const handleOnDrop = (
    layout: Layout[],
    layoutItem: Layout,
    _event: DragEvent
  ) => {
    if (dragItem) {
      const newCard: CardData = {
        ...dragItem,
        i: `${dragItem.i}-${Date.now()}`,
      };

      const newLayout: Layout = {
        i: newCard.i,
        x: layoutItem.x,
        y: layoutItem.y,
        w: newCard.w || 1,
        h: newCard.h || 1,
        static: false, // Ensure it's not static
      };

      const newGridCards = [...gridCards, newCard];

      const updatedLayouts = Object.keys(breakpoints).reduce(
        (acc, breakpoint) => {
          acc[breakpoint] = [
            ...(layouts[breakpoint] || []),
            { ...newLayout }, // Spread to create a new object
          ];
          return acc;
        },
        {} as Layouts
      );

      setGridCards(newGridCards);
      setLayouts(updatedLayouts);
      updateSectionContent(newGridCards, updatedLayouts);
      setSelectedItemId(newCard.i);
    }

    dispatch(updateIsDraggingItem(null));
    dispatch(updateIsDragging(false));
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    setCurrentBreakpoint(newBreakpoint);
  };

  const showGridPattern = gridCards.length === 0 || isDragging || isResizing;

  return (
    <div
      ref={containerRef}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        setSelectedItemId(null);
      }}
    >
      <div className="relative min-h-[400px] border-2 border-dashed">
        {showGridPattern && (
          <GridBackground
            containerWidth={containerWidth}
            cols={cols[currentBreakpoint as keyof typeof cols]}
            rowHeight={rowHeight}
            padding={padding}
          />
        )}
        <ResponsiveGridLayout
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeight}
          containerPadding={[0, 0]}
          margin={padding}
          style={{ minHeight: 500, background: "transparent" }}
          preventCollision
          compactType={null}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={onBreakpointChange}
          isDroppable={true}
          onDrop={handleOnDrop}
          onDragStart={() => {
            setSelectedItemId(null);
            dispatch(updateIsDragging(true));
          }}
          onDragStop={onDragStop}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          resizeHandles={["sw", "nw", "se", "ne"]}
        >
          {gridCards.map((card) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              key={card.i}
              className={`relative rounded-md overflow-hidden ${
                card.i === selectedItemId && "isActive"
              }`}
            >
              <HoverCard open={selectedItemId === card.i}>
                <HoverCardContent
                  onMouseDown={(e) => e.stopPropagation()}
                  sideOffset={20}
                  side="top"
                  className="flex items-center justify-center gap-3 bg-transparent shadow-none border-none"
                >
                  <div
                    onClick={() => {
                      dispatch(updateIsDraggableModal(true));
                      dispatch(setFluidCard(card));
                    }}
                    className="h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
                  >
                    <span>Edit {card.type}</span>
                  </div>
                  <div
                    onClick={() => handleDelete(card.i)}
                    className="h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer"
                  >
                    <Trash size={16} className="stroke-primary-foreground" />
                  </div>
                </HoverCardContent>
                <HoverCardTrigger>{renderCardContent(card)}</HoverCardTrigger>
              </HoverCard>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DraggableGridLayout;
