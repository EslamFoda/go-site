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
import { Accordion, AccordionContent } from "@/types/sectionsTypes/accordion";
import React from "react";
import { v4 } from "uuid";
interface AccordionContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  accordionContent: AccordionContent;
  items: Accordion[];
  pageId: string;
}
function AccordionContentTab({
  findSelectedSection,
  accordionContent,
  items,
  pageId,
}: AccordionContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { accordions: newItems })
    );
  };

  const handleAddAccordion = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
    } as Accordion;
    const newItems = [...items, newItem] as Accordion[];
    dispatch(
      updateContent(pageId, findSelectedSection.id, { accordions: newItems })
    );
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={accordionContent?.label}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection.id, {
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
          value={accordionContent?.title}
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
          id={findSelectedSection.id + "subtitle"}
          value={accordionContent?.subtitle}
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
        label="Accordion"
        handleDragEnd={handleDragEnd}
        items={accordionContent?.accordions || []}
        handleAdd={handleAddAccordion}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default AccordionContentTab;
