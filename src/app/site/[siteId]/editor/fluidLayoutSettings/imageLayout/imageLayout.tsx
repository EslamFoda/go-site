import React, { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { setFluidCard, updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import AvatarEditor from "react-avatar-editor";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidImageSettings, GridCard } from "@/types/sectionsTypes/fluid";
import { Button } from "@/components/ui/button";
import {
  Aperture,
  Blend,
  ContrastIcon,
  Droplet,
  Eclipse,
  RotateCw,
  Sun,
  ZoomIn,
} from "lucide-react";

interface ImageLayoutProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

interface Position {
  x: number;
  y: number;
}

interface ImageFilters {
  zoom: number;
  rotate: number;
  contrast: number;
  brightness: number;
  blur: number;
  hue: number;
  exposure: number;
  opacity: number;
  position: Position;
}

const DEFAULT_POSITION: Position = { x: 0.5, y: 0.5 };

const imageOptions = [
  {
    id: "zoom",
    label: "Zoom",
    min: 1,
    max: 3,
    step: 0.1,
    defaultValue: 1,
    Icon: ZoomIn,
  },
  {
    id: "rotate",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    defaultValue: 0,
    Icon: RotateCw,
  },
  {
    id: "contrast",
    label: "Contrast",
    min: 0,
    max: 200,
    step: 1,
    defaultValue: 100,
    Icon: ContrastIcon,
  },
  {
    id: "brightness",
    label: "Brightness",
    min: 0,
    max: 200,
    step: 1,
    defaultValue: 100,
    Icon: Sun,
  },
  {
    id: "blur",
    label: "Blur",
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 0,
    Icon: Droplet,
  },
  {
    id: "hue",
    label: "Hue",
    min: 0,
    max: 360,
    step: 1,
    defaultValue: 0,
    Icon: Blend,
  },
  {
    id: "exposure",
    label: "Exposure",
    min: 0,
    max: 3,
    step: 0.1,
    defaultValue: 1,
    Icon: Aperture,
  },
  {
    id: "opacity",
    label: "Opacity",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 100,
    Icon: Eclipse,
  },
] as const;

function ImageLayout({
  activePageId,
  fluidCard,
  selectedSection,
}: ImageLayoutProps) {
  const dispatch = useAppDispatch();
  const fluidCardSettings = fluidCard?.settings as FluidImageSettings;
  const fluidSection = selectedSection?.content as SectionContentTypes["fluid"];
  const editorRef = useRef<AvatarEditor>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<ImageFilters>({
    zoom: fluidCardSettings?.imageFilters?.zoom ?? 1,
    rotate: fluidCardSettings?.imageFilters?.rotate ?? 0,
    contrast: fluidCardSettings?.imageFilters?.contrast ?? 100,
    brightness: fluidCardSettings?.imageFilters?.brightness ?? 100,
    blur: fluidCardSettings?.imageFilters?.blur ?? 0,
    hue: fluidCardSettings?.imageFilters?.hue ?? 0,
    exposure: fluidCardSettings?.imageFilters?.exposure ?? 1,
    opacity: fluidCardSettings?.imageFilters?.opacity ?? 100,
    position: fluidCardSettings?.imageFilters?.position ?? DEFAULT_POSITION,
  });

  const handleUpdateContent = (updatedCards: GridCard[]) => {
    dispatch(
      updateContent(activePageId, selectedSection.id, {
        gridCards: updatedCards,
      })
    );
  };

  const handleSetFluidCard = (updatedCard: GridCard) => {
    dispatch(setFluidCard(updatedCard));
  };

  const handleFilterChange = (
    id: keyof Omit<ImageFilters, "position">,
    value: number
  ) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handlePositionChange = (position: Position) => {
    setFilters((prev) => ({ ...prev, position }));
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = -event.deltaY / 200; // Adjust sensitivity here
    const newZoom = Math.max(1, Math.min(3, filters.zoom + delta));
    handleFilterChange("zoom", newZoom);
  };

  useEffect(() => {
    const editorWrapper = editorWrapperRef.current;
    if (editorWrapper) {
      editorWrapper.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        editorWrapper.removeEventListener("wheel", handleWheel);
      };
    }
  }, [filters.zoom]);

  const getFilterStyle = () => {
    return `
      contrast(${filters.contrast}%)
      brightness(${filters.brightness}%)
      blur(${filters.blur}px)
      hue-rotate(${filters.hue}deg)
      saturate(${filters.exposure})
      opacity(${filters.opacity}%)
    `;
  };

  const handleMultipleSettingChanges = (
    settings: Partial<FluidImageSettings>
  ) => {
    if (!fluidCard) return;
    const updatedCards = fluidSection.gridCards.map((card) =>
      card.i === fluidCard.i
        ? { ...card, settings: { ...card.settings, ...settings } }
        : card
    ) as GridCard[];
    handleUpdateContent(updatedCards);
    handleSetFluidCard({
      ...fluidCard,
      settings: { ...fluidCard.settings, ...settings },
    } as GridCard);
  };

  const applyFiltersToCanvas = () => {
    if (!editorRef.current || !canvasRef.current) return;
    const editorCanvas = editorRef.current.getImage();
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
      alpha: true,
    });

    if (ctx) {
      const originalWidth = editorCanvas.width;
      const originalHeight = editorCanvas.height;
      canvasRef.current.width = originalWidth;
      canvasRef.current.height = originalHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = getFilterStyle();
      ctx.drawImage(editorCanvas, 0, 0, originalWidth, originalHeight);
      return canvasRef.current.toDataURL("image/png", 1.0);
    }
  };

  const handleSave = () => {
    const filteredImageData = applyFiltersToCanvas();
    if (filteredImageData) {
      handleMultipleSettingChanges({
        src: filteredImageData,
        imageFilters: filters,
      });
    }
  };

  const handleReset = () => {
    const defaultFilters: ImageFilters = {
      zoom: 1,
      rotate: 0,
      brightness: 100,
      contrast: 100,
      blur: 0,
      hue: 0,
      exposure: 1,
      opacity: 100,
      position: DEFAULT_POSITION,
    };

    setFilters(defaultFilters);
    handleMultipleSettingChanges({
      src: fluidCardSettings.originalSrc,
      imageFilters: defaultFilters,
    });
  };

  useEffect(() => {
    if (fluidCardSettings?.imageFilters) {
      setFilters((prev) => ({
        ...prev,
        ...fluidCardSettings.imageFilters,
      }));
    }
  }, [fluidCardSettings]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={editorWrapperRef} className="cursor-zoom-in">
        <AvatarEditor
          ref={editorRef}
          image={fluidCardSettings.originalSrc}
          width={250}
          height={250}
          border={50}
          scale={filters.zoom}
          rotate={filters.rotate}
          position={filters.position}
          onPositionChange={handlePositionChange}
          style={{ filter: getFilterStyle() }}
          crossOrigin="anonymous"
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="grid grid-cols-2 gap-4 w-full">
        {imageOptions.map((option) => (
          <div key={option.id} className="w-full space-y-2">
            <div className="flex gap-2 items-center">
              <option.Icon size={18} />
              <Label>{option.label}</Label>
            </div>
            <Slider
              min={option.min}
              max={option.max}
              step={option.step}
              value={[filters[option.id as keyof typeof filters] as number]}
              onValueChange={([value]) =>
                handleFilterChange(
                  option.id as keyof Omit<ImageFilters, "position">,
                  value
                )
              }
              className="w-full border-muted-bg flex border-solid border-[1px] rounded-sm h-10"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full space-x-4">
        <Button className="w-full" onClick={handleSave}>
          Save Image
        </Button>
        <Button className="w-full" variant="secondary" onClick={handleReset}>
          Reset to Original
        </Button>
      </div>
    </div>
  );
}

export default ImageLayout;
