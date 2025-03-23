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
  openChooseBgImage,
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
import SwitchSetting from "../settingsUi/SwitchSetting";
import ToggleGroup from "../settingsUi/toggleGroup";
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
  const { selectedItem, chooseImage, selectedSection, chooseBgImage } =
    useAppSelector((state) => state.editor.present);

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
        showPadding
      />
    );
  }
  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
        selectedImgId={
          TestimonialsStyle?.designSettings.sectionBackground.media.imageId ||
          ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...TestimonialsStyle.designSettings,
                sectionBackground: {
                  ...TestimonialsStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.urls.regular,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...TestimonialsStyle.designSettings,
                sectionBackground: {
                  ...TestimonialsStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.url,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
      />
    );
  }

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
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
                        width: "fill",
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
          <ImageSelector
            imageUrl={
              TestimonialsStyle.designSettings.sectionBackground.media.imageUrl
            }
            onImageSelect={() => dispatch(openChooseBgImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...TestimonialsStyle.designSettings,
                    sectionBackground: {
                      ...TestimonialsStyle.designSettings.sectionBackground,
                      media: {
                        imageUrl: "",
                        imageId: "",
                      },
                      textColor: "light",
                    },
                  },
                })
              )
            }
            onBack={() => {}}
            showBackButton={false}
          />
          {TestimonialsStyle?.designSettings.sectionBackground.media
            .imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={
                TestimonialsStyle?.designSettings.sectionBackground.textColor
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        textColor: value,
                      },
                    },
                  })
                );
              }}
            />
          )}

          <ToggleGroup
            label="Height"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={TestimonialsStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...TestimonialsStyle.designSettings!,
                    sectionBackground: {
                      ...TestimonialsStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          {TestimonialsStyle.designSettings.sectionBackground.color !==
            "none" && (
            <ToggleGroup
              label="Width"
              options={[
                { value: "fill", label: "Fill" },
                { value: "fit", label: "Fit" },
              ]}
              value={TestimonialsStyle.designSettings.sectionBackground.width}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        width: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {TestimonialsStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={
                TestimonialsStyle.designSettings.sectionBackground.overlayEffect
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {TestimonialsStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={
                TestimonialsStyle.designSettings.sectionBackground.blurEffect
              }
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {TestimonialsStyle.designSettings.sectionBackground.height ===
            "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={TestimonialsStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...TestimonialsStyle.designSettings!,
                      sectionBackground: {
                        ...TestimonialsStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {TestimonialsStyle.designSettings.sectionBackground.media
            .imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {TestimonialsStyle.designSettings.sectionBackground.color !==
                "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    TestimonialsStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...TestimonialsStyle.designSettings!,
                          sectionBackground: {
                            ...TestimonialsStyle.designSettings
                              .sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!TestimonialsStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    TestimonialsStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...TestimonialsStyle.designSettings!,
                          sectionBackground: {
                            ...TestimonialsStyle.designSettings
                              .sectionBackground,
                            blur: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              <SwitchSetting
                label="Greyscale"
                defaultChecked={
                  TestimonialsStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...TestimonialsStyle.designSettings!,
                        sectionBackground: {
                          ...TestimonialsStyle.designSettings.sectionBackground,
                          greyScale: value,
                        },
                      },
                    })
                  );
                }}
              />
              <SwitchSetting
                label="Parallax"
                defaultChecked={
                  TestimonialsStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...TestimonialsStyle.designSettings!,
                        sectionBackground: {
                          ...TestimonialsStyle.designSettings.sectionBackground,
                          parallax: value,
                          blur: false,
                          blurEffect: "s",
                        },
                      },
                    })
                  );
                }}
              />
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
          testimonialStyle={TestimonialsStyle}
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
