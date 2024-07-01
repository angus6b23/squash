import { TransformOption } from "@/store/bulkOptions";
import { File } from "@/store/file";
import { simd, threads } from "wasm-feature-detect";
import { resize, rotate } from "./modifyImage";
import decodeImage from "./decodeImage";
import autoFormat from "./autoFormat";
import encodeImage from "./encodeImage";
import { getCache, setCache } from "./tranformCache";

export const encodeModules = new Map();

const hasSimd = await simd();
const hasThreads = await threads();

export const getEncodeModules = async (
  name: TransformOption["output"]["format"],
) => {
  if (encodeModules.has(name)) {
    return encodeModules.get(name);
  } else {
    switch (name) {
      case "avif": {
        const avifModule = hasThreads
          ? await import("@/codecs/avif/enc/avif_enc_mt")
          : await import("@/codecs/avif/enc/avif_enc");
        encodeModules.set(name, await initModule(avifModule));
        return encodeModules.get(name);
      }
      case "jxl": {
        const jxlModule =
          hasSimd && hasThreads
            ? await import("@/codecs/jxl/enc/jxl_enc_mt_simd")
            : hasThreads
              ? await import("@/codecs/jxl/enc/jxl_enc_mt")
              : await import("@/codecs/jxl/enc/jxl_enc");
        encodeModules.set(name, await initModule(jxlModule));
        return encodeModules.get(name);
      }
      case "mozjpeg": {
        const mozjpegModule = await import("@/codecs/mozjpeg/enc/mozjpeg_enc");
        encodeModules.set(name, await initModule(mozjpegModule));
        return encodeModules.get(name);
      }
      case "oxipng": {
        if (hasThreads) {
          const {
            default: init,
            initThreadPool,
            optimise,
          } = await import("@/codecs/oxipng/pkg-parallel/squoosh_oxipng");
          await init();
          await initThreadPool(navigator.hardwareConcurrency);
          encodeModules.set(name, optimise);
        } else {
          const { default: init, optimise } = await import(
            "@/codecs/oxipng/pkg/squoosh_oxipng"
          );
          await init();
          encodeModules.set(name, optimise);
        }
        return encodeModules.get(name);
      }
      case "qoi": {
        const qoiModule = await import("@/codecs/qoi/enc/qoi_enc");
        encodeModules.set(name, await initModule(qoiModule));
        return encodeModules.get(name);
      }
      case "webp": {
        const webpModule = hasSimd
          ? await import("@/codecs/webp/enc/webp_enc_simd")
          : await import("@/codecs/webp/enc/webp_enc");
        encodeModules.set(name, await initModule(webpModule));
        return encodeModules.get(name);
      }
      default:
        throw new Error("Unknown format");
    }
  }
};

const initModule = async (module: any) => {
  return await module.default({
    noInitialRun: true,
  });
};

export const processImage = async (file: File, option: TransformOption) => {
  const res = await fetch(file.url);
  let scopeBlob = await res.blob();
  const cache = getCache(file.id, option);
  if (cache !== undefined) {
    return cache;
  }

  // Resize if enabled
  if (option.resize.enabled) {
    const newBlob = await resize(scopeBlob, option.resize);
    if (newBlob instanceof Error) {
      throw newBlob;
    } else {
      scopeBlob = newBlob;
    }
  }

  // Rotate if enabled
  if (option.rotate.enabled) {
    const newBlob = await rotate(scopeBlob, option.rotate);
    if (newBlob instanceof Error) {
      throw newBlob;
    } else {
      scopeBlob = newBlob;
    }
  }

  // Decode image and output
  const decoded = await decodeImage(scopeBlob);
  if (decoded instanceof Error) {
    throw decoded;
  } else {
    let targetFormat;
    let targetOption;
    if (option.output.format === "auto") {
      const res = await autoFormat(file);
      targetFormat = res.format;
      targetOption = res.option;
    } else {
      targetFormat = option.output.format;
      targetOption = option.output.option;
    }
    const encoded = await encodeImage(decoded, targetFormat, targetOption);
    setCache(file.id, option, encoded);
    return encoded;
  }
};
