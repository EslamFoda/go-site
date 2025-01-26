import BackBtn from "@/components/shared/backBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import LinkSelector from "../../settingsUi/LinkSelector";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { HeaderContent } from "@/types/sectionsTypes/header";
import { updateContent } from "@/reduxStore/action";

interface ButtonsProps {
  pageId: string;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}

function Buttons({
  pageId,
  findSelectedSection,
  setOpenButtonsTab,
}: ButtonsProps) {
  const pages = useAppSelector((state) => state.editor.present.editor.pages);
  const headerContent = findSelectedSection.content as HeaderContent;
  const dispatch = useAppDispatch();

  const handleLinkSelect = (index: number, link: string) => {
    const updatedButtons = headerContent.buttons.map((button, i) =>
      i === index ? { ...button, link } : button
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        ...headerContent,
        buttons: updatedButtons,
      })
    );
  };

  const handleTextChange = (index: number, text: string) => {
    const updatedButtons = headerContent.buttons.map((button, i) =>
      i === index ? { ...button, text } : button
    );

    dispatch(
      updateContent(pageId, findSelectedSection.id, {
        ...headerContent,
        buttons: updatedButtons,
      })
    );
  };

  return (
    <div>
      <BackBtn label="Buttons" handleBack={() => setOpenButtonsTab(false)} />
      <div className="px-5 space-y-6">
        {headerContent.buttons.map((button, index) => (
          <div
            key={index}
            className="space-y-1 flex items-center justify-between"
          >
            <Label>{`Button ${index + 1}`}</Label>
            <div className="w-4/6 space-y-2">
              <Input
                value={button.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
              <LinkSelector
                fullWidth
                noLabel
                links={pages.map((page) => ({
                  id: page.pageId,
                  link: page.pageSettings.link,
                }))}
                selectedLink={button.link}
                onSelect={(link) => handleLinkSelect(index, link)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buttons;
