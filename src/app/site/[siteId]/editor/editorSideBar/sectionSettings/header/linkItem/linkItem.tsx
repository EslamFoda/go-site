import { Label } from "@/components/ui/label";
import { HeaderContent, Link, SubLink } from "@/types/sectionsTypes/header";
import React from "react";
import EditText from "../../settingsUi/EditText";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import LinkSelector from "../../settingsUi/LinkSelector";
import DraggableList from "@/components/ui/DraggableList";
import {
  updateGlobalContent,
  updateSelectedSubLink,
} from "@/reduxStore/action";
import { v4 } from "uuid";
import ToggleGroup from "../../settingsUi/toggleGroup";
import { Input } from "@/components/ui/input";
import validator from "validator";
import { Switch } from "@/components/ui/switch";
import ItemBackBtn from "@/components/shared/itemBackBtn";

interface LinkItemProps {
  selectedLinkId: string;
  pageId: string;
  handleDeleteLink: () => void;
  clearLinkItem: () => void;
  sectionId: string;
}

function LinkItem({
  selectedLinkId,
  pageId,
  sectionId,
  handleDeleteLink,
  clearLinkItem,
}: LinkItemProps) {
  const dispatch = useAppDispatch();
  const { editor, globalSections } = useAppSelector(
    (state) => state.editor.present
  );
  const section = globalSections.find((section) => section.id === sectionId);
  const headerContent = section?.content as HeaderContent;
  const selectedLink = headerContent?.links.find(
    (link) => link.id === selectedLinkId
  );

  if (!selectedLink) return null;

  const handleAddSubLink = () => {
    const newSubLink: SubLink = {
      id: v4(),
      link: "",
      text: `Sub Link ${(selectedLink.subLinks?.length || 0) + 1}`,
      pageId: "",
      externalLink: "",
      linkType: "internal",
      openNewTab: false,
    };

    const updatedLinks = headerContent.links.map((link) =>
      link.id === selectedLinkId
        ? { ...link, subLinks: [...(link.subLinks || []), newSubLink] }
        : link
    );

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedLinks = headerContent.links.map((link) => {
      if (link.id === selectedLinkId) {
        const reorderedSubLinks = Array.from(link.subLinks || []);
        const [movedItem] = reorderedSubLinks.splice(result.source.index, 1);
        reorderedSubLinks.splice(result.destination.index, 0, movedItem);

        return { ...link, subLinks: reorderedSubLinks };
      }
      return link;
    });

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  const handleUpdateLinkItem = (updates: Partial<Link>) => {
    const updatedLinks = headerContent.links.map((link) =>
      link.id === selectedLinkId ? { ...link, ...updates } : link
    );

    dispatch(updateGlobalContent(sectionId, { links: updatedLinks }));
  };

  return (
    <div className="space-y-2">
      <ItemBackBtn
        title={selectedLink.text}
        handleBack={clearLinkItem}
        handleDelete={handleDeleteLink}
      />
      <div className="px-5 space-y-2">
        <EditText
          label="Text"
          placeholder="Add menu text"
          id={selectedLink.id}
          value={selectedLink.text}
          handleUpdate={(e: any) =>
            handleUpdateLinkItem({ text: e.target.value })
          }
        />

        <ToggleGroup
          label="Link Type"
          options={[
            { value: "internal", label: "Internal" },
            { value: "external", label: "External" },
          ]}
          value={selectedLink.linkType}
          onValueChange={(value) => {
            handleUpdateLinkItem({ linkType: value });
          }}
        />
        {selectedLink.linkType === "internal" && (
          <LinkSelector
            label="Link"
            links={editor.pages.map((page) => ({
              id: page.pageId,
              link: page.pageSettings.link,
            }))}
            selectedLink={selectedLink.link}
            onSelect={(link) => {
              const findPageWithLink = editor.pages.find(
                (page) => page.pageSettings.link === link.slice(1)
              );
              handleUpdateLinkItem({
                link: link,
                pageId: findPageWithLink?.pageId || "",
              });
            }}
          />
        )}

        {selectedLink.linkType === "external" && (
          <div className="flex items-center space-y-1 justify-between">
            <Label htmlFor="Link">Link</Label>
            <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              <div className="flex items-center">
                <Input
                  value={selectedLink.externalLink}
                  className="flex-1 border-none outline-none"
                  placeholder="Paste link"
                  onChange={(e) => {
                    handleUpdateLinkItem({ externalLink: e.target.value });
                  }}
                />
              </div>

              {validator.isURL(selectedLink.externalLink) && (
                <div className="flex h-10 items-center justify-between px-3 py-2">
                  <span>Open in new tab</span>
                  <Switch
                    defaultChecked={selectedLink.openNewTab}
                    checked={selectedLink.openNewTab}
                    onCheckedChange={(value) => {
                      handleUpdateLinkItem({ openNewTab: value });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <DraggableList
          label="Dropdown Link"
          maxItems={10}
          handleDragEnd={handleDragEnd}
          items={selectedLink.subLinks || []}
          handleAdd={handleAddSubLink}
          updateSelectedItem={updateSelectedSubLink}
        />
      </div>
    </div>
  );
}

export default LinkItem;
