import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FluidImageSettings, GridCard } from "@/types/sectionsTypes/fluid";
import React, { useRef, useState } from "react";
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
  const fluidCardSettings = fluidCard?.settings as FluidImageSettings;
  const fluidSection = selectedSection?.content as SectionContentTypes["fluid"];
  const editorRef = useRef<AvatarEditor>(null);

  const [scale, setScale] = useState(1.2); // Scale (zoom) value
  const [rotate, setRotate] = useState(0); // Rotation angle
  const [flipH, setFlipH] = useState(false); // Flip horizontal
  const [flipV, setFlipV] = useState(false); // Flip vertical

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const dataURL = canvas.toDataURL();
      console.log(dataURL); // This is the edited image data URL
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* AvatarEditor Container */}
      <div className="relative w-64 h-64 border-4 border-gray-300 rounded-lg overflow-hidden">
        <AvatarEditor
          ref={editorRef}
          image={fluidCardSettings.src}
          width={250}
          height={250}
          border={50}
          scale={scale}
          rotate={rotate}
        />
      </div>

      {/* Controls for adjusting Image Options */}
      <div className="space-y-4">
        {/* Zoom (Scale) */}
        <div className="flex flex-col items-center">
          <label htmlFor="scale" className="text-sm font-semibold">
            Zoom
          </label>
          <input
            id="scale"
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="mt-2 w-32"
          />
        </div>

        {/* Rotate */}
        <div className="flex flex-col items-center">
          <label htmlFor="rotate" className="text-sm font-semibold">
            Rotate
          </label>
          <input
            id="rotate"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value))}
            className="mt-2 w-32"
          />
        </div>

        {/* Flip Horizontal */}
        <div className="flex flex-col items-center">
          <label htmlFor="flipH" className="text-sm font-semibold">
            Flip Horizontal
          </label>
          <input
            id="flipH"
            type="checkbox"
            checked={flipH}
            onChange={() => setFlipH(!flipH)}
            className="mt-2"
          />
        </div>

        {/* Flip Vertical */}
        <div className="flex flex-col items-center">
          <label htmlFor="flipV" className="text-sm font-semibold">
            Flip Vertical
          </label>
          <input
            id="flipV"
            type="checkbox"
            checked={flipV}
            onChange={() => setFlipV(!flipV)}
            className="mt-2"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save Image
        </button>
      </div>
    </div>
  );
}

export default ImageLayout;
