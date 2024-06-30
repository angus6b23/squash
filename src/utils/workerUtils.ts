import { TransformOption } from "@/store/bulkOptions";
import { simd, threads } from "wasm-feature-detect";

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
        const oxipngModule = hasThreads
          ? await import("@/codecs/oxipng/pkg-parallel/squoosh_oxipng")
          : await import("@/codecs/oxipng/pkg/squoosh_oxipng");
        encodeModules.set(name, await initModule(oxipngModule));
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
