import DraggableList from "@/components/ui/DraggableList";
import { TabsContent } from "@/components/ui/tabs";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import {
  Accordion,
  AccordionContent,
} from "@/types/sectionsTypes/accordion/accordion";
import React from "react";
import { v4 } from "uuid";
import EditText from "../../settingsUi/EditText";
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
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={accordionContent.label}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              label: e.target.value,
            })
          )
        }
      />
      <EditText
        label="Title"
        placeholder="Add title"
        id="title"
        value={accordionContent.title}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              title: e.target.value,
            })
          )
        }
      />
      <EditText
        label="Subtitle"
        placeholder="Add subtitle"
        inputType="textArea"
        id={findSelectedSection?.id + "subtitle"}
        value={accordionContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
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
