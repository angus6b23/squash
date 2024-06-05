import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BulkOptions {
  resize: {
    enabled: boolean;
    keepRatio: boolean;
    upscale: boolean;
    width: number | undefined;
    height: number | undefined;
    method: string;
  };
  rotate: {
    enabled: boolean;
    degree: 0 | 90 | 180 | 270;
  };
}

const initialState: BulkOptions = {
  resize: {
    enabled: false,
    keepRatio: true,
    upscale: false,
    width: undefined,
    height: undefined,
    method: "default",
  },
  rotate: {
    enabled: false,
    degree: 0,
  },
};

export const bulkOptionsSlice = createSlice({
  name: "bulkOptions",
  initialState,
  reducers: {
    handleResize: (state, action: PayloadAction<BulkOptions["resize"]>) => {
      return {
        ...state,
        resize: action.payload,
      };
    },
    handleRotate: (state, action: PayloadAction<BulkOptions["rotate"]>) => {
      return {
        ...state,
        rotate: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleResize, handleRotate } = bulkOptionsSlice.actions;

export default bulkOptionsSlice.reducer;

export const selectBulkOptions = (state: RootState) => state.bulkOptions;
