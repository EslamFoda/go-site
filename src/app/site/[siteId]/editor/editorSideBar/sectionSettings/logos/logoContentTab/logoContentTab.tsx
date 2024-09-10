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
import { Logo, LogosContent } from "@/types/sectionsTypes/logos";
import React from "react";
import { v4 } from "uuid";
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
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={logosContent?.label}
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
          value={logosContent?.title}
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
          value={logosContent?.subtitle}
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
