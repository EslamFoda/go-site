import BackBtn from "@/components/shared/backBtn";
import { closeHeaderOptions, updateGlobalContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
import ToggleGroup from "../../settingsUi/toggleGroup";
import { HeaderContent } from "@/types/sectionsTypes/header";
import {
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  MenuIcon5,
} from "@/icons/common";

import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import EditText from "../../settingsUi/EditText";
interface OptionsProps {
  headerContent: HeaderContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function Options({ headerContent, findSelectedSection }: OptionsProps) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <BackBtn
        label="Options"
        doneBtn
        handleBack={() => {
          dispatch(closeHeaderOptions());
        }}
      />
      <div className="px-5 h space-y-2">
        <ToggleGroup
          label="Display"
          options={[
            { value: "icon", label: "Icon" },
            { value: "text", label: "Text" },
          ]}
          value={headerContent.options.iconType}
          onValueChange={(value) => {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                ...headerContent,
                options: {
                  ...headerContent.options,
                  iconType: value,
                },
              })
            );
          }}
        />
        {headerContent.options.iconType === "icon" && (
          <ToggleGroup
            label="Display"
            options={[
              { value: "icon-1", label: <MenuIcon1 /> },
              { value: "icon-2", label: <MenuIcon2 /> },
              { value: "icon-3", label: <MenuIcon3 /> },
              { value: "icon-4", label: <MenuIcon4 /> },
              { value: "icon-5", label: <MenuIcon5 /> },
            ]}
            value={headerContent.options.menuIcon}
            onValueChange={(value) => {
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  ...headerContent,
                  options: {
                    ...headerContent.options,
                    menuIcon: value,
                  },
                })
              );
            }}
          />
        )}
        {headerContent.options.iconType === "text" && (
          <>
            <EditText
              id="Menu"
              label="Menu"
              value={headerContent.options.openMenuText}
              key="openMenuText"
              placeholder="Menu text"
              handleUpdate={(e: any) => {
                dispatch(
                  updateGlobalContent(findSelectedSection.id, {
                    ...headerContent,
                    options: {
                      ...headerContent.options,
                      openMenuText: e.target.value,
                    },
                  })
                );
              }}
            />
            <EditText
              id="Close Menu"
              label="Close Menu"
              value={headerContent.options.closeMenuText}
              key="closeMenuText"
              placeholder="Close Menu text"
              handleUpdate={(e: any) => {
                dispatch(
                  updateGlobalContent(findSelectedSection.id, {
                    ...headerContent,
                    options: {
                      ...headerContent.options,
                      closeMenuText: e.target.value,
                    },
                  })
                );
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Options;
