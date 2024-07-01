import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface OutputState {
  url: string;
  loading: boolean;
  size: number;
}

const initialState: OutputState = {
  url: "",
  loading: true,
  size: 0,
};

export const outputStateSlice = createSlice({
  name: "output-state",
  initialState,
  reducers: {
    startLoading: (state: OutputState) => {
      return {
        ...state,
        loading: true,
      };
    },
    setUrl: (state, action: PayloadAction<[string, number]>) => {
      return {
        ...state,
        url: action.payload[0],
        size: action.payload[1],
        loading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUrl, startLoading } = outputStateSlice.actions;

export default outputStateSlice.reducer;

export const selectOutputState = (state: RootState) => state.outputState;
