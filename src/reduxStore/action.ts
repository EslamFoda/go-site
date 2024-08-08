import * as types from "./actionTypes";
import {
  DesignSettings,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "./types";

import { SelectedItemType } from "@/types/common";

export const updateSelectedSection = (selectedSectionId: string | null) => ({
  type: types.UPDATE_SELECTED_SECTION,
  payload: selectedSectionId,
});

export const updateSelectedItem = (item: SelectedItemType) => ({
  type: types.UPDATE_SELECTED_ITEM,
  payload: item,
});

export const updateContent = (
  sectionId: string,
  newContent: Partial<SectionContentTypes[keyof SectionContentTypes]>
) => ({
  type: types.UPDATE_CONTENT,
  payload: { sectionId, newContent },
});

export const updateStyle = (
  sectionId: string,
  newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
) => ({
  type: types.UPDATE_STYLE,
  payload: { sectionId, newStyle },
});

export const updateSelectedPallet = (pallet: string) => ({
  type: types.UPDATE_SELECTED_PALLET,
  payload: pallet,
});

export const togglePallet = () => ({
  type: types.TOGGLE_PALLET,
});

export const toggleSectionDesigns = () => ({
  type: types.TOGGLE_SECTION_DESIGNS,
});

export const toggleChooseIcon = () => ({
  type: types.TOGGLE_CHOOSE_ICON,
});

export const updateEditorSections = (
  sections: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
) => ({
  type: types.UPDATE_EDITOR_SECTIONS,
  payload: sections,
});

export const updateSectionIndex = (sectionIndex: number) => ({
  type: types.UPDATE_SECTION_INDEX,
  payload: sectionIndex,
});

export const openSectionDesigns = () => ({
  type: types.OPEN_SECTION_DESIGNS,
});

export const closeSectionDesigns = () => ({
  type: types.CLOSE_SECTION_DESIGNS,
});

export const openChooseIcon = () => ({
  type: types.OPEN_CHOOSE_ICON,
});

export const closeChooseIcon = () => ({
  type: types.CLOSE_CHOOSE_ICON,
});

export const openPallet = () => ({
  type: types.OPEN_PALLET,
});

export const closePallet = () => ({
  type: types.CLOSE_PALLET,
});

export const updateDesignSettings = (newSettings: DesignSettings) => ({
  type: types.UPDATE_DESIGN_SETTINGS,
  payload: newSettings,
});
