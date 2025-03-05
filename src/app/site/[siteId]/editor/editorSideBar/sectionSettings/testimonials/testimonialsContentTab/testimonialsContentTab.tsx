import React from "react";
import { v4 } from "uuid";
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
import {
  Testimonial,
  TestimonialContent,
} from "@/types/sectionsTypes/testimonials";
import ReviewType from "../../settingsUi/ReviewType";
interface TestimonialsContentTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  testimonialsContent: TestimonialContent;
  items: Testimonial[];
  pageId: string;
}
function TestimonialsContentTab({
  findSelectedSection,
  testimonialsContent,
  items,
  pageId,
}: TestimonialsContentTabProps) {
  const dispatch = useAppDispatch();
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(
      updateContent(pageId, findSelectedSection.id, { testimonials: newItems })
    );
  };

  const handleAddList = () => {
    const newItem = {
      id: v4(),
      review: "Add quote",
      name: "Add name",
      bio: "Add bio",
      rating: 3,
      avatar: "",
      link: "",
    } as Testimonial;
    const newItems = [...items, newItem] as Testimonial[];
    dispatch(
      updateContent(pageId, findSelectedSection.id, { testimonials: newItems })
    );
  };
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          placeholder="Add label"
          className="w-4/6"
          value={testimonialsContent?.label}
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
          placeholder="Add title"
          value={testimonialsContent?.title}
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
          value={testimonialsContent?.subtitle}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                subtitle: e.target.value,
              })
            );
          }}
        />
      </div>
      <ReviewType
        reviewType={testimonialsContent?.iconType}
        onValueChange={(value) =>
          dispatch(
            updateContent(pageId, findSelectedSection?.id!, { iconType: value })
          )
        }
      />
      <DraggableList
        label="Review"
        handleDragEnd={handleDragEnd}
        items={testimonialsContent?.testimonials || []}
        handleAdd={handleAddList}
        updateSelectedItem={updateSelectedItem}
      />
    </TabsContent>
  );
}

export default TestimonialsContentTab;
