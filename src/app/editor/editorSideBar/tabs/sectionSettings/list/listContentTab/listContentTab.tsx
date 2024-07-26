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
import { ListContent, ListItem } from "@/types/sectionsTypes/list";
import React from "react";
import { v4 } from "uuid";
interface ListContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  listContent: ListContent;
  items: ListItem[];
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}
function ListContentTab({
  findSelectedSection,
  listContent,
  items,
  setItems,
}: ListContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    dispatch(updateContent(findSelectedSection.id, { list: newItems }));
  };

  const handleAddCard = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
      icon: "",
      link: "",
    } as ListItem;
    const newItems = [...items, newItem] as ListItem[];
    setItems(newItems);
    dispatch(updateContent(findSelectedSection.id, { list: newItems }));
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={listContent?.label}
          onChange={(e: any) => {
            console.log(e.target.value);
            dispatch(
              updateContent(findSelectedSection.id, {
                label: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="title">Title</Label>
        <Input
          className="w-4/6"
          id="title"
          value={listContent?.title}
          onChange={(e: any) => {
            console.log(e.target.value);
            dispatch(
              updateContent(findSelectedSection?.id!, {
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
          id="subtitle"
          value={listContent?.subtitle}
          onChange={(e: any) => {
            dispatch(
              updateContent(findSelectedSection?.id!, {
                subtitle: e.target.value,
              })
            );
          }}
        />
      </div>
      <DraggableList
        label="List"
        handleDragEnd={handleDragEnd}
        items={listContent?.list || []}
        handleAdd={handleAddCard}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default ListContentTab;
