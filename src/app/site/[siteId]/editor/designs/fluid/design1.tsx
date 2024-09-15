import React, { useState, useCallback, useRef, useEffect } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { times } from "lodash";
import { styled } from "@stitches/react";
import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface CardData {
  i: string;
  content: string;
  w: number;
  h: number;
  type: "button" | "heading" | "image";
}

const initialCards: CardData[] = [
  {
    i: "blue-eyes-dragon",
    content: "Blue Eyes Dragon",
    w: 5,
    h: 1,
    type: "button",
  },
  { i: "dark-magician", content: "Dark Magician", w: 2, h: 1, type: "heading" },
  { i: "kuriboh", content: "Kuriboh", w: 1, h: 1, type: "button" },
  { i: "spell-caster", content: "Spell Caster", w: 11, h: 6, type: "image" },
  {
    i: "summoned-skull",
    content: "Summoned Skull",
    w: 3,
    h: 2,
    type: "button",
  },
];
const initialLayout: Layout[] = [];

const getLayouts = (): Layouts => {
  const savedLayouts = localStorage.getItem("grid-layout");
  return savedLayouts ? JSON.parse(savedLayouts) : { lg: initialLayout };
};

const BackgroundWrap = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
});

interface GridBackgroundProps {
  containerWidth: number;
  cols: number;
  rowHeight: number;
  padding: [number, number];
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  containerWidth,
  cols,
  rowHeight,
  padding,
}) => {
  const PATTERN_NAME = "grid_layout_pattern";

  const renderPattern = useCallback(() => {
    const [horizontalPadding, verticalPadding] = padding;
    const paddingWidth = verticalPadding * (cols - 1);
    const columnWidth = (containerWidth - paddingWidth) / cols;
    return (
      <pattern
        id={PATTERN_NAME}
        patternUnits="userSpaceOnUse"
        width="100%"
        height={rowHeight + horizontalPadding}
      >
        {times(cols).map((_, index) => (
          <rect
            className="stroke-muted-foreground fill-muted"
            strokeWidth={1}
            key={index}
            x={(columnWidth + verticalPadding) * index}
            y={0}
            width={columnWidth}
            height={rowHeight}
          />
        ))}
      </pattern>
    );
  }, [containerWidth, cols, padding, rowHeight]);

  return (
    <BackgroundWrap>
      <svg width="100%" height="100%">
        <defs>{renderPattern()}</defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_NAME})`}
        />
      </svg>
    </BackgroundWrap>
  );
};

const DraggableGridLayout: React.FC = () => {
  const [layouts, setLayouts] = useState<Layouts>(getLayouts());
  const [gridCards, setGridCards] = useState<CardData[]>([]);
  const [dragItem, setDragItem] = useState<CardData | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 45, md: 40, sm: 35, xs: 30, xxs: 25 };
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
    switch (card.type) {
      case "button":
        return <Button className="w-full h-full">{card.content}</Button>;
      case "heading":
        return (
          <h1 className="text-2xl font-bold text-gray-800">{card.content}</h1>
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
  };

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    localStorage.setItem("grid-layout", JSON.stringify(allLayouts));
    setLayouts(allLayouts);
  };

  const onDragStart = useCallback((e: React.DragEvent, item: CardData) => {
    setDragItem(item);
    setIsDragging(true);
  }, []);

  const onDragStop = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const onResizeStop = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setGridCards((prevCards) => prevCards.filter((card) => card.i !== id));
      setLayouts((prevLayouts) => ({
        ...prevLayouts,
        [currentBreakpoint]: prevLayouts[currentBreakpoint].filter(
          (item) => item.i !== id
        ),
      }));
    },
    [currentBreakpoint]
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
      setGridCards((prevCards) => [...prevCards, newCard]);

      const newLayout: Layout = {
        i: newCard.i,
        x: layoutItem.x,
        y: layoutItem.y,
        w: newCard.w || 1,
        h: newCard.h || 1,
      };

      setLayouts((prevLayouts) => ({
        ...prevLayouts,
        [currentBreakpoint]: [
          ...(prevLayouts[currentBreakpoint] || []),
          newLayout,
        ],
      }));
    }
    setDragItem(null);
    setIsDragging(false);
  };

  const onBreakpointChange = (newBreakpoint: string) => {
    setCurrentBreakpoint(newBreakpoint);
  };

  const showGridPattern = gridCards.length === 0 || isDragging || isResizing;

  return (
    <div ref={containerRef}>
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Drag these items to the grid:
        </h3>
        <div className="flex space-x-4">
          {initialCards.map((card) => (
            <div
              key={card.i}
              draggable
              onDragStart={(e) => onDragStart(e, card)}
              className={`p-4 border rounded-md cursor-move ${
                card.type === "button"
                  ? "bg-blue-100 border-blue-300 hover:bg-blue-200"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {card.content} ({card.type})
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[400px] border-2 border-dashed border-gray-400">
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
          allowOverlap
          onDrop={handleOnDrop}
          onDragStart={() => setIsDragging(true)}
          onDragStop={onDragStop}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
        >
          {gridCards.map((card) => (
            <div
              key={card.i}
              className="relative border rounded-md shadow-md bg-background overflow-hidden"
            >
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleDelete(card.i)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 z-10"
              >
                ×
              </button>
              <div className="w-full h-full flex items-center justify-center">
                {renderCardContent(card)}
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DraggableGridLayout;
