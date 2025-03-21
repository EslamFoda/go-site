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
import {
  GalleryContent,
  GalleryStyle,
  Photo,
} from "@/types/sectionsTypes/gallery";
import React from "react";
import { v4 } from "uuid";
import EditText from "../../settingsUi/EditText";
interface GalleryContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  galleryContent: GalleryContent;
  galleryStyle: GalleryStyle;
  items: Photo[];
  pageId: string;
}
function GalleryContentTab({
  findSelectedSection,
  galleryContent,
  galleryStyle,
  items,
  pageId,
}: GalleryContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { photos: newItems })
    );
  };

  const handleAddPhoto = () => {
    const newItem = {
      id: v4(),
      url: "",
      imgId: "",
    } as Photo;
    const newItems = [...items, newItem] as Photo[];
    dispatch(
      updateContent(pageId, findSelectedSection.id, { photos: newItems })
    );
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={galleryContent.label}
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
        value={galleryContent.title}
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
                  ...galleryStyle.designSettings!,
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
        value={galleryContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
      <DraggableList
        label="Media"
        hasImg
        handleDragEnd={handleDragEnd}
        items={galleryContent?.photos || []}
        handleAdd={handleAddPhoto}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default GalleryContentTab;
