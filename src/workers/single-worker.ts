// Worker for handling preview and single image optimization

import { TransformOption } from "@/store/bulkOptions";
import { File } from "@/store/file";
import decodeImage from "@/utils/decodeImage";
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

    if (type === "preview") {
      // Decode to brower viewable image for preview
      const decoded = await decodeImage(encoded);
      if (decoded instanceof Error) {
        throw encoded;
      }
      const canvas = new OffscreenCanvas(decoded.width, decoded.height);
      canvas.getContext("2d")?.putImageData(decoded, 0, 0);
      const blob = await canvas.convertToBlob();
      postMessage({
        type: type,
        payload: blob,
        id: file.id,
        size: encoded.size,
      });
    } else {
      postMessage({ type: type, payload: encoded, id: file.id });
    }
  } catch (e) {
    postMessage({ type: "error", payload: e });
  }
};
