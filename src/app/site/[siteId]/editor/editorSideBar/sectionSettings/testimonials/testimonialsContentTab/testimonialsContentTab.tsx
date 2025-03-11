import React from "react";
import { v4 } from "uuid";
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
  Testimonial,
  TestimonialContent,
} from "@/types/sectionsTypes/testimonials";
import ReviewType from "../../settingsUi/ReviewType";
import EditText from "../../settingsUi/EditText";
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
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={testimonialsContent.label}
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
        value={testimonialsContent.title}
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
        value={testimonialsContent.subtitle}
        handleUpdate={(e: any) =>
          dispatch(
            updateContent(pageId, findSelectedSection.id, {
              subtitle: e.target.value,
            })
          )
        }
      />
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
