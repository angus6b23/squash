// Worker for handling bulk convert / optimize

import { TransformOption } from "@/store/bulkOptions";
import { File } from "@/store/file";
import getName from "@/utils/getName";
import { processImage } from "@/utils/workerUtils";
import JSZip from "jszip";

onmessage = async (e) => {
  try {
    const { data } = e;
    const { files, options }: { files: File[]; options: TransformOption } =
      data;
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

const processFiles = async (files: File[], options: TransformOption) => {
  const finishedItems: { name: string; blob: Blob }[] = [];
  for (const [index, file] of files.entries()) {
    // Post message to renderer to show progress
    postMessage({
      type: "info",
      payload: {
        current: index,
        total: files.length,
      },
    });
    const encoded = await processImage(file, options);
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
  return finishedItems;
};
