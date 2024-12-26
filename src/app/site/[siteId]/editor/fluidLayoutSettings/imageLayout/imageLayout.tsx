import { setFluidCard, updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidImageSettings, GridCard } from "@/types/sectionsTypes/fluid";
import React, { useRef, useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

interface ImageLayoutProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

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

  const [zoom, setZoom] = useState(fluidCardSettings?.imageFilters?.zoom || 1);
  const [rotate, setRotate] = useState(
    fluidCardSettings?.imageFilters?.rotate || 0
  );

  // Filter states
  const [position, setPosition] = useState(
    fluidCardSettings?.imageFilters?.position || { x: 0.5, y: 0.5 }
  );
  const [contrast, setContrast] = useState(
    fluidCardSettings?.imageFilters?.contrast || 100
  );
  const [brightness, setBrightness] = useState(
    fluidCardSettings?.imageFilters?.brightness || 100
  );
  const [blur, setBlur] = useState(fluidCardSettings?.imageFilters?.blur || 0);
  const [hue, setHue] = useState(fluidCardSettings?.imageFilters?.hue || 0);
  const [exposure, setExposure] = useState(
    fluidCardSettings?.imageFilters?.exposure || 1
  );
  const [opacity, setOpacity] = useState(
    fluidCardSettings?.imageFilters?.opacity || 100
  );

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
    const updatedFluidCard = {
      ...fluidCard,
      settings: { ...fluidCard.settings, ...settings },
    } as GridCard;
    handleSetFluidCard(updatedFluidCard);
  };

  const getFilterStyle = () => {
    return `
      contrast(${contrast}%)
      brightness(${brightness}%)
      blur(${blur}px)
      hue-rotate(${hue}deg)
      saturate(${exposure})
      opacity(${opacity}%)
    `;
  };

  const applyFiltersToCanvas = () => {
    if (!editorRef.current || !canvasRef.current) return;
    const editorCanvas = editorRef.current.getImage();  // Get original image instead of scaled
    const ctx = canvasRef.current.getContext("2d", { 
      willReadFrequently: true,
      alpha: true
    });
  
    if (ctx) {
      // Set canvas size to match original image dimensions
      const originalWidth = editorCanvas.width;
      const originalHeight = editorCanvas.height;
      canvasRef.current.width = originalWidth;
      canvasRef.current.height = originalHeight;
  
      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
  
      ctx.filter = getFilterStyle();
      ctx.drawImage(editorCanvas, 0, 0, originalWidth, originalHeight);
  
      // Use maximum quality in toDataURL
      return canvasRef.current.toDataURL('image/png', 1.0);
    }
  };

  const handleSave = () => {
    const filteredImageData = applyFiltersToCanvas();
    if (filteredImageData) {
      handleMultipleSettingChanges({
        src: filteredImageData,
        imageFilters: {
          zoom,
          rotate,
          brightness,
          contrast,
          blur,
          hue,
          exposure,
          opacity,
          position,
        },
      });
    }
  };

  const handleReset = () => {
    handleMultipleSettingChanges({
      src: fluidCardSettings.originalSrc, // Reset to the original image
      imageFilters: {
        zoom: 1,
        rotate: 0,
        brightness: 100,
        contrast: 100,
        blur: 0,
        hue: 0,
        exposure: 1,
        opacity: 100,
        position: { x: 0.5, y: 0.5 },
      },
    });
    setPosition({ x: 0.5, y: 0.5 });
    setZoom(1);
    setRotate(0);
    setContrast(100);
    setBrightness(100);
    setBlur(0);
    setHue(0);
    setExposure(1);
    setOpacity(100);
  };

  useEffect(() => {
    // Synchronize local states with Redux when the component loads
    setPosition(
      fluidCardSettings?.imageFilters?.position || { x: 0.5, y: 0.5 }
    );
    setZoom(fluidCardSettings?.imageFilters?.zoom || 1);
    setRotate(fluidCardSettings?.imageFilters?.rotate || 0);
    setContrast(fluidCardSettings?.imageFilters?.contrast || 100);
    setBrightness(fluidCardSettings?.imageFilters?.brightness || 100);
    setBlur(fluidCardSettings?.imageFilters?.blur || 0);
    setHue(fluidCardSettings?.imageFilters?.hue || 0);
    setExposure(fluidCardSettings?.imageFilters?.exposure || 1);
    setOpacity(fluidCardSettings?.imageFilters?.opacity || 100);
  }, [fluidCardSettings]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <AvatarEditor
        ref={editorRef}
        image={fluidCardSettings.originalSrc} // Always use the original source
        width={250}
        crossOrigin="anonymous" // Allow cross-origin for the image
        height={250}
        border={50}
        borderRadius={125} // Makes it circular
        color={[255, 255, 255, 0.6]} // RGBA
        scale={zoom}
        rotate={rotate}
        position={position}
        onPositionChange={setPosition}
        style={{ filter: getFilterStyle() }} // Apply filters dynamically
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div className="flex flex-wrap gap-4">
        <label>
          Zoom:
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Rotate:
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Contrast:
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            value={contrast}
            onChange={(e) => setContrast(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Brightness:
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Blur:
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={blur}
            onChange={(e) => setBlur(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Hue:
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={hue}
            onChange={(e) => setHue(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Exposure:
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Opacity:
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={opacity}
            onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Image
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset to Original
        </button>
      </div>
    </div>
  );
}

export default ImageLayout;
