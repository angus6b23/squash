import { BulkOptions } from "@/store/bulkOptions";
import { File } from "@/store/file";
import { AnyEncodeOption } from "./encodeImage";
import {
  defaultMozjpegOption,
  defaultOxipngOption,
  defaultWebpOption,
} from "./defaultOptions";
const autoFormat = async (
  file: File,
): Promise<{
  format: BulkOptions["output"]["format"];
  option: AnyEncodeOption;
}> => {
  const res = await fetch(file.url);
  const blob = await res.blob();
  const format = blob.type.split("/")[1].toLowerCase();
  if (format === "jpg" || format === "jpeg" || format === "gif") {
    return {
      format: "mozjpeg",
      option: defaultMozjpegOption,
    };
  } else if (format === "png") {
    return {
      format: "oxipng",
      option: defaultOxipngOption,
    };
  } else {
    return {
      format: "webp",
      option: defaultWebpOption,
    };
  }
};

export default autoFormat;
