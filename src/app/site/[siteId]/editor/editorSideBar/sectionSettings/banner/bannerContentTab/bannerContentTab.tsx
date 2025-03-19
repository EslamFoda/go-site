import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  openChooseImage,
  updateContent,
  updateStyle,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import React from "react";
import ToggleGroup from "../../settingsUi/toggleGroup";
import ImageSelector from "@/components/shared/imageSelector";
import NavigationItem from "@/components/shared/navigationItem";
import EditText from "../../settingsUi/EditText";

interface BannerContentTabProps {
  bannerContent: BannerContent;
  bannerStyle: BannerStyle;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFormTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function BannerContentTab({
  bannerContent,
  bannerStyle,
  findSelectedSection,
  pageId,
  setOpenButtonsTab,
  setOpenFormTab,
}: BannerContentTabProps) {
  const dispatch = useAppDispatch();

  if (!bannerContent) return null;

  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <EditText
        label="Label"
        placeholder="Add label"
        id="label"
        value={bannerContent.label}
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
        inputType="textArea"
        value={bannerContent.title}
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
        value={bannerContent.subtitle}
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
          { value: "image", label: "image" },
          { value: "video", label: "video" },
        ]}
        value={bannerContent?.mediaType}
        onValueChange={(value) => {
          dispatch(
            updateContent(pageId, findSelectedSection?.id!, {
              mediaType: value,
            })
          );
          if (value === "image") {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings,
                  showVideo: false,
                  imageSetting: {
                    ...bannerStyle.designSettings.imageSetting,
                    showImage: true,
                  },
                },
              })
            );
          }
          if (value === "video") {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings,
                  showVideo: true,
                  imageSetting: {
                    ...bannerStyle.designSettings.imageSetting,
                    showImage: false,
                  },
                },
              })
            );
          }
        }}
      />
      <div>
        {bannerContent?.mediaType === "image" && (
          <div className="space-y-2">
            <ImageSelector
              imageUrl={bannerContent.imageSetting?.imageUrl}
              onImageSelect={() => dispatch(openChooseImage())}
              onImageDelete={() =>
                dispatch(
                  updateContent(pageId, findSelectedSection?.id, {
                    imageSetting: { imageUrl: "", altText: "", id: "" },
                  })
                )
              }
              onBack={() => {}}
              showBackButton={false}
            />
            <div className="space-y-1 flex items-center justify-between">
              <Label>Alt Text</Label>
              <Input
                className="w-4/6"
                id="alt text"
                value={bannerContent?.imageSetting?.altText}
                placeholder="Describe the image"
                onChange={(e: any) => {
                  dispatch(
                    updateContent(pageId, findSelectedSection?.id, {
                      imageSetting: {
                        ...bannerContent?.imageSetting,
                        altText: e.target.value,
                      },
                    })
                  );
                }}
              />
            </div>
          </div>
        )}
        {bannerContent?.mediaType === "video" && (
          <div className="space-y-1 flex items-center justify-between">
            <Label>Video</Label>
            <Input
              className="w-4/6"
              id="Video"
              placeholder="Paste video url"
              value={bannerContent?.videoSetting?.videoUrl}
              onChange={(e: any) => {
                dispatch(
                  updateContent(pageId, findSelectedSection?.id!, {
                    videoSetting: {
                      ...bannerContent?.videoSetting,
                      videoUrl: e.target.value,
                    },
                  })
                );
              }}
            />
          </div>
        )}
      </div>
      <ToggleGroup
        label="Actions"
        options={[
          { value: "buttons", label: "buttons" },
          { value: "form", label: "form" },
        ]}
        value={bannerContent?.actionType}
        onValueChange={(value) => {
          dispatch(
            updateContent(pageId, findSelectedSection?.id!, {
              actionType: value,
            })
          );

          if (value === "buttons") {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings!,
                  showButtons: true,
                  showForm: false,
                },
              })
            );
          }

          if (value === "form") {
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...bannerStyle.designSettings!,
                  showForm: true,
                  showButtons: false,
                },
              })
            );
          }
        }}
      />
      {bannerContent?.actionType === "buttons" && (
        <NavigationItem
          label="Buttons"
          onClick={() => {
            setOpenButtonsTab(true);
          }}
        />
      )}
      {bannerContent?.actionType === "form" && (
        <NavigationItem
          label="Form"
          onClick={() => {
            setOpenFormTab(true);
          }}
        />
      )}
    </TabsContent>
  );
}

export default BannerContentTab;
