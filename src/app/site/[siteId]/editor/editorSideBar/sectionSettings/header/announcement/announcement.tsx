import BackBtn from "@/components/shared/backBtn";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { HeaderContent } from "@/types/sectionsTypes/header";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateGlobalContent } from "@/reduxStore/action";
import LinkSelector from "../../settingsUi/LinkSelector";
import ToggleGroup from "../../settingsUi/toggleGroup";
import validator from "validator";
import { Switch } from "@/components/ui/switch";

interface AnnouncementProps {
  setOpenAnnounceTab: React.Dispatch<React.SetStateAction<boolean>>;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function Announcement({
  findSelectedSection,
  setOpenAnnounceTab,
}: AnnouncementProps) {
  const headerContent = findSelectedSection.content as HeaderContent;
  const { editor } = useAppSelector((state) => state.editor.present);

  const dispatch = useAppDispatch();
  return (
    <div>
      <BackBtn
        label="Announcement"
        handleBack={() => setOpenAnnounceTab(false)}
      />
      <div className="px-5 h space-y-2">
        {headerContent.announcement.text.length ? (
          <ToggleGroup
            label="Position"
            options={[
              { value: "above", label: "Above" },
              { value: "below", label: "Below" },
            ]}
            value={headerContent.announcement.position}
            onValueChange={(value) => {
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  ...headerContent,
                  announcement: {
                    ...headerContent.announcement,
                    position: value,
                  },
                })
              );
            }}
          />
        ) : null}
        <div className="space-y-1 flex items-center justify-between">
          <Label>Text</Label>
          <Input
            className="w-4/6"
            placeholder="Announcement text"
            value={headerContent.announcement.text}
            onChange={(e: any) =>
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  ...headerContent,
                  announcement: {
                    ...headerContent.announcement,
                    text: e.target.value,
                  },
                })
              )
            }
          />
        </div>

        <div className="space-y-2">
          <ToggleGroup
            label="Link Type"
            options={[
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
            value={headerContent.announcement.linkType}
            onValueChange={(value) => {
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  announcement: {
                    ...headerContent.announcement,
                    linkType: value,
                  },
                })
              );
            }}
          />

          {headerContent.announcement.linkType === "internal" && (
            <LinkSelector
              label="Link"
              links={editor.pages.map((page) => ({
                id: page.pageId,
                link: page.pageSettings.link,
              }))}
              selectedLink={headerContent.announcement.link}
              onSelect={(link) => {
                const findPageWithLink = editor.pages.find(
                  (page) => page.pageSettings.link === link.slice(1)
                );
                dispatch(
                  updateGlobalContent(findSelectedSection.id, {
                    announcement: {
                      ...headerContent.announcement,
                      link: link,
                      pageId: findPageWithLink?.pageId || "",
                    },
                  })
                );
              }}
            />
          )}

          {headerContent.announcement.linkType === "external" && (
            <div className="flex items-center space-y-1 justify-between">
              <Label htmlFor="Link">Link</Label>
              <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
                <div className="flex items-center">
                  <Input
                    value={headerContent.announcement.externalLink}
                    className="flex-1 border-none outline-none"
                    placeholder="Paste link"
                    onChange={(e) => {
                      dispatch(
                        updateGlobalContent(findSelectedSection.id, {
                          announcement: {
                            ...headerContent.announcement,
                            externalLink: e.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>

                {validator.isURL(headerContent.announcement.externalLink) && (
                  <div className="flex h-10 items-center justify-between px-3 py-2">
                    <span>Open in new tab</span>
                    <Switch
                      defaultChecked={headerContent.announcement.openNewTab}
                      checked={headerContent.announcement.openNewTab}
                      onCheckedChange={(value) => {
                        dispatch(
                          updateGlobalContent(findSelectedSection.id, {
                            announcement: {
                              ...headerContent.announcement,
                              openNewTab: value,
                            },
                          })
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
