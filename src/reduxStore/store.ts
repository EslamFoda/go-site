// store.ts
import editorReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

// Define the root state type

// Define a type for thunk actions

// Create an array of middleware
// const middlewares: Middleware[] = [thunk];

// Create the store with the correct typing for middleware
const store = configureStore(
  {
    reducer: {
      editor: editorReducer,
    },
  }
  //   editorReducer,
  //   composeWithDevTools(applyMiddleware(...middlewares))
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
