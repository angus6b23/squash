import webp_enc from "@/codecs/webp/enc/webp_enc";
import jxl_enc from "@/codecs/jxl/enc/jxl_enc";
import oxipng_enc, {
  optimise as oxipngOptimize,
} from "@/codecs/oxipng/pkg/squoosh_oxipng";
import mozjpeg_enc from "@/codecs/mozjpeg/enc/mozjpeg_enc";
import qoi_enc from "@/codecs/qoi/enc/qoi_enc";
import avif_enc from "@/codecs/avif/enc/avif_enc";
import {
  AvifEncodeOptions,
  JxlEncodeOptions,
  MozjpegEncodeOptions,
  OxipngEncodeOptions,
  QoiEncodeOptions,
  WebpEncodeOptions,
} from "./defaultOptions";
import { toBlob } from "./convertUtils";

export type AnyEncodeOption =
  | AvifEncodeOptions
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
      case "avif": {
        const avifModule = await avif_enc();
        const result = avifModule.encode(
          input.data,
          input.width,
          input.height,
          options as AvifEncodeOptions,
        );
        return toBlob(result, "avif");
      }
      case "jxl": {
        const jxlModule = await jxl_enc();
        const result = jxlModule.encode(
          input.data,
          input.width,
          input.height,
          options as JxlEncodeOptions,
        );
        return toBlob(result, "jpg");
      }
      case "mozjpeg": {
        const mozjpegModule = await mozjpeg_enc();
        const result = mozjpegModule.encode(
          input.data,
          input.width,
          input.height,
          options as MozjpegEncodeOptions,
        );
        return toBlob(result, "jpg");
      }
      case "webp": {
        const webpModule = await webp_enc();
        const result = webpModule.encode(
          input.data,
          input.width,
          input.height,
          options as WebpEncodeOptions,
        );
        return toBlob(result, "webp");
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
        return toBlob(result, "png");
      }
      case "qoi": {
        const qoiModule = await qoi_enc();
        const result = qoiModule.encode(
          input.data,
          input.width,
          input.height,
          options as QoiEncodeOptions,
        );
        return toBlob(result, "qoi");
      }
      default:
        return new Error("Unknown format");
    }
  } catch (e) {
    return e as Error;
  }
};

export default encodeImage;
