import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import SwitchSetting from "../sectionSettings/settingsUi/SwitchSetting";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { useParams } from "next/navigation";
import { EditorPage } from "@/reduxStore/types";
import { updatePageSetting } from "@/reduxStore/action";

function PageSetting() {
  const dispatch = useAppDispatch();
  const { pageId } = useParams();
  const pages = useAppSelector((state) => state.editor.present.editor.pages);
  const { settings } = useAppSelector((state) => state.editor.present);
  const { homePage } = settings;
  const isHomePage = pageId === homePage;
  const findActivePage =
    pages.find((page) => page.pageId === pageId) ||
    pages.find((page) => page.pageId === homePage);
  const { pageSettings } = findActivePage as EditorPage;

  const [linkValue, setLinkValue] = useState(pageSettings?.link || "");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    setLinkValue(pageSettings?.link || "");
    if (!isHomePage && !pageSettings?.link?.trim()) {
      setLinkError("Please enter a value for the link");
    } else {
      setLinkError("");
    }
  }, [pageSettings?.link, isHomePage]);

  const checkLinkExists = (link: string) => {
    return pages.some(
      (page) => page.pageSettings.link === link && page.pageId !== pageId
    );
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setLinkValue(newLink);

    if (!newLink.trim()) {
      setLinkError("Please enter a value for the link");
    } else if (checkLinkExists(newLink)) {
      setLinkError("This link is already in use");
    } else {
      setLinkError("");
      dispatch(
        updatePageSetting(pageId, {
          ...pageSettings,
          link: newLink,
        })
      );
    }
  };

  return (
    <div className="px-5 space-y-2 py-5">
      <div className="space-y-1 flex items-center justify-between">
        <Label htmlFor="title">Title</Label>
        <Input
          className="w-4/6"
          id="title"
          placeholder="Add title"
          value={pageSettings?.title}
          onChange={(e: any) => {
            dispatch(
              updatePageSetting(pageId || homePage, {
                ...pageSettings,
                title: e.target.value,
              })
            );
          }}
        />
      </div>
      {!isHomePage && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="link">Link</Label>
            <div className="w-4/6">
              <Input
                placeholder="Add link"
                id="link"
                value={linkValue}
                onChange={handleLinkChange}
              />
              {linkError && (
                <div className="flex items-center justify-start w-full">
                  <p className="text-red-500 text-sm mt-1">{linkError}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Show Header"
          defaultChecked={pageSettings?.showHeader}
          onCheckedChange={(value) => {
            console.log(homePage, "pageSettings");
            dispatch(
              updatePageSetting(pageId || homePage, {
                ...pageSettings,
                showHeader: value,
              })
            );
          }}
        />
        <SwitchSetting
          label="Show Footer"
          defaultChecked={pageSettings?.showFooter}
          onCheckedChange={(value) => {
            dispatch(
              updatePageSetting(pageId || homePage, {
                ...pageSettings,
                showFooter: value,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default PageSetting;
