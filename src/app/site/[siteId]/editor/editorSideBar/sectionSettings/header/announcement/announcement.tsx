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
import AnnouncementPos from "../../settingsUi/AnnouncementPos";
import LinkSelector from "../../settingsUi/LinkSelector";
interface AnnouncementProps {
  pageId: string;
  setOpenAnnounceTab: React.Dispatch<React.SetStateAction<boolean>>;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function Announcement({
  pageId,
  findSelectedSection,
  setOpenAnnounceTab,
}: AnnouncementProps) {
  const headerContent = findSelectedSection.content as HeaderContent;
  const pages = useAppSelector((state) => state.editor.present.editor.pages);
  const dispatch = useAppDispatch();
  return (
    <div>
      <BackBtn
        label="Announcement"
        handleBack={() => setOpenAnnounceTab(false)}
      />
      <div className="px-5 h space-y-2">
        {headerContent.announcement.text.length ? (
          <AnnouncementPos
            positionValue={headerContent.announcement.position}
            onValueChange={(value) =>
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  ...headerContent,
                  announcement: {
                    ...headerContent.announcement,
                    position: value,
                  },
                })
              )
            }
          />
        ) : null}
        <div className="space-y-1 flex items-center justify-between">
          <Label>Text</Label>
          <Input
            className="w-4/6"
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

        <LinkSelector
          label="Link"
          links={pages.map((page) => ({
            id: page.pageId,
            link: page.pageSettings.link,
          }))}
          selectedLink={headerContent.announcement.link}
          onSelect={(link) =>
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                ...headerContent,
                announcement: {
                  ...headerContent.announcement,
                  link,
                },
              })
            )
          }
        />
      </div>
    </div>
  );
}

export default Announcement;
