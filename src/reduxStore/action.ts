import { SubLink } from "@/types/sectionsTypes/header";
import * as types from "./actionTypes";
import {
  DesignSettings,
  EditorPage,
  EditorSection,
  PageSettings,
  SectionContentTypes,
  SectionStyleTypes,
} from "./types";

import { CardData, DroppingItemType, SelectedItemType } from "@/types/common";

// Update selected section
export const updateSelectedSection = (
  pageId: string,
  sectionId: string | null
) => ({
  type: types.UPDATE_SELECTED_SECTION,
  payload: { pageId, sectionId },
});

// Update selected item
export const updateSelectedItem = (item: SelectedItemType) => ({
  type: types.UPDATE_SELECTED_ITEM,
  payload: item,
});

export const updateSelectedSubLink = (item: SelectedItemType) => ({
  type: types.UPDATE_SELECTED_SUB_LINK,
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

export const openPageSettings = () => ({
  type: types.OPEN_PAGE_SETTINGS,
});

export const closePageSettings = () => ({
  type: types.CLOSE_PAGE_SETTINGS,
});

export const addNewPage = (page: EditorPage) => ({
  type: types.ADD_NEW_PAGE,
  payload: page,
});

export const deletePage = (pageId: string) => ({
  type: types.DELETE_PAGE,
  payload: pageId,
});

export const updateEditorState = (path: string[], value: any) => ({
  type: types.UPDATE_EDITOR,
  payload: { path, value },
});

export const openPageSetting = () => ({
  type: types.OPEN_PAGE_SETTING,
});

export const closePageSetting = () => ({
  type: types.CLOSE_PAGE_SETTING,
});

export const updatePageSetting = (
  pageId: string | string[],
  newSettings: PageSettings
) => ({
  type: types.UPDATE_PAGE_SETTING,
  payload: { pageId, newSettings },
});

export const closeSideBar = () => ({
  type: types.CLOSE_SIDEBAR,
});

export const updateSelectedPage = (
  pageId: string | string[],
  newSections: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >[]
) => ({
  type: types.UPDATE_SELECTED_PAGE,
  payload: { pageId, newSections },
});

export const openChooseImage = () => ({
  type: types.OPEN_CHOOSE_IMAGE,
});

export const closeChooseImage = () => ({
  type: types.CLOSE_CHOOSE_IMAGE,
});

export const updateIsDraggingItem = (item: CardData | null) => ({
  type: types.UPDATE_IS_DRAGGING_ITEM,
  payload: item,
});
export const updateIsDragging = (isDragging: boolean) => ({
  type: types.UPDATE_IS_DRAGGING,
  payload: isDragging,
});

export const updateIsDraggableModal = (isDraggable: boolean) => ({
  type: types.UPDATE_IS_DRAGGABLE_MODAL,
  payload: isDraggable,
});
