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
    const zipFile = new JSZip();
    const itemsArray = await processFiles(files, options);
    for (const item of itemsArray) {
      const res = await fetch(item.url);
      const blob = await res.blob();
      zipFile.file(item.name, blob);
    }
    const zipGen = await zipFile.generateAsync({ type: "blob" });
    console.log("Finished packing");
    postMessage(URL.createObjectURL(zipGen));

    // postMessage(URL.createObjectURL(itemsArray));
  } catch (e) {
    console.error(e);
    postMessage(e);
  }
};

const processFiles = async (files: File[], options: BulkOptions) => {
  const finishedItems: { name: string; url: string }[] = [];
  for (const file of files) {
    console.log(`Processing ${file.name}`);
    const scopeFile = file;
    // Resize if enabled
    if (options.resize.enabled) {
      const newUrl = await resize(scopeFile, options.resize);
      if (newUrl instanceof Error) {
        throw newUrl;
      } else {
        scopeFile.url = newUrl;
      }
    }
    // Rotate if enabled
    if (options.rotate.enabled) {
      const newUrl = await rotate(scopeFile, options.rotate);
      if (newUrl instanceof Error) {
        throw newUrl;
      } else {
        scopeFile.url = newUrl;
      }
    }
    // Decode image and output
    const decoded = await decodeImage(scopeFile);
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
      finishedItems.push({
        name: await getName(file, encoded as string),
        url: encoded as string,
      });
      console.log(`URL for ${file.name} is ${encoded}`);
    }
  }
  return finishedItems;
};
