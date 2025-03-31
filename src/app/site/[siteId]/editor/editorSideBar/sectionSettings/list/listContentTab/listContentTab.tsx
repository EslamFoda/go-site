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
import { ListContent, ListItem, ListStyle } from "@/types/sectionsTypes/list";
import React from "react";
import { v4 } from "uuid";
import EditText from "../../settingsUi/EditText";
import ToggleGroup from "../../settingsUi/toggleGroup";
interface ListContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  listContent: ListContent;
  listStyle: ListStyle;
  items: ListItem[];
  pageId: string;
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}
function ListContentTab({
  findSelectedSection,
  listContent,
  listStyle,
  items,
  pageId,
  setItems,
}: ListContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    dispatch(updateContent(pageId, findSelectedSection.id, { list: newItems }));
  };

  const handleAddList = () => {
    const newItem = {
      id: v4(),
      title: "Add title",
      text: "Add text here",
      icon: "",
      link: "",
      externalLink: "",
      image: "",
      imageId: "",
      linkType: "internal",
      openNewTab: false,
      pageId: "",
    } as ListItem;
    const newItems = [...items, newItem] as ListItem[];
    setItems(newItems);
    dispatch(updateContent(pageId, findSelectedSection.id, { list: newItems }));
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={listContent.label}
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
        value={listContent.title}
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
                  ...listStyle.designSettings!,
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
        value={listContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
      <ToggleGroup
        label="Type"
        options={[
          { value: "icon", label: "Icon" },
          { value: "image", label: "Image" },
        ]}
        value={listContent.type}
        onValueChange={(value) => {
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              type: value,
            })
          );
        }}
      />
      <DraggableList
        label="List"
        handleDragEnd={handleDragEnd}
        items={listContent?.list || []}
        handleAdd={handleAddList}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default ListContentTab;
