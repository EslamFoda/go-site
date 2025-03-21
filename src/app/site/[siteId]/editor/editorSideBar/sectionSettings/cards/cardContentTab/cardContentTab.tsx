import DraggableList from "@/components/ui/DraggableList";
import { TabsContent } from "@/components/ui/tabs";
import {
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Card, CardsContent, CardStyle } from "@/types/sectionsTypes/cards";
import React from "react";
import { v4 } from "uuid";
import EditText from "../../settingsUi/EditText";
interface CardContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  cardsContent: CardsContent;
  cardStyle: CardStyle;
  items: Card[];
  pageId: string;
}
function CardContentTab({
  findSelectedSection,
  cardsContent,
  cardStyle,
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
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={cardsContent.label}
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
        inputType="textArea"
        id="title"
        value={cardsContent.title}
        handleUpdate={(e: any) => {
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              title: e.target.value,
            })
          );

          if (e.target.value === "") {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...cardStyle.designSettings!,
                  leftTitlePosition: false,
                },
              })
            );
          }
        }}
      />
      <EditText
        label="Subtitle"
        placeholder="Add subtitle"
        inputType="textArea"
        id={findSelectedSection?.id + "subtitle"}
        value={cardsContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
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
