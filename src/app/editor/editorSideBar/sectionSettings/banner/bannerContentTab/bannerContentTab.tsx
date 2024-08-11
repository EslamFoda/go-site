import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { BannerContent } from "@/types/sectionsTypes/banner";
import React from "react";

interface BannerContentTabProps {
  bannerContent: BannerContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  pageId: string;
}
function BannerContentTab({
  bannerContent,
  findSelectedSection,
  pageId,
}: BannerContentTabProps) {
  const dispatch = useAppDispatch();
  return (
    <TabsContent className="px-5 h space-y-2" value="content">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="label">label</Label>
        <Input
          id="label"
          className="w-4/6"
          value={bannerContent?.label}
          onChange={(e: any) => {
            // @ts-ignore
            dispatch(
              updateContent(pageId, findSelectedSection.id, {
                label: e.target.value,
              })
            );
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
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                title: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="subtitle">subtitle</Label>
        <Textarea
          className="w-4/6 h-28"
          id={findSelectedSection?.id + "subtitle"}
          value={bannerContent?.subtitle}
          onChange={(e: any) => {
            dispatch(
              updateContent(pageId, findSelectedSection?.id!, {
                subtitle: e.target.value,
              })
            );
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
              dispatch(
                updateContent(pageId, findSelectedSection?.id!, {
                  mediaType: "image",
                })
              );
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
              dispatch(
                updateContent(pageId, findSelectedSection?.id!, {
                  mediaType: "video",
                })
              );
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
        ) : (
          <div className="space-y-1 flex items-center justify-between">
            <Label>Video</Label>
            <Input
              className="w-4/6"
              id="Video"
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
    </TabsContent>
  );
}

export default BannerContentTab;
