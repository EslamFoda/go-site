import React, { useCallback } from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateIsDragging, updateIsDraggingItem } from "@/reduxStore/action";
import { CardData } from "@/types/common";
import { Button } from "@/components/ui/button";

const initialCards: CardData[] = [
  { i: "spell-caster", content: "Spell Caster", w: 11, h: 6, type: "image" },
  {
    i: "blue-eyes-dragon",
    content: "Click Me",
    w: 5,
    h: 1,
    type: "button",
  },
];

// Map of element renderers based on type
const cardElementMap: Record<string, (card: CardData) => JSX.Element> = {
  image: (card) => <div>Image</div>,
  button: (card) => <div>Button</div>,
};

function FluidSettings() {
  const dispatch = useAppDispatch();

  const onDragStart = useCallback((e: React.DragEvent, item: CardData) => {
    dispatch(updateIsDraggingItem(item));
    dispatch(updateIsDragging(true));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-4">
      <h1 className="text-2xl font-bold">Elements</h1>
      {initialCards.map((card) => (
        <div
          key={card.i}
          draggable
          onDragStart={(e) => onDragStart(e, card)}
          className="rounded-md flex items-center justify-center w-16 h-16 border cursor-move"
        >
          {/* Render the element based on card type */}
          {cardElementMap[card.type](card)}
        </div>
      ))}
    </div>
  );
}

export default FluidSettings;
