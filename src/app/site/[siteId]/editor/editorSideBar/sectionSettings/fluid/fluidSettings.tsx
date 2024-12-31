import React, { useCallback } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateIsDragging, updateIsDraggingItem } from "@/reduxStore/action";
import { GridCard } from "@/types/sectionsTypes/fluid";
import { Button } from "@/components/ui/button";
import { ImagePlaceHolder } from "@/icons/common";
import { Type } from "lucide-react";

const initialCards: GridCard[] = [
  {
    i: "image",
    content: "Spell Caster",
    w: 11,
    h: 6,
    type: "image",
    settings: {
      src: "",
      imageId: "",
      originalSrc: "",
      imageFilters: {},
    },
  },
  {
    i: "button",
    content: "Click Me",
    settings: {
      text: "Click Me",
      variant: "default",
      size: "sm",
      buttonDisplay: "Text only",
      alignment: "center",
      buttonIcon: "",
      textIconGap: 8,
      iconPosition: "right",
    },
    w: 5,
    h: 1,
    type: "button",
  },
  {
    i: "text",
    content: "title text",
    settings: {
      color: "",
      html: "<p>Edit me!</p>",
    },
    w: 5,
    h: 1,
    type: "text",
  },
];

// Map of element renderers based on type
const cardElementMap: Record<string, (card: GridCard) => JSX.Element> = {
  image: (card) => (
    <div className="w-full h-36 bg-muted flex justify-center items-center rounded-md">
      <ImagePlaceHolder fillColor={"fill-background"} />
    </div>
  ),
  button: (card) => <Button className="w-full ">Button</Button>,
  text: (card) => (
    <div className="w-full border p-7 flex items-center justify-center">
      <Type size={40} />
    </div>
  ),
};

function FluidSettings() {
  const dispatch = useAppDispatch();

  const onDragStart = useCallback(
    (e: React.DragEvent, item: GridCard) => {
      dispatch(updateIsDraggingItem(item));
      dispatch(updateIsDragging(true));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 w-full border-b py-5 text-center">
        <h1 className="text-2xl font-bold">Elements</h1>
      </div>
      <div className="w-full p-5 flex gap-8 flex-col items-center justify-center">
        {initialCards.map((card) => (
          <div
            key={card.i}
            draggable
            onDragStart={(e) => onDragStart(e, card)}
            className="rounded-md flex items-center justify-center w-4/6 cursor-move"
          >
            {/* Render the element based on card type */}
            {cardElementMap[card.type](card)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FluidSettings;
