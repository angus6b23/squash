import webp_enc from "@/codecs/webp/enc/webp_enc";
import jxl_enc from "@/codecs/jxl/enc/jxl_enc";
import oxipng_enc, {
  optimise as oxipngOptimize,
} from "@/codecs/oxipng/pkg/squoosh_oxipng";
import mozjpeg_enc from "@/codecs/mozjpeg/enc/mozjpeg_enc";
import qoi_enc from "@/codecs/qoi/enc/qoi_enc";
import {
  JxlEncodeOptions,
  MozjpegEncodeOptions,
  OxipngEncodeOptions,
  QoiEncodeOptions,
  WebpEncodeOptions,
} from "./defaultOptions";

export type AnyEncodeOption =
  | WebpEncodeOptions
  | JxlEncodeOptions
  | OxipngEncodeOptions
  | MozjpegEncodeOptions
  | QoiEncodeOptions;

const encodeImage = async (
  input: ImageData,
  targetFormat: string,
  options: AnyEncodeOption,
) => {
  try {
    switch (targetFormat) {
      case "jxl": {
        const jxlModule = await jxl_enc();
        const result = jxlModule.encode(
          input.data,
          input.width,
          input.height,
          options as JxlEncodeOptions,
        );
        return outputUrl(result, "jpg");
      }
      case "mozjpeg": {
        const mozjpegModule = await mozjpeg_enc();
        const result = mozjpegModule.encode(
          input.data,
          input.width,
          input.height,
          options as MozjpegEncodeOptions,
        );
        return outputUrl(result, "jpg");
      }
      case "webp": {
        const webpModule = await webp_enc();
        const result = webpModule.encode(
          input.data,
          input.width,
          input.height,
          options as WebpEncodeOptions,
        );
        return outputUrl(result, "webp");
      }
      case "oxipng": {
        await oxipng_enc();
        const oxipngOptions = options as OxipngEncodeOptions;
        const result = oxipngOptimize(
          input.data,
          input.width,
          input.height,
          oxipngOptions.level,
          oxipngOptions.interlace,
        );
        return outputUrl(result, "png");
      }
      case "qoi": {
        const qoiModule = await qoi_enc();
        const result = qoiModule.encode(
          input.data,
          input.width,
          input.height,
          options as QoiEncodeOptions,
        );
        console.log(result);
        return outputUrl(result, "qoi");
      }
      default:
        return new Error("Unknown format");
    }
  } catch (e) {
    console.error(e);
  }
};

export const outputUrl = (data: Uint8Array, format: string) => {
  const blob = new Blob([data], { type: `image/${format}` });
  return URL.createObjectURL(blob);
};

export default encodeImage;
