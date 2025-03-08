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
import { updateGlobalContent, updateContent } from "@/reduxStore/action";
import { FooterContent } from "@/types/sectionsTypes/footer";
import { BannerContent } from "@/types/sectionsTypes/banner";

type SectionType = "header" | "footer" | "banner";

interface ButtonsProps {
  content: HeaderContent | FooterContent | BannerContent;
  setOpenButtonsTab: React.Dispatch<React.SetStateAction<boolean>>;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  type: SectionType;
  pageId: string;
}

function Buttons({
  content,
  findSelectedSection,
  type,
  pageId,
  setOpenButtonsTab,
}: ButtonsProps) {
  const pages = useAppSelector((state) => state.editor.present.editor.pages);
  const { editor } = useAppSelector((state) => state.editor.present);

  const dispatch = useAppDispatch();

  const handleLinkSelect = (index: number, link: string) => {
    const findPageWithLink = editor.pages.find(
      (page) => page.pageSettings.link === link.slice(1)
    );

    const updatedButtons = content.buttons.map((button, i) =>
      i === index
        ? { ...button, link, pageId: findPageWithLink?.pageId || "" }
        : button
    );

    const updatedContent = {
      ...content,
      buttons: updatedButtons,
    };

    if (type === "banner") {
      dispatch(updateContent(pageId, findSelectedSection.id, updatedContent));
    } else {
      dispatch(updateGlobalContent(findSelectedSection.id, updatedContent));
    }
  };

  const handleTextChange = (index: number, text: string) => {
    const updatedButtons = content.buttons.map((button, i) =>
      i === index ? { ...button, text } : button
    );

    const updatedContent = {
      ...content,
      buttons: updatedButtons,
    };

    if (type === "banner") {
      dispatch(updateContent(pageId,findSelectedSection.id, updatedContent));
    } else {
      dispatch(updateGlobalContent(findSelectedSection.id, updatedContent));
    }
  };

  return (
    <div>
      <BackBtn label="Buttons" handleBack={() => setOpenButtonsTab(false)} />
      <div className="px-5 space-y-3">
        {content.buttons.map((button, index) => (
          <div
            key={index}
            className="space-y-1 flex items-center justify-between"
          >
            <Label>{`Button ${index + 1}`}</Label>
            <div className="w-4/6 space-y-2">
              <Input
                value={button.text}
                placeholder="Button text"
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
