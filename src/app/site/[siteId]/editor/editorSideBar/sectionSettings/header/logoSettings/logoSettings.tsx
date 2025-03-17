import BackBtn from "@/components/shared/backBtn";
import { closeLogoSettings, updateGlobalContent } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import React from "react";
import ToggleGroup from "../../settingsUi/toggleGroup";
import { HeaderContent } from "@/types/sectionsTypes/header";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import validator from "validator";
import LinkSelector from "../../settingsUi/LinkSelector";
import { Switch } from "@/components/ui/switch";

interface LogoSettingsProps {
  headerContent: HeaderContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function LogoSettings({
  headerContent,
  findSelectedSection,
}: LogoSettingsProps) {
  const dispatch = useAppDispatch();
  const { editor } = useAppSelector((state) => state.editor.present);

  return (
    <div>
      <BackBtn
        label="Logo"
        handleBack={() => {
          dispatch(closeLogoSettings());
        }}
      />
      <div className="px-5 space-y-2">
        <ToggleGroup
          label="Link Type"
          options={[
            { value: "internal", label: "Internal" },
            { value: "external", label: "External" },
          ]}
          value={headerContent.logo.linkType}
          onValueChange={(value) => {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                logo: { ...headerContent.logo, linkType: value },
              })
            );
          }}
        />

        {headerContent.logo.linkType === "internal" && (
          <LinkSelector
            label="Link"
            links={editor.pages.map((page) => ({
              id: page.pageId,
              link: page.pageSettings.link,
            }))}
            selectedLink={headerContent.logo.link}
            onSelect={(link) => {
              const findPageWithLink = editor.pages.find(
                (page) => page.pageSettings.link === link.slice(1)
              );
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  logo: {
                    ...headerContent.logo,
                    link: link,
                    pageId: findPageWithLink?.pageId || "",
                  },
                })
              );
            }}
          />
        )}

        {headerContent.logo.linkType === "external" && (
          <div className="flex items-center space-y-1 justify-between">
            <Label htmlFor="Link">Link</Label>
            <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              <div className="flex items-center">
                <Input
                  value={headerContent.logo.externalLink}
                  className="flex-1 border-none outline-none"
                  placeholder="Paste link"
                  onChange={(e) => {
                    dispatch(
                      updateGlobalContent(findSelectedSection.id, {
                        logo: {
                          ...headerContent.logo,
                          externalLink: e.target.value,
                        },
                      })
                    );
                  }}
                />
              </div>

              {validator.isURL(headerContent.logo.externalLink) && (
                <div className="flex h-10 items-center justify-between px-3 py-2">
                  <span>Open in new tab</span>
                  <Switch
                    defaultChecked={headerContent.logo.openNewTab}
                    checked={headerContent.logo.openNewTab}
                    onCheckedChange={(value) => {
                      dispatch(
                        updateGlobalContent(findSelectedSection.id, {
                          logo: {
                            ...headerContent.logo,
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
  );
}

export default LogoSettings;
