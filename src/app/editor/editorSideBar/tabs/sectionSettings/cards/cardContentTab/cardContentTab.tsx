import DraggableList from "@/components/ui/DraggableList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useEditor, {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/store/editorStore";
import { Card, CardsContent } from "@/types/sectionsTypes/cards";
import React from "react";
import { v4 } from "uuid";
interface CardContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  cardsContent: CardsContent;
  items: Card[];
  setItems: React.Dispatch<React.SetStateAction<Card[]>>;
}
function CardContentTab({
  findSelectedSection,
  cardsContent,
  items,
  setItems,
}: CardContentTabProps) {
  const { updateContent, handleSelectedItem } = useEditor();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    updateContent(findSelectedSection.id, { cards: newItems });
  };

  const handleAddCard = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
      image: "",
      button: "",
      buttonColor: "gray" || "primary",
      link: "",
    };
    const newItems = [...items, newItem] as Card[];
    setItems(newItems);
    updateContent(findSelectedSection.id, { cards: newItems });
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={cardsContent?.label}
          onChange={(e: any) => {
            console.log(e.target.value);
            // @ts-ignore
            updateContent(findSelectedSection.id, {
              label: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="title">Title</Label>
        <Input
          className="w-4/6"
          id="title"
          value={cardsContent?.title}
          onChange={(e: any) => {
            console.log(e.target.value);
            updateContent(findSelectedSection?.id!, {
              title: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          className="w-4/6 "
          id="subtitle"
          value={cardsContent?.subtitle}
          onChange={(e: any) => {
            updateContent(findSelectedSection?.id!, {
              subtitle: e.target.value,
            });
          }}
        />
      </div>
      <DraggableList
        label="Card"
        handleDragEnd={handleDragEnd}
        items={cardsContent?.cards || []}
        handleAdd={handleAddCard}
        setSelectedItem={handleSelectedItem}
      />
    </TabsContent>
  );
}

export default CardContentTab;
