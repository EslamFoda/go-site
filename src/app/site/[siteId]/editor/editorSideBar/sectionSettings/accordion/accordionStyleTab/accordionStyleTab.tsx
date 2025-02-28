import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import Align from "../../settingsUi/Align";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import {
  AccordionContent,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion/accordion";
import AccordionIcon from "../../settingsUi/AccordionIcon";

interface AccordionStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  accordionContent: AccordionContent;
  accordionStyle: AccordionStyle;
  setSectionBgOpened: React.Dispatch<React.SetStateAction<boolean>>;
  pageId: string;
}
function AccordionStyleTab({
  findSelectedSection,
  accordionStyle,
  pageId,
  setSectionBgOpened,
}: AccordionStyleTabProps) {
  const dispatch = useAppDispatch();

  if (!accordionStyle) return null;

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <AccordionIcon
        iconValue={accordionStyle.designSettings.icon}
        onValueChange={(value) =>
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: { ...accordionStyle.designSettings, icon: value },
            })
          )
        }
      />

      <Align
        alignValue={accordionStyle.designSettings.align}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id!, {
              designSettings: {
                ...accordionStyle.designSettings!,
                align: value,
              },
            })
          );
        }}
      />

      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Left Title"
          defaultChecked={accordionStyle.designSettings.leftTitlePosition}
          onCheckedChange={(value) =>
            dispatch(
              updateStyle(pageId, findSelectedSection?.id!, {
                designSettings: {
                  ...accordionStyle.designSettings!,
                  leftTitlePosition: value,
                },
              })
            )
          }
        />

        {accordionStyle.designSettings.sectionBackground.color === "none" && (
          <>
            <SwitchSetting
              label="Background"
              defaultChecked={accordionStyle.designSettings.background}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      background: value,
                      border: !value, // Toggle border opposite to background
                    },
                  })
                );
              }}
            />
            <SwitchSetting
              label="Border"
              defaultChecked={accordionStyle.designSettings.border}
              onCheckedChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...accordionStyle.designSettings!,
                      border: value,
                      background: !value, // Toggle background opposite to border
                    },
                  })
                );
              }}
            />
          </>
        )}

        <div
          className="flex items-center cursor-pointer justify-between p-3"
          onClick={() => {
            setSectionBgOpened(true);
          }}
        >
          <Label>Section Background</Label>
          <ChevronRightIcon size={18} />
        </div>
      </div>
    </TabsContent>
  );
}

export default AccordionStyleTab;
