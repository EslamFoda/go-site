import React, { useCallback } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateIsDragging, updateIsDraggingItem } from "@/reduxStore/action";
import { GridCard } from "@/types/sectionsTypes/fluid";
import { ImageIcon, SquareMousePointer, Type } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const initialCards: GridCard[] = [
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
];

// Map of element renderers based on type
const cardElementMap: Record<string, (card: GridCard) => JSX.Element> = {
  text: (card) => (
    <div className="w-full border p-2 flex items-center gap-2">
      <Type size={20} />
      <span className="capitalize text-lg">{card.type}</span>
    </div>
  ),
  image: (card) => (
    <div className="w-full border p-2 flex items-center gap-2">
      <ImageIcon size={20} />
      <span className="capitalize text-md">{card.type}</span>
    </div>
  ),
  button: (card) => (
    <div className="w-full border p-2 flex items-center gap-2">
      <SquareMousePointer size={20} />
      <span className="capitalize text-md">{card.type}</span>
    </div>
  ),
};

function ElementTab() {
  const dispatch = useAppDispatch();

  const onDragStart = useCallback(
    (e: React.DragEvent, item: GridCard) => {
      dispatch(updateIsDraggingItem(item));
      dispatch(updateIsDragging(true));
    },
    [dispatch]
  );

  return (
    <TabsContent className="space-y-2 px-5" value="elements">
      <div className="w-full flex gap-4 flex-col items-center justify-center">
        {initialCards.map((card) => (
          <div
            key={card.i}
            draggable
            onDragStart={(e) => onDragStart(e, card)}
            className="rounded-md flex items-center justify-center w-full cursor-move"
          >
            {/* Render the element based on card type */}
            {cardElementMap[card.type](card)}
          </div>
        ))}
      </div>
    </TabsContent>
  );
}

export default ElementTab;
