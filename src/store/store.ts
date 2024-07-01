import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/counter";
import fileReducer from "@/store/file";
import currentFileReducer from "@/store/currentFileId";
import bulkOptionsReducer from "@/store/bulkOptions";
import outputStateReducer from "@/store/outputState";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    files: fileReducer,
    currentFileId: currentFileReducer,
    bulkOptions: bulkOptionsReducer,
    outputState: outputStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
