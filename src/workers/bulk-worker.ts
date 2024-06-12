// Worker for handling bulk convert / optimize

import { BulkOptions } from "@/store/bulkOptions";
import { File } from "@/store/file";
import decodeImage from "@/utils/decodeImage";
import encodeImage from "@/utils/encodeImage";
import { resize, rotate } from "@/utils/modifyImage";

onmessage = async (e) => {
  try {
    const { data } = e;
    const { files, options }: { files: File[]; options: BulkOptions } = data;
    files.forEach(async (file) => {
      const scopeFile = file;
      // Resize if enabled
      if (options.resize.enabled) {
        const newUrl = await resize(scopeFile, options.resize);
        if (newUrl instanceof Error) {
          console.error(newUrl);
        } else {
          scopeFile.url = newUrl;
        }
      }
      // Rotate if enabled
      if (options.rotate.enabled) {
        const newUrl = await rotate(scopeFile, options.rotate);
        if (newUrl instanceof Error) {
          console.error(newUrl);
        } else {
          scopeFile.url = newUrl;
        }
      }
      // Decode image and output
      const decoded = await decodeImage(scopeFile);
      if (decoded instanceof Error) {
        console.error(decoded);
      } else {
        const encoded = encodeImage(
          decoded,
          options.output.format,
          options.output.option,
        );
        console.log(encoded);
      }
    });
  } catch (e) {
    postMessage(e);
  }
};
