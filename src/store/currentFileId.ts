import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: string = "";

export const currentFileIdSlice = createSlice({
  name: "currentFileId",
  initialState,
  reducers: {
    select: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select } = currentFileIdSlice.actions;

export default currentFileIdSlice.reducer;

export const selectCurrentFileId = (state: RootState) => state.currentFileId;
