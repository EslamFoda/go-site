import * as types from "./actionTypes";
import {
  DesignSettings,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "./types";

import { SelectedItemType } from "@/types/common";

// Update selected section
export const updateSelectedSection = (
  pageId: string,
  selectedSectionId: string | null
) => ({
  type: types.UPDATE_SELECTED_SECTION,
  payload: { pageId, selectedSectionId },
});

// Update selected item
export const updateSelectedItem = (item: SelectedItemType) => ({
  type: types.UPDATE_SELECTED_ITEM,
  payload: item,
});

// Update section content
export const updateContent = (
  pageId: string,
  sectionId: string,
  newContent: Partial<SectionContentTypes[keyof SectionContentTypes]>
) => ({
  type: types.UPDATE_CONTENT,
  payload: { pageId, sectionId, newContent },
});

// Update section style
export const updateStyle = (
  pageId: string,
  sectionId: string,
  newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
) => ({
  type: types.UPDATE_STYLE,
  payload: { pageId, sectionId, newStyle },
});

// Update selected pallet
export const updateSelectedPallet = (pallet: string) => ({
  type: types.UPDATE_SELECTED_PALLET,
  payload: pallet,
});

// Toggle pallet visibility
export const togglePallet = () => ({
  type: types.TOGGLE_PALLET,
});

// Toggle section designs visibility
export const toggleSectionDesigns = () => ({
  type: types.TOGGLE_SECTION_DESIGNS,
});

// Toggle choose icon visibility
export const toggleChooseIcon = () => ({
  type: types.TOGGLE_CHOOSE_ICON,
});

// Update editor sections
export const updateEditorSections = (
  pageId: string,
  sections: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
) => ({
  type: types.UPDATE_EDITOR_SECTIONS,
  payload: { pageId, sections },
});

// Update section index
export const updateSectionIndex = (sectionIndex: number) => ({
  type: types.UPDATE_SECTION_INDEX,
  payload: sectionIndex,
});

// Open section designs
export const openSectionDesigns = () => ({
  type: types.OPEN_SECTION_DESIGNS,
});

// Close section designs
export const closeSectionDesigns = () => ({
  type: types.CLOSE_SECTION_DESIGNS,
});

// Open choose icon
export const openChooseIcon = () => ({
  type: types.OPEN_CHOOSE_ICON,
});

// Close choose icon
export const closeChooseIcon = () => ({
  type: types.CLOSE_CHOOSE_ICON,
});

// Open pallet
export const openPallet = () => ({
  type: types.OPEN_PALLET,
});

// Close pallet
export const closePallet = () => ({
  type: types.CLOSE_PALLET,
});

// Update design settings
export const updateDesignSettings = (newSettings: DesignSettings) => ({
  type: types.UPDATE_DESIGN_SETTINGS,
  payload: newSettings,
});

export const updateActivePage = (pageId: string) => ({
  type: types.UPDATE_ACTIVE_PAGE,
  payload: pageId,
});
