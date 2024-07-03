import { TransformOption } from "@/store/bulkOptions";
import { initModule } from "./workerUtils";

export const decodeModules = new Map();

export const getDecodeModules = async (
  format: TransformOption["output"]["format"],
) => {
  if (decodeModules.has(format)) {
    return decodeModules.get(format);
  }
  switch (format) {
    case "avif": {
      const avifDecode = await import("@/codecs/avif/dec/avif_dec");
      decodeModules.set(format, await initModule(avifDecode));
      return decodeModules.get(format);
    }
    case "jxl": {
      const jxlDecode = await import("@/codecs/jxl/dec/jxl_dec");
      decodeModules.set(format, await initModule(jxlDecode));
      return decodeModules.get(format);
    }
    case "qoi": {
      const qoiDecode = await import("@/codecs/qoi/dec/qoi_dec");
      decodeModules.set(format, await initModule(qoiDecode));
      return decodeModules.get(format);
    }
    default: {
      throw new Error(`Unknown format: ${format}`);
    }
  }
};
