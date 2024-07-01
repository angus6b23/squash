// Worker for handling preview and single image optimization

import { TransformOption } from "@/store/bulkOptions";
import { File } from "@/store/file";
import { processImage } from "@/utils/workerUtils";

onmessage = async (e) => {
  try {
    const { data } = e;
    const {
      file,
      option,
      type,
    }: { file: File; option: TransformOption; type: string } = data;

    const encoded = await processImage(file, option);
    if (encoded instanceof Error) {
      throw encoded;
    }
    postMessage({ type: type, payload: encoded, id: file.id });
  } catch (e) {
    postMessage({ type: "error", payload: e });
  }
};
