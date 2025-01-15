import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateIsDragging, updateStyle } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { FluidStyle } from "@/types/sectionsTypes/fluid";
import debounce from "lodash/debounce";
import { MoveVertical } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
interface ResizeHeightProps {
  fluidSectionStyles: FluidStyle;
  isLg: boolean;
  isMd: boolean;
  isXs: boolean;
  pageId: string;
  section: any;
  minHeight: {
    lg: number;
    md: number;
    xs: number;
  };
  setMinHeight: React.Dispatch<
    React.SetStateAction<{
      lg: number;
      md: number;
      xs: number;
    }>
  >;
}
function ResizeHeight({
  isLg,
  isMd,
  isXs,
  fluidSectionStyles,
  pageId,
  section,
  minHeight,
  setMinHeight,
}: ResizeHeightProps) {
  const isDraggingRef = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const dispatch = useAppDispatch();

  // Create debounced update function
  const debouncedUpdateStyle = useCallback(
    debounce((newHeight: number, breakpoint: string) => {
      // Get current heights
      const currentHeights = {
        lg: fluidSectionStyles.minHeights.lg,
        md: fluidSectionStyles.minHeights.md,
        xs: fluidSectionStyles.minHeights.xs,
      };

      // Update the height for the specific breakpoint
      dispatch(
        updateStyle(pageId, section.id, {
          minHeights: {
            ...currentHeights,
            [breakpoint]: newHeight,
          },
        })
      );
    }, 1000), // Reduced debounce time for better responsiveness
    [dispatch, pageId, section.id, fluidSectionStyles.minHeights]
  );

  useEffect(() => {
    setMinHeight({
      lg: fluidSectionStyles.minHeights.lg,
      md: fluidSectionStyles.minHeights.md,
      xs: fluidSectionStyles.minHeights.xs,
    });
  }, [fluidSectionStyles.minHeights]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startY.current = e.clientY;
    isDraggingRef.current = true;

    // Set initial height based on current breakpoint
    if (isLg) startHeight.current = minHeight.lg;
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

      // Update the state immediately for visual feedback
      setMinHeight((prev) => {
        const updatedHeight = { ...prev };
        if (isLg) {
          updatedHeight.lg = newHeight;
          debouncedUpdateStyle(newHeight, "lg");
        } else if (isMd) {
          updatedHeight.md = newHeight;
          debouncedUpdateStyle(newHeight, "md");
        } else if (isXs) {
          updatedHeight.xs = newHeight;
          debouncedUpdateStyle(newHeight, "xs");
        }
        return updatedHeight;
      });
    },
    [isLg, isMd, isXs, debouncedUpdateStyle]
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
  );
}

export default ResizeHeight;
