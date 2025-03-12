import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import ColorSelector from "../settingsUi/ColorSelector";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import {
  Testimonial,
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import TestimonialsContentTab from "./testimonialsContentTab/testimonialsContentTab";
import WidthOrHeight from "../settingsUi/WidthOrHeight";
import TestimonialsStyleTab from "./testimonialsStyleTab";
import BackBtn from "@/components/shared/backBtn";
import ImageSelector from "@/components/shared/imageSelector";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import SpacingTab from "@/components/shared/spacingTab";
interface TestimonialsSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function TestimonialsSettings({ pageId, sections }: TestimonialsSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [openSpacingTab, setOpenSpacingTab] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedItem, chooseImage, selectedSection } = useAppSelector(
    (state) => state.editor.present
  );

  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const TestimonialsContent =
    findSelectedSection?.content as TestimonialContent;
  const TestimonialsStyle = findSelectedSection?.style as TestimonialStyle;
  const TestimonialItem = selectedItem as Testimonial;

  const handleDeleteTestimonial = () => {
    const filterTestimonials = TestimonialsContent?.testimonials?.filter(
      (testimonial) => testimonial.id !== TestimonialItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        testimonials: filterTestimonials,
      })
    );
    dispatch(updateSelectedItem(null));
  };

  const handleUpdateTestimonialItem = (updates: Partial<Testimonial>) => {
    const updatedTestimonials = TestimonialsContent.testimonials.map(
      (testimonial) =>
        testimonial.id === TestimonialItem.id
          ? { ...testimonial, ...updates }
          : testimonial
    );
    dispatch(updateSelectedItem({ ...TestimonialItem, ...updates }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        testimonials: updatedTestimonials,
      })
    );
  };

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={TestimonialsStyle}
        setOpenSpacingTab={setOpenSpacingTab}
      />
    );
  }
  if (chooseImage) {
    return (
      <ChooseImage
        selectedImgId={TestimonialItem?.avatarId || ""}
        handleUpdateUnsplash={(image: UnsplashImage) => {
          handleUpdateTestimonialItem({
            avatar: image.urls.regular,
            avatarId: image.id,
          });
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          handleUpdateTestimonialItem({
            avatar: image.url,
            avatarId: image.id,
          });
        }}
      />
    );
  }

  if (TestimonialItem)
    return (
      <div className="space-y-2">
        <div
          className="flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-muted-bg mb-3"
          onClick={() => {
            dispatch(updateSelectedItem(null));
          }}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <ChevronLeft size={18} />
            <Label className="cursor-pointer">{TestimonialItem.name}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteTestimonial}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 pb-1 space-y-2">
          <EditText
            inputType="textArea"
            label="Review"
            placeholder="Add review"
            id={TestimonialItem.id}
            value={TestimonialItem.review}
            handleUpdate={(e: any) =>
              handleUpdateTestimonialItem({ review: e.target.value })
            }
          />
          <EditText
            inputType="textArea"
            label="Name"
            placeholder="Add name"
            id={TestimonialItem.id}
            value={TestimonialItem.name}
            handleUpdate={(e: any) =>
              handleUpdateTestimonialItem({ name: e.target.value })
            }
          />
          <EditText
            inputType="textArea"
            label="Bio"
            placeholder="Add bio"
            id={TestimonialItem.id}
            value={TestimonialItem.bio}
            handleUpdate={(e: any) =>
              handleUpdateTestimonialItem({ bio: e.target.value })
            }
          />
          {TestimonialsContent.iconType === "star" && (
            <WidthOrHeight
              label="Rating"
              min={0}
              max={5}
              customText={`${TestimonialItem.rating}/5`}
              value={[TestimonialItem.rating]}
              onValueChange={(value) => {
                handleUpdateTestimonialItem({ rating: value[0] });
              }}
            />
          )}

          <ImageSelector
            title="Avatar"
            imageUrl={TestimonialItem.avatar}
            onImageSelect={() => dispatch(openChooseImage())}
            onImageDelete={() =>
              handleUpdateTestimonialItem({ avatar: "", avatarId: "" })
            }
            onBack={() => dispatch(updateSelectedItem(null))}
            showBackButton={false}
          />
        </div>
      </div>
    );

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={
              TestimonialsStyle.designSettings.sectionBackground.color
            }
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }
            }}
          />
          <div className="space-y-1 flex items-center justify-between">
            <Label>Height</Label>
            <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...TestimonialsStyle.designSettings!,
                        sectionBackground: {
                          ...TestimonialsStyle.designSettings.sectionBackground,
                          height: "fill",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  TestimonialsStyle.designSettings.sectionBackground.height ===
                  "fill"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fill
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...TestimonialsStyle.designSettings!,
                        sectionBackground: {
                          ...TestimonialsStyle.designSettings.sectionBackground,
                          height: "fit",
                          align: "center",
                        },
                      },
                    })
                  );
                }}
                className={`${
                  TestimonialsStyle.designSettings.sectionBackground.height ===
                  "fit"
                    ? "bg-muted-bg"
                    : ""
                } flex items-center justify-center cursor-pointer w-full`}
              >
                fit
              </div>
            </div>
          </div>
          {TestimonialsStyle.designSettings.sectionBackground.height ===
            "fill" && (
            <div className="space-y-1 flex items-center justify-between">
              <Label>Align</Label>
              <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...TestimonialsStyle.designSettings!,
                          sectionBackground: {
                            ...TestimonialsStyle.designSettings
                              .sectionBackground,
                            align: "start",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    TestimonialsStyle.designSettings.sectionBackground.align ===
                    "start"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyStart />
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...TestimonialsStyle.designSettings!,
                          sectionBackground: {
                            ...TestimonialsStyle.designSettings
                              .sectionBackground,
                            align: "center",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    TestimonialsStyle.designSettings.sectionBackground.align ===
                    "center"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyCenter />
                </div>
                <div
                  onClick={() => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...TestimonialsStyle.designSettings!,
                          sectionBackground: {
                            ...TestimonialsStyle.designSettings
                              .sectionBackground,
                            align: "end",
                          },
                        },
                      })
                    );
                  }}
                  className={`${
                    TestimonialsStyle.designSettings.sectionBackground.align ===
                    "end"
                      ? "bg-muted-bg"
                      : ""
                  } flex items-center justify-center cursor-pointer w-full`}
                >
                  <JustifyEnd />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
        </TabsList>
        <TestimonialsContentTab
          pageId={pageId}
          testimonialsContent={TestimonialsContent}
          findSelectedSection={findSelectedSection}
          items={TestimonialsContent?.testimonials}
        />
        <TestimonialsStyleTab
          pageId={pageId}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
          testimonialContent={TestimonialsContent}
          testimonialStyle={TestimonialsStyle}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default TestimonialsSettings;
