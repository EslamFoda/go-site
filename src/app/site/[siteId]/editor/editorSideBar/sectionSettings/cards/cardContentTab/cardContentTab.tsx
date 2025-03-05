import DraggableList from "@/components/ui/DraggableList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
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
  pageId: string;
}
function CardContentTab({
  findSelectedSection,
  cardsContent,
  items,
  pageId,
}: CardContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: newItems })
    );
  };

  const handleAddCard = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
      image: "",
      button: "",
      buttonColor: "gray",
      link: "",
    };
    const newItems = [...items, newItem] as Card[];

    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: newItems })
    );
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
           placeholder="Add label"
          value={cardsContent?.label}
          onChange={(e: any) => {
            // @ts-ignore
            updateContent(pageId, findSelectedSection.id, {
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
          placeholder="Add title"
          value={cardsContent?.title}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                title: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          className="w-4/6 "
          id={findSelectedSection?.id + "subtitle"}
          placeholder="Add subtitle"
          value={cardsContent?.subtitle}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                subtitle: e.target.value,
              })
            );
          }}
        />
      </div>
      <DraggableList
        label="Card"
        handleDragEnd={handleDragEnd}
        items={cardsContent?.cards || []}
        handleAdd={handleAddCard}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default CardContentTab;
