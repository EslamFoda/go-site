import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useEditor, {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/store/editorStore";
import { BannerContent } from "@/types/sectionsTypes/banner";
import React from "react";

interface BannerContentTabProps {
  bannerContent: BannerContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function BannerContentTab({
  bannerContent,
  findSelectedSection,
}: BannerContentTabProps) {
  const { updateContent } = useEditor();
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={bannerContent?.label}
          onChange={(e: any) => {
            console.log(e.target.value);
            // @ts-ignore
            updateContent(findSelectedSection.id, {
              label: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="title">title</Label>
        <Input
          className="w-4/6"
          id="title"
          value={bannerContent?.title}
          onChange={(e: any) => {
            updateContent(findSelectedSection?.id!, {
              title: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="subtitle">subtitle</Label>
        <Textarea
          className="w-4/6 h-28"
          id="subtitle"
          value={bannerContent?.subtitle}
          onChange={(e: any) => {
            updateContent(findSelectedSection?.id!, {
              subtitle: e.target.value,
            });
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label>Type</Label>
        <div className="grid  q grid-cols-2 items-center w-4/6">
          <Button
            variant={
              bannerContent?.mediaType === "image" ? "outline" : "secondary"
            }
            onClick={() => {
              updateContent(findSelectedSection?.id!, {
                mediaType: "image",
              });
            }}
            className=" hover:!bg-transparent w-full "
          >
            image
          </Button>
          <Button
            variant={
              bannerContent?.mediaType === "video" ? "outline" : "secondary"
            }
            onClick={() => {
              updateContent(findSelectedSection?.id!, {
                mediaType: "video",
              });
            }}
            className=" hover:!bg-transparent w-full"
          >
            video
          </Button>
        </div>
      </div>
      <div>
        {bannerContent?.mediaType === "image" ? (
          <div className="space-y-1 flex items-center justify-between">
            <Label>Alt Text</Label>
            <Input
              className="w-4/6"
              id="alt text"
              value={bannerContent?.imageSetting?.altText}
              onChange={(e: any) => {
                updateContent(findSelectedSection?.id, {
                  imageSetting: {
                    ...bannerContent?.imageSetting,
                    altText: e.target.value,
                  },
                });
              }}
            />
          </div>
        ) : (
          <div className="space-y-1 flex items-center justify-between">
            <Label>Video</Label>
            <Input
              className="w-4/6"
              id="Video"
              value={bannerContent?.videoSetting?.videoUrl}
              onChange={(e: any) => {
                updateContent(findSelectedSection?.id!, {
                  videoSetting: {
                    ...bannerContent?.videoSetting,
                    videoUrl: e.target.value,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </TabsContent>
  );
}

export default BannerContentTab;
