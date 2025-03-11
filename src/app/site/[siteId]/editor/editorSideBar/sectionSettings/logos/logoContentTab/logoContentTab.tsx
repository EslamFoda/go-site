import DraggableList from "@/components/ui/DraggableList";
import { TabsContent } from "@/components/ui/tabs";
import { updateContent, updateSelectedItem } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Logo, LogosContent } from "@/types/sectionsTypes/logos";
import React from "react";
import { v4 } from "uuid";
import EditText from "../../settingsUi/EditText";
interface LogoContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  logosContent: LogosContent;
  items: Logo[];
  pageId: string;
}
function LogoContentTab({
  findSelectedSection,
  logosContent,
  items,
  pageId,
}: LogoContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { logos: newItems })
    );
  };

  const handleAddPhoto = () => {
    const newItem = {
      id: v4(),
      darkImgId: "",
      lightImgId: "",
      urlDark: "",
      urlLight: "",
      size: { desktop: 1, mobile: 1 },
      link: "",
    } as Logo;
    const newItems = [...items, newItem] as Logo[];
    dispatch(
      updateContent(pageId, findSelectedSection.id, { logos: newItems })
    );
  };
  return (
    <TabsContent className="px-5 space-y-2" value="content">
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={logosContent.label}
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
        value={logosContent.title}
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
        value={logosContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
      <DraggableList
        label="Logo"
        hasImg
        handleDragEnd={handleDragEnd}
        items={logosContent?.logos || []}
        handleAdd={handleAddPhoto}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default LogoContentTab;
