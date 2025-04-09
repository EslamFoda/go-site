"use client";

import React, { useEffect, useRef, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackOptions } from "gridstack";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateIsDragging,
  updateIsDraggingItem,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { FluidStyle, GridCard } from "@/types/sectionsTypes/fluid";
import { renderCardContent } from "./cardContent"; // Import your renderCardContent
import { createRoot } from "react-dom/client";

interface DraggableGridLayoutProps {
  section: any;
  pageId: string;
}

const DraggableGridLayout: React.FC<DraggableGridLayoutProps> = ({
  pageId,
  section,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GridStack | null>(null);
  const dispatch = useAppDispatch();
  const { dragItem, isDragging } = useAppSelector(
    (state) => state.editor.present
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [cardType, setCardType] = useState("");
  const fluidSectionStyles = section.style as FluidStyle;
  const roots = useRef<Map<string, any>>(new Map()); // Store React roots for each widget

  const gridOptions: GridStackOptions = {
    column: 12,
    minRow: 1,
    row: fluidSectionStyles.minHeights.lg / 10,
    cellHeight: 10,
    margin: 5,
    float: true,
    disableOneColumnMode: true,
    animate: true,
    acceptWidgets: true,
    removable: false,
    resizable: {
      handles: "e, se, s, sw, w",
    },
  };

  // Initialize GridStack
  useEffect(() => {
    if (gridRef.current && !grid) {
      const gridInstance = GridStack.init(gridOptions, gridRef.current);

      gridInstance.on("dragstart", () => {
        dispatch(updateIsDragging(true));
      });

      gridInstance.on("dragstop", () => {
        dispatch(updateIsDragging(false));
        const updatedLayout = gridInstance.save(false);
        // Update your section content with the new layout here
      });

      gridInstance.on("dropped", (event, previousWidget, newWidget) => {
        if (dragItem && newWidget) {
          const newCard: GridCard = {
            ...dragItem,
            i: `${dragItem.i}-${Date.now()}`,
            x: newWidget.x || 0,
            y: newWidget.y || 0,
            w: newWidget.width || 3,
            h: newWidget.height || 3,
          };
          updateSectionContent([...section.content.gridCards, newCard]);
          dispatch(updateIsDraggingItem(null));
          dispatch(updateIsDragging(false));
        }
      });

      gridInstance.on("resizestop", () => {
        const updatedLayout = gridInstance.save(false);
        // Update your section content with the new layout here
      });

      setGrid(gridInstance);
    }

    return () => {
      if (grid) {
        grid.destroy(false);
      }
      roots.current.forEach((root) => root.unmount());
      roots.current.clear();
    };
  }, [gridRef, grid]);

  // Function to update section content (simplified version)
  const updateSectionContent = (newGridCards: GridCard[]) => {
    // This should update your Redux store or wherever you store section data
    section.content.gridCards = newGridCards;
    renderWidgets();
  };

  // Render widgets with React components
  const renderWidgets = () => {
    if (grid && section.content.gridCards) {
      grid.removeAll();
      section.content.gridCards.forEach((card: GridCard) => {
        const widget = grid.addWidget({
          w: card.w || 3,
          h: card.h || 3,
          id: card.i,
        });

        const contentDiv = widget.querySelector(".grid-stack-item-content");
        if (contentDiv) {
          // Clear existing content
          contentDiv.innerHTML = "";

          // Create a container for React
          const reactContainer = document.createElement("div");
          reactContainer.style.height = "100%";
          contentDiv.appendChild(reactContainer);

          // Render React component
          const root = createRoot(reactContainer);
          roots.current.set(card.i, root);

          root.render(
            renderCardContent({
              card,
              pageId,
              section,
              selectedItemId,
              isEditing,
              setSelectedItemId,
              updateSectionContent,
              dispatch,
              setCardType,
              setIsEditing,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    renderWidgets();
  }, [grid, section.content.gridCards, selectedItemId, isEditing]);

  return (
    <div
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        setSelectedItemId(null);
      }}
      className="relative border border-dashed border-primary"
    >
      <div
        ref={gridRef}
        className="grid-stack"
        style={{
          minHeight: `${fluidSectionStyles.minHeights.lg}px`,
          background: "transparent",
        }}
      />
    </div>
  );
};

export default DraggableGridLayout;
