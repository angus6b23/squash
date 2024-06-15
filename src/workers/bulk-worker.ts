// Worker for handling bulk convert / optimize

import { BulkOptions } from "@/store/bulkOptions";
import { File } from "@/store/file";
import autoFormat from "@/utils/autoFormat";
import decodeImage from "@/utils/decodeImage";
import encodeImage from "@/utils/encodeImage";
import getName from "@/utils/getName";
import { resize, rotate } from "@/utils/modifyImage";
import JSZip from "jszip";

onmessage = async (e) => {
  try {
    const { data } = e;
    const { files, options }: { files: File[]; options: BulkOptions } = data;
    // Create a zip for storing all the output images
    const zipFile = new JSZip();
    // Process every items in files
    const itemsArray = await processFiles(files, options);
    // Add all blobs into the zip
    for (const item of itemsArray) {
      zipFile.file(item.name, item.blob);
    }
    const zipGen = await zipFile.generateAsync({ type: "blob" });
    // console.log("Finished packing");
    postMessage({ type: "success", payload: URL.createObjectURL(zipGen) });
  } catch (e) {
    postMessage({ type: "error", payload: e });
  }
};

const processFiles = async (files: File[], options: BulkOptions) => {
  const finishedItems: { name: string; blob: Blob }[] = [];
  for (const [index, file] of files.entries()) {
    postMessage({
      type: "info",
      payload: {
        current: index,
        total: files.length,
      },
    });
    const res = await fetch(file.url);
    let scopeBlob = await res.blob();
    // Resize if enabled
    if (options.resize.enabled) {
      const newBlob = await resize(scopeBlob, options.resize);
      if (newBlob instanceof Error) {
        throw newBlob;
      } else {
        scopeBlob = newBlob;
        console.log(newBlob);
      }
    }
    // Rotate if enabled
    if (options.rotate.enabled) {
      const newBlob = await rotate(scopeBlob, options.rotate);
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
      if (options.output.format === "auto") {
        const res = await autoFormat(file);
        targetFormat = res.format;
        targetOption = res.option;
      } else {
        targetFormat = options.output.format;
        targetOption = options.output.option;
      }
      const encoded = await encodeImage(decoded, targetFormat, targetOption);
      if (encoded instanceof Error) {
        postMessage({ type: "error", payload: encoded });
        continue;
      }
      const newItem = {
        name: getName(file, encoded),
        blob: encoded,
      };
      finishedItems.push(newItem);
    }
  }
  return finishedItems;
};
