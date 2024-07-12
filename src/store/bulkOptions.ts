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

export enum WAresizeMethod {
  Triange,
  Catrom,
  Mitchell,
  Lancozs3,
}
export interface TransformOption {
  resize: {
    enabled: boolean;
    method: ResizeMethod;
    option:
      | MaxWidthOption
      | MaxHeightOption
      | ByScaleOption
      | StretchOption
      | ContainOption;
  };
  rotate: {
    enabled: boolean;
    degree: 0 | 90 | 180 | 270;
  };
  output: {
    format: "avif" | "mozjpeg" | "qoi" | "oxipng" | "jxl" | "webp" | "auto";
    option: AnyEncodeOption;
  };
}
export type ResizeMethod =
  | "maxWidth"
  | "maxHeight"
  | "byScale"
  | "stretch"
  | "contain";
export interface MaxWidthOption {
  upscale: boolean;
  width: number;
}
export interface MaxHeightOption {
  upscale: boolean;
  height: number;
}
export interface ByScaleOption {
  scale: number;
}
export interface ContainOption {
  width: number;
  height: number;
}
export interface StretchOption {
  width: number;
  height: number;
}

const initialState: TransformOption = {
  resize: {
    enabled: false,
    method: "maxWidth",
    option: {
      upscale: false,
      width: 0,
    },
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
    handleResize: (state, action: PayloadAction<TransformOption["resize"]>) => {
      return {
        ...state,
        resize: action.payload,
      };
    },
    handleResizeMethod: (
      state,
      action: PayloadAction<TransformOption["resize"]["method"]>,
    ) => {
      switch (action.payload) {
        case "maxWidth":
          return {
            ...state,
            resize: {
              ...state.resize,
              method: "maxWidth",
              option: {
                upscale: false,
                width: 0,
              } as MaxWidthOption,
            },
          };
        case "maxHeight":
          return {
            ...state,
            resize: {
              ...state.resize,
              method: "maxHeight",
              option: {
                upscale: false,
                height: 0,
              } as MaxHeightOption,
            },
          };
        case "byScale":
          return {
            ...state,
            resize: {
              ...state.resize,
              method: "byScale",
              option: {
                scale: 100,
              } as ByScaleOption,
            },
          };
        case "stretch": {
          return {
            ...state,
            resize: {
              ...state.resize,
              method: "stretch",
              option: {
                width: 0,
                height: 0,
              } as StretchOption,
            },
          };
        }
        case "contain": {
          return {
            ...state,
            resize: {
              ...state.resize,
              method: "contain",
              option: {
                width: 0,
                height: 0,
              } as ContainOption,
            },
          };
        }
        default:
          return state;
      }
    },
    handleRotate: (state, action: PayloadAction<TransformOption["rotate"]>) => {
      return {
        ...state,
        rotate: action.payload,
      };
    },
    handleOutputFormat: (
      state,
      action: PayloadAction<TransformOption["output"]["format"]>,
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
        case "jxl":
          return {
            ...state,
            output: {
              format: "jxl",
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
    handleOutputOption: (state, action: PayloadAction<AnyEncodeOption>) => {
      return {
        ...state,
        output: {
          ...state.output,
          option: action.payload,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleResize,
  handleResizeMethod,
  handleRotate,
  handleOutputFormat,
  handleOutputOption,
} = bulkOptionsSlice.actions;

export default bulkOptionsSlice.reducer;

export const selectBulkOptions = (state: RootState) => state.bulkOptions;
