import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./reducer";
import { thunk } from "redux-thunk";
import undoable, { StateWithHistory } from "redux-undo";
import {
  CLOSE_CHOOSE_ICON,
  CLOSE_CHOOSE_IMAGE,
  CLOSE_PAGE_SETTING,
  OPEN_PAGES_TAB,
  CLOSE_PALLET,
  CLOSE_SECTION_DESIGNS,
  CLOSE_SIDEBAR,
  OPEN_CHOOSE_ICON,
  OPEN_CHOOSE_IMAGE,
  OPEN_PAGE_SETTING,
  OPEN_PALLET,
  OPEN_SECTION_DESIGNS,
  SET_DRAGGABLE_MODAL_NAME,
  SET_FLUID_CARD,
  TOGGLE_CHOOSE_ICON,
  TOGGLE_PALLET,
  TOGGLE_SECTION_DESIGNS,
  UPDATE_ACTIVE_PAGE,
  UPDATE_DESIGN_SETTINGS,
  UPDATE_EDITOR,
  UPDATE_IS_DRAGGABLE_MODAL,
  UPDATE_IS_DRAGGING,
  UPDATE_IS_DRAGGING_ITEM,
  UPDATE_PAGE_SETTING,
  UPDATE_SECTION_INDEX,
  UPDATE_SELECTED_ITEM,
  UPDATE_SELECTED_PAGE,
  UPDATE_SELECTED_PALLET,
  UPDATE_SELECTED_SECTION,
  UPDATE_SELECTED_SUB_LINK,
  CLOSE_PAGES_TAB,
  CLOSE_CHOOSE_BG_IMAGE,
  CLOSE_HEADER_OPTIONS,
  CLOSE_LOGO_SETTINGS,
  OPEN_CHOOSE_BG_IMAGE,
  OPEN_HEADER_OPTIONS,
  OPEN_LOGO_SETTINGS,
  TOGGLE_PREVIEW_MODE,
  ADD_NEW_PAGE,
  DELETE_PAGE,
  DUPLICATE_PAGE,
  UPDATE_EDITOR_SECTIONS,
  UPDATE_SITE_SETTINGS,
} from "./actionTypes";

const undoableReducer = undoable(editorReducer, {
  limit: 50,
  filter: (action, currentState, previousState) => {
    // Exclude actions for sections named 'Fluid'
    if (action.type === "UPDATE_CONTENT" || action.type === "UPDATE_STYLE") {
      const page = currentState.editor.pages.find((p) =>
        p.sections.some(
          (s) => s.id === action.payload.sectionId && s.sectionName === "Fluid"
        )
      );

      if (page) {
        return false; // Don't include in undo/redo history
      }
    }

    // Original excluded actions
    const excludedActionTypes = [
      UPDATE_SELECTED_SECTION,
      UPDATE_SELECTED_ITEM,
      UPDATE_SELECTED_PALLET,
      TOGGLE_PALLET,
      TOGGLE_SECTION_DESIGNS,
      TOGGLE_CHOOSE_ICON,
      OPEN_SECTION_DESIGNS,
      CLOSE_SECTION_DESIGNS,
      OPEN_CHOOSE_ICON,
      CLOSE_CHOOSE_ICON,
      OPEN_PALLET,
      CLOSE_PALLET,
      UPDATE_DESIGN_SETTINGS,
      UPDATE_ACTIVE_PAGE,
      OPEN_PAGES_TAB,
      CLOSE_PAGES_TAB,
      UPDATE_EDITOR,
      UPDATE_SECTION_INDEX,
      OPEN_PAGE_SETTING,
      CLOSE_PAGE_SETTING,
      UPDATE_PAGE_SETTING,
      UPDATE_SELECTED_SUB_LINK,
      CLOSE_SIDEBAR,
      UPDATE_SELECTED_PAGE,
      OPEN_CHOOSE_IMAGE,
      CLOSE_CHOOSE_IMAGE,
      UPDATE_IS_DRAGGING_ITEM,
      UPDATE_IS_DRAGGING,
      UPDATE_IS_DRAGGABLE_MODAL,
      SET_DRAGGABLE_MODAL_NAME,
      SET_FLUID_CARD,
      CLOSE_CHOOSE_BG_IMAGE,
      CLOSE_HEADER_OPTIONS,
      CLOSE_LOGO_SETTINGS,
      OPEN_CHOOSE_BG_IMAGE,
      OPEN_HEADER_OPTIONS,
      OPEN_LOGO_SETTINGS,
      TOGGLE_PREVIEW_MODE,
      ADD_NEW_PAGE,
      DELETE_PAGE,
      DUPLICATE_PAGE,
      // ... other existing excluded action types
    ];

    return !excludedActionTypes.includes(action.type);
  },
});

const store = configureStore({
  reducer: {
    editor: undoableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunk as any),
});

export type RootState = {
  editor: StateWithHistory<ReturnType<typeof editorReducer>>;
};

export type AppDispatch = typeof store.dispatch;

export default store;
