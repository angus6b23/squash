import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { nanoid } from "nanoid";

export interface File {
  id: string;
  name: string;
  url: string;
  previewClicked: boolean;
  size: number;
  optimizeResult?: {
    avif?: number | undefined;
    mozjpeg?: number | undefined;
    webp?: number | undefined;
    oxipng?: number | undefined;
    qoi?: number | undefined;
    jxl?: number | undefined;
  };
}

export interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

export interface OptimizeResult {
  id: string;
  format: keyof File["optimizeResult"];
  size: number;
}

const initialState: File[] = [];

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state: File[], action: PayloadAction<UploadedFile>) => {
      return [
        ...state,
        {
          ...action.payload,
          id: nanoid(5),
          previewClicked: false,
        },
      ];
    },
    removeFile: (state, action: PayloadAction<string>) => {
      return state.filter((file) => file.id !== action.payload);
    },
    addOptimizeSize: (state, action: PayloadAction<OptimizeResult>) => {
      return state.map((file) => {
        if (file.id === action.payload.id) {
          return {
            ...file,
            optimizeResult: {
              ...file.optimizeResult,
              [action.payload.format]: action.payload.size,
            },
          };
        } else {
          return file;
        }
      });
    },
    handlePreviewClicked: (state, action: PayloadAction<string>) => {
      return state.map((file) => {
        if (file.id === action.payload) {
          return {
            ...file,
            previewClicked: true,
          };
        } else {
          return file;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, removeFile, addOptimizeSize, handlePreviewClicked } =
  fileSlice.actions;

export default fileSlice.reducer;

export const selectFiles = (state: RootState) => state.files;
