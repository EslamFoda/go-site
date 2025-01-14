import React, { useCallback, useRef, useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  updateIsDraggableModal,
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
  updateContent,
  setFluidCard,
  setDraggableModalName,
  updateStyle,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import GridBackground from "./gridBackground";
import "./styles.css";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Trash, LayoutIcon, MoveVertical } from "lucide-react";
import { FluidStyle, GridCard } from "@/types/sectionsTypes/fluid";
import debounce from "lodash/debounce";
import { renderCardContent } from "./cardContent";
import { useMediaQuery } from "react-responsive";
import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

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
  const { dragItem, isDragging } = useAppSelector((state) => state.editor);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const breakpoints = { lg: 1200, sm: 768, xs: 480 };
  const cols = { lg: 45, sm: 20, xs: 15 };
  const rowHeight = 40;
  const padding: [number, number] = [10, 10];
  const [isEditing, setIsEditing] = useState(false);
  const [cardType, setCardType] = useState("");

  const [minHeight, setMinHeight] = useState({
    lg: fluidSectionStyles.minHeights.lg,
    md: fluidSectionStyles.minHeights.md,
    xs: fluidSectionStyles.minHeights.xs,
  }); // Initial minHeight
  const isDraggingRef = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const isDesktop = useMediaQuery({ query: "(min-width: 1640px)" });
  const isMd = useMediaQuery({
    query: "(min-width: 1208px) and (max-width: 1639px)",
  });
  const isXs = useMediaQuery({ query: "(max-width: 1207px)" });
  const sectionRef = useRef(null);

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

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    const updatedLayouts = Object.keys(allLayouts).reduce((acc, key) => {
      acc[key] = allLayouts[key].map((layoutItem) => ({ ...layoutItem }));
      return acc;
    }, {} as Layouts);

    updateSectionContent(section.content.gridCards, updatedLayouts);
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
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    setCurrentBreakpoint(newBreakpoint);
  };

  const showGridPattern =
    section.content.gridCards.length === 0 || isDragging || isResizing;

  // Create debounced update function
  const debouncedUpdateStyle = useCallback(
    debounce((newHeight: number) => {
      dispatch(
        updateStyle(pageId, section.id, {
          minHeights: {
            ...fluidSectionStyles.minHeights,
            ...(isDesktop
              ? { lg: newHeight }
              : isMd
              ? { md: newHeight }
              : { xs: newHeight }),
          },
        })
      );
    }, 3000),
    [
      dispatch,
      isDesktop,
      isMd,
      pageId,
      section.id,
      fluidSectionStyles.minHeights,
    ]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startY.current = e.clientY;
    isDraggingRef.current = true;

    // Set initial height based on current breakpoint
    if (isDesktop) startHeight.current = minHeight.lg;
    if (isMd) startHeight.current = minHeight.md;
    if (isXs) startHeight.current = minHeight.xs;

    dispatch(updateIsDragging(true));

    // Add the listeners to window to track mouse movement anywhere
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Add a class to the body to prevent text selection while dragging
    document.body.classList.add("resize-dragging");
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const newHeight = Math.max(
        200,
        startHeight.current + (e.clientY - startY.current)
      );

      if (isDesktop) {
        setMinHeight((prev) => ({ ...prev, lg: newHeight }));
      } else if (isMd) {
        setMinHeight((prev) => ({ ...prev, md: newHeight }));
      } else if (isXs) {
        setMinHeight((prev) => ({ ...prev, xs: newHeight }));
      }

      debouncedUpdateStyle(newHeight);
    },
    [isDesktop, isMd, isXs, debouncedUpdateStyle]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    dispatch(updateIsDragging(false));

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    // Remove the body class
    document.body.classList.remove("resize-dragging");
  }, [dispatch, handleMouseMove]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (isDraggingRef.current) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        document.body.classList.remove("resize-dragging");
        isDraggingRef.current = false;
        dispatch(updateIsDragging(false));
      }
      // Cancel any pending debounced updates
      debouncedUpdateStyle.cancel();
    };
  }, [dispatch, handleMouseMove, handleMouseUp, debouncedUpdateStyle]);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        setSelectedItemId(null);
      }}
    >
      <div ref={sectionRef} className="relative border-2 border-dashed">
        {showGridPattern && (
          <GridBackground
            containerWidth={containerWidth}
            cols={cols[currentBreakpoint as keyof typeof cols]}
            rowHeight={rowHeight}
            padding={padding}
          />
        )}
        <ResponsiveGridLayout
          layouts={section.content.gridLayout}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeight}
          containerPadding={[0, 0]}
          margin={padding}
          style={{
            minHeight: isDesktop
              ? minHeight.lg
              : isMd
              ? minHeight.md
              : isXs
              ? minHeight.xs
              : 100,
            background: "transparent",
          }}
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
          onResizeStop={() => setIsResizing(false)}
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
                <HoverCardContent
                  onMouseDown={(e) => e.stopPropagation()}
                  sideOffset={10}
                  side={card.type === "text" ? "right" : "top"}
                  className="flex items-center justify-center gap-3 bg-transparent shadow-none border-none"
                >
                  {card.type !== "text" && (
                    <div
                      onClick={() => {
                        dispatch(updateIsDraggableModal(true));
                        dispatch(setDraggableModalName("SETTINGS"));
                        dispatch(setFluidCard(card));
                      }}
                      className="h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
                    >
                      <span>
                        {card.type === "button" ? "Edit" : "Change"} {card.type}
                      </span>
                    </div>
                  )}
                  {card.type === "image" && card.settings.originalSrc && (
                    <div
                      onClick={() => {
                        dispatch(updateIsDraggableModal(true));
                        dispatch(setDraggableModalName("LAYOUT"));
                        dispatch(setFluidCard(card));
                      }}
                      className="h-8 px-4 min-w-fit flex items-center shadow-md justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
                    >
                      <span>Edit image</span>
                    </div>
                  )}
                  {card.type === "button" && (
                    <div
                      onClick={() => {
                        dispatch(updateIsDraggableModal(true));
                        dispatch(setDraggableModalName("LAYOUT"));
                        dispatch(setFluidCard(card));
                      }}
                      className="h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer"
                    >
                      <LayoutIcon
                        size={16}
                        className="stroke-primary-foreground"
                      />
                    </div>
                  )}
                  <div
                    onClick={() => handleDelete(card.i)}
                    className="h-8 w-8 rounded-full flex items-center shadow-md justify-center bg-primary hover:bg-primary/80 transition-colors cursor-pointer"
                  >
                    <Trash size={16} className="stroke-primary-foreground" />
                  </div>
                </HoverCardContent>
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                className="absolute -bottom-7 border border-primary-foreground shadow-sm rounded-sm 
            bg-primary px-3 py-1 right-3/4 transform -translate-x-1/2 -translate-y-1/2 
            cursor-s-resize select-none "
              >
                <MoveVertical size={18} className="text-primary-foreground" />
              </div>
            </TooltipTrigger>

            <TooltipContent sideOffset={8}>
              <TooltipArrow />
              <span>Adjust section height</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DraggableGridLayout;
