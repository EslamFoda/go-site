import { Label } from "@/components/ui/label";
import { SubLink as SubLinkType } from "@/types/sectionsTypes/header";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";
import ToggleGroup from "../../settingsUi/toggleGroup";
import { Switch } from "@/components/ui/switch";
import validator from "validator";
import { Input } from "@/components/ui/input";
import ItemBackBtn from "@/components/shared/itemBackBtn";

interface SubLinkProps {
  selectedSubLink: SubLinkType;
  handleDeleteSubLink: () => void;
  clearSubLinkItem: () => void;
  handleUpdateSubLinkItem: (updates: Partial<SubLinkType>) => void;
}

function SubLink({
  selectedSubLink,
  handleDeleteSubLink,
  clearSubLinkItem,
  handleUpdateSubLinkItem,
}: SubLinkProps) {
  const {
    editor: { pages },
  } = useAppSelector((state) => state.editor.present);

  return (
    <div className="space-y-2">
      <ItemBackBtn
        title={selectedSubLink.text}
        handleBack={clearSubLinkItem}
        handleDelete={handleDeleteSubLink}
      />
      <div className="px-5 space-y-2">
        <EditText
          label="Text"
          placeholder="Add link text"
          id={selectedSubLink.id}
          value={selectedSubLink.text}
          handleUpdate={(e: any) =>
            handleUpdateSubLinkItem({ text: e.target.value })
          }
        />
        <ToggleGroup
          label="Link Type"
          options={[
            { value: "internal", label: "Internal" },
            { value: "external", label: "External" },
          ]}
          value={selectedSubLink.linkType}
          onValueChange={(value) => {
            handleUpdateSubLinkItem({ linkType: value });
          }}
        />
        {selectedSubLink.linkType === "internal" && (
          <LinkSelector
            label="Link"
            links={pages.map((page) => ({
              id: page.pageId,
              link: page.pageSettings.link,
            }))}
            selectedLink={selectedSubLink.link}
            onSelect={(link) => {
              const findPageWithLink = pages.find(
                (page) => page.pageSettings.link === link.slice(1)
              );
              handleUpdateSubLinkItem({
                link: link,
                pageId: findPageWithLink?.pageId || "",
              });
            }}
          />
        )}

        {selectedSubLink.linkType === "external" && (
          <div className="flex items-center justify-between">
            <Label htmlFor="Link">Link</Label>
            <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              <div className="flex items-center">
                <Input
                  value={selectedSubLink.externalLink}
                  className="flex-1 border-none outline-none"
                  placeholder="Paste link"
                  onChange={(e) => {
                    handleUpdateSubLinkItem({ externalLink: e.target.value });
                  }}
                />
              </div>

              {validator.isURL(selectedSubLink.externalLink) && (
                <div className="flex h-10 items-center justify-between px-3 py-2">
                  <span>Open in new tab</span>
                  <Switch
                    defaultChecked={selectedSubLink.openNewTab}
                    checked={selectedSubLink.openNewTab}
                    onCheckedChange={(value) => {
                      handleUpdateSubLinkItem({ openNewTab: value });
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

export default SubLink;
