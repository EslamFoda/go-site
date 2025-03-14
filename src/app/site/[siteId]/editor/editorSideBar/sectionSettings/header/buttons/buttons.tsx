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
import ToggleGroup from "../../settingsUi/toggleGroup";
import { Switch } from "@/components/ui/switch";
import validator from "validator";

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
      dispatch(updateContent(pageId, findSelectedSection.id, updatedContent));
    } else {
      dispatch(updateGlobalContent(findSelectedSection.id, updatedContent));
    }
  };

  const handleLinkTypeChange = (
    index: number,
    linkType: "internal" | "external"
  ) => {
    const updatedButtons = content.buttons.map((button, i) =>
      i === index ? { ...button, linkType } : button
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

  const handleExternalLinkChange = (index: number, link: string) => {
    const updatedButtons = content.buttons.map((button, i) =>
      i === index ? { ...button, externalLink: link } : button
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

  const handleOpenNewTab = (index: number, openNewTab: boolean) => {
    const updatedButtons = content.buttons.map((button, i) =>
      i === index ? { ...button, openNewTab } : button
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
              <ToggleGroup
                toggleClassName="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-full"
                options={[
                  { value: "internal", label: "Internal" },
                  { value: "external", label: "External" },
                ]}
                value={button.linkType}
                onValueChange={(value) => {
                  handleLinkTypeChange(index, value);
                }}
              />
              {button.linkType === "internal" && (
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
              )}
              {button.linkType === "external" && (
                <div className="flex items-center justify-between">
                  <div className="w-full border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
                    <Input
                      className="border-none"
                      value={button.externalLink}
                      placeholder="Paste link here"
                      onChange={(e) =>
                        handleExternalLinkChange(index, e.target.value)
                      }
                    />
                    {validator.isURL(button.externalLink) && (
                      <div className="flex h-10 items-center justify-between px-3 py-2">
                        <span>Open in new tab</span>
                        <Switch
                          defaultChecked={button.openNewTab}
                          checked={button.openNewTab}
                          onCheckedChange={(value) => {
                            handleOpenNewTab(index, value);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buttons;
