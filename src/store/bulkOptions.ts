import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AnyEncodeOption } from "@/utils/encodeImage";
import {
  defaultAvifOption,
  defaultJxlOption,
  defaultMozjpegOption,
  defaultOxipngOption,
  defaultQoiOption,
  defaultWebpOption,
} from "@/utils/defaultOptions";

enum resizeMethod {
  Triange,
  Catrom,
  Mitchell,
  Lancozs3,
  default,
}
export interface BulkOptions {
  resize: {
    enabled: boolean;
    keepRatio: boolean;
    upscale: boolean;
    width: number | undefined;
    height: number | undefined;
    method: resizeMethod;
  };
  rotate: {
    enabled: boolean;
    degree: 0 | 90 | 180 | 270;
  };
  output: {
    format: "avif" | "mozjpeg" | "qoi" | "oxipng" | "jpgxl" | "webp" | "auto";
    option: AnyEncodeOption;
  };
}

const initialState: BulkOptions = {
  resize: {
    enabled: false,
    keepRatio: true,
    upscale: false,
    width: undefined,
    height: undefined,
    method: 4,
  },
  rotate: {
    enabled: false,
    degree: 0,
  },
  output: {
    format: "auto",
    option: {},
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
    handleOutputFormat: (
      state,
      action: PayloadAction<BulkOptions["output"]["format"]>,
    ) => {
      switch (action.payload) {
        case "auto": {
          return {
            ...state,
            output: {
              format: "auto",
              option: {},
            },
          };
        }
        case "avif":
          return {
            ...state,
            output: {
              format: "avif",
              option: defaultAvifOption,
            },
          };
        case "mozjpeg":
          return {
            ...state,
            output: {
              format: "mozjpeg",
              option: defaultMozjpegOption,
            },
          };
        case "jpgxl":
          return {
            ...state,
            output: {
              format: "jpgxl",
              option: defaultJxlOption,
            },
          };
        case "oxipng":
          return {
            ...state,
            output: {
              format: "oxipng",
              option: defaultOxipngOption,
            },
          };
        case "webp":
          return {
            ...state,
            output: {
              format: "webp",
              option: defaultWebpOption,
            },
          };
        case "qoi":
          return {
            ...state,
            output: {
              format: "qoi",
              option: defaultQoiOption,
            },
          };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleResize, handleRotate } = bulkOptionsSlice.actions;

export default bulkOptionsSlice.reducer;

export const selectBulkOptions = (state: RootState) => state.bulkOptions;
