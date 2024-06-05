import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { nanoid } from "nanoid";

export interface File {
  id: string;
  name: string;
  url: string;
}

export interface UploadedFile {
  name: string;
  blob: Blob;
}

const initialState: File[] = [];

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state: File[], action: PayloadAction<UploadedFile>) => {
      const url = URL.createObjectURL(action.payload.blob);
      return [...state, { name: action.payload.name, id: nanoid(5), url: url }];
    },
    removeFile: (state, action: PayloadAction<string>) => {
      return state.filter((file) => file.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, removeFile } = fileSlice.actions;

export default fileSlice.reducer;

export const selectFiles = (state: RootState) => state.files;
