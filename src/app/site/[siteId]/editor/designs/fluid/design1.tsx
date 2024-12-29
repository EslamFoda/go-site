import React, { useCallback, useRef, useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import {
  updateIsDraggableModal,
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
  updateContent,
  setFluidCard,
  setDraggableModalName,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import GridBackground from "./gridBackground";
import "./styles.css";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Trash, LayoutIcon } from "lucide-react";
import { FluidTextSettings, GridCard } from "@/types/sectionsTypes/fluid";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import Image from "next/image";
import TextComp from "./textComp";
import { cn } from "@/lib/utils";

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

  const handleTextEditorFocus = () => setIsEditing(true);
  const handleTextEditorBlur = () => setIsEditing(false);

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

  const renderCardContent = (card: GridCard) => {
    const isSelected = card.i === selectedItemId;
    const handleTextChange = (key: keyof FluidTextSettings, value: any) => {
      const updatedGridCards = section.content.gridCards.map((c: GridCard) => {
        if (c.i === card.i) {
          return {
            ...c,
            settings: {
              ...c.settings,
              [key]: value,
            },
          };
        }
        return c;
      });

      updateSectionContent(updatedGridCards, section.content.gridLayout);
    };

    const cardClassNames = cn('relative w-full h-full',{
      'outline outline-1 cursor-move':isSelected,
      'cursor-default':isEditing
    })

    return (
      <div
        className={cardClassNames}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItemId(card.i);
          dispatch(updateSelectedSection(pageId, section.id));
        }}
      >
        <div className="w-full h-full">
          {(() => {
            switch (card.type) {
              case "button":
                const ButtonIcon = getPhosphorIcon(card.settings.buttonIcon);
                const isIconOnly = card.settings.buttonDisplay === "Icon only";
                const isTextAndIcon =
                  card.settings.buttonDisplay === "Text and icon" ||
                  card.settings.buttonDisplay === "Icon only";
                const iconPositionAboveOrBelowText =
                  card.settings.iconPosition === "above" ||
                  card.settings.iconPosition === "below";
                return (
                  <Button
                    className="w-full h-full"
                    style={{ gap: card.settings.textIconGap }}
                    variant={card.settings.variant}
                    justifyItems={
                      !iconPositionAboveOrBelowText
                        ? card.settings.alignment
                        : "center"
                    }
                    alignItems={
                      iconPositionAboveOrBelowText
                        ? card.settings.alignment
                        : "center"
                    }
                    iconPosition={card.settings.iconPosition}
                  >
                    {!isIconOnly && (
                      <span className="truncate">{card.settings.text}</span>
                    )}
                    {isTextAndIcon && (
                      <ButtonIcon className="min-w-max min-h-max" size={18} />
                    )}
                  </Button>
                );
              case "image":
                return (
                  <>
                    {card.settings.src ? (
                      <Image
                        alt={card.settings.imageId}
                        src={card.settings.src}
                        className="w-full h-full object-cover"
                        fill
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex justify-center items-center rounded-md">
                        <ImagePlaceHolder fillColor={"fill-background"} />
                      </div>
                    )}
                  </>
                );
              case "text":
                return (
                  <TextComp
                    isEditing={isEditing}
                    isSelected={isSelected}
                    textSettings={card.settings}
                    onTextChange={handleTextChange}
                    onFocus={handleTextEditorFocus} // Set editing state on focus
                    onBlur={handleTextEditorBlur} // Reset editing state on blur
                  />
                );
              default:
                return <div>default</div>;
            }
          })()}
        </div>
      </div>
    );
  };

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
          layouts={section.content.gridLayout}
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
          onDragStop={() => dispatch(updateIsDragging(false))}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => setIsResizing(false)}
          isDraggable={!isEditing} // Disable dragging while editing
          isResizable={!isEditing} // Optionally disable resizing while editing
          resizeHandles={["sw", "nw", "se", "ne"]}
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
                  sideOffset={20}
                  side="top"
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
