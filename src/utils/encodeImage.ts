import { optimise as oxipngOptimize } from "@/codecs/oxipng/pkg/squoosh_oxipng";
import {
  AvifEncodeOptions,
  JxlEncodeOptions,
  MozjpegEncodeOptions,
  OxipngEncodeOptions,
  QoiEncodeOptions,
  WebpEncodeOptions,
} from "./defaultOptions";
import { toBlob } from "./convertUtils";
import { getEncodeModules } from "./workerUtils";

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
        const avifModule = await getEncodeModules(targetFormat);
        const result = avifModule.encode(
          input.data,
          input.width,
          input.height,
          options as AvifEncodeOptions,
        );
        return toBlob(result, "avif");
      }
      case "jxl": {
        const jxlModule = await getEncodeModules(targetFormat);
        const result = jxlModule.encode(
          input.data,
          input.width,
          input.height,
          options as JxlEncodeOptions,
        );
        return toBlob(result, "jpg");
      }
      case "mozjpeg": {
        const mozjpegModule = await getEncodeModules(targetFormat);
        const result = mozjpegModule.encode(
          input.data,
          input.width,
          input.height,
          options as MozjpegEncodeOptions,
        );
        return toBlob(result, "jpg");
      }
      case "webp": {
        const webpModule = await getEncodeModules(targetFormat);
        const result = webpModule.encode(
          input.data,
          input.width,
          input.height,
          options as WebpEncodeOptions,
        );
        return toBlob(result, "webp");
      }
      case "oxipng": {
        const oxipngModule = await getEncodeModules(targetFormat);
        const oxipngOptions = options as OxipngEncodeOptions;
        const result = oxipngModule.optimize(
          input.data,
          input.width,
          input.height,
          oxipngOptions.level,
          oxipngOptions.interlace,
        );
        return toBlob(result, "png");
      }
      case "qoi": {
        const qoiModule = await getEncodeModules(targetFormat);
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
