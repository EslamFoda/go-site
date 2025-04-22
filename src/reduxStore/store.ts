import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./reducer";
import { thunk } from "redux-thunk";
import undoable, { StateWithHistory } from "redux-undo";
import {
  UPDATE_STORAGE,
  ADD_NEW_PAGE,
  DELETE_PAGE,
  DUPLICATE_PAGE,
  UPDATE_CONTENT,
  UPDATE_EDITOR_SECTIONS,
  UPDATE_GLOBAL_CONTENT,
  UPDATE_GLOBAL_STYLE,
  UPDATE_SITE_SETTINGS,
  UPDATE_STYLE,
  COPY_SECTION,
} from "./actionTypes";

// Define the actions that should be tracked in undo/redo history
const trackableActions = [
  UPDATE_STORAGE,
  ADD_NEW_PAGE,
  DELETE_PAGE,
  DUPLICATE_PAGE,
  UPDATE_CONTENT,
  UPDATE_EDITOR_SECTIONS,
  UPDATE_GLOBAL_CONTENT,
  UPDATE_GLOBAL_STYLE,
  UPDATE_SITE_SETTINGS,
  UPDATE_STYLE,
] as const;

// Create a type for better type safety
type TrackableActionType = (typeof trackableActions)[number];

const undoableReducer = undoable(editorReducer, {
  limit: 50, // Maximum number of undo steps
  filter: (action, currentState): boolean => {
    // Type guard to ensure action.type is compatible
    const isTrackable = (
      actionType: string
    ): actionType is TrackableActionType =>
      trackableActions.includes(actionType as TrackableActionType);

    // Only include specified actions in history
    if (!isTrackable(action.type)) {
      return false;
    }

    // Additional filtering for Fluid sections
    if (action.type === UPDATE_CONTENT || action.type === UPDATE_STYLE) {
      const payload = action.payload as { sectionId?: string };
      if (payload.sectionId) {
        const hasFluidSection = currentState.editor.pages.some((page) =>
          page.sections.some(
            (section) =>
              section.id === payload.sectionId &&
              section.sectionName === "Fluid"
          )
        );
        return !hasFluidSection;
      }
    }

    return true;
  },
  groupBy: (action): string | null => {
    // Group rapid successive updates of the same type
    if (
      [UPDATE_CONTENT, UPDATE_STYLE].includes(
        action.type as TrackableActionType
      )
    ) {
      return `${action.type}_${Date.now()}`;
    }
    return null;
  },
  ignoreInitialState: true, // Don't record initial state as an undoable action
});

// Configure the store with better typing and middleware
const store = configureStore({
  reducer: {
    editor: undoableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-undo specific actions (using default types)
        ignoredActions: ["@@redux-undo/UNDO", "@@redux-undo/REDO"],
      },
    }).prepend(thunk),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Export types for better TypeScript integration
export type RootState = {
  editor: StateWithHistory<ReturnType<typeof editorReducer>>;
};

export type AppDispatch = typeof store.dispatch;

// Utility functions for undo/redo using default redux-undo action types
export const undo = () => store.dispatch({ type: "@@redux-undo/UNDO" });
export const redo = () => store.dispatch({ type: "@@redux-undo/REDO" });

export default store;
