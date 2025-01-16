import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./reducer";
import { thunk } from "redux-thunk";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import {
  CLOSE_CHOOSE_ICON,
  CLOSE_CHOOSE_IMAGE,
  CLOSE_PAGE_SETTING,
  CLOSE_PAGE_SETTINGS,
  CLOSE_PALLET,
  CLOSE_SECTION_DESIGNS,
  CLOSE_SIDEBAR,
  OPEN_CHOOSE_ICON,
  OPEN_CHOOSE_IMAGE,
  OPEN_PAGE_SETTING,
  OPEN_PAGE_SETTINGS,
  OPEN_PALLET,
  OPEN_SECTION_DESIGNS,
  SET_DRAGGABLE_MODAL_NAME,
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
  UPDATE_SELECTED_ITEM,
  UPDATE_SELECTED_PAGE,
  UPDATE_SELECTED_PALLET,
  UPDATE_SELECTED_SECTION,
  UPDATE_SELECTED_SUB_LINK,
} from "./actionTypes";

// Create the undoable reducer
const undoableReducer = undoable(editorReducer, {
  limit: 50,
  filter: excludeAction([
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
    OPEN_PAGE_SETTINGS,
    CLOSE_PAGE_SETTINGS,
    UPDATE_EDITOR,
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
  ]),
  debug: true,
  syncFilter: true,
  neverSkipReducer: true,
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
