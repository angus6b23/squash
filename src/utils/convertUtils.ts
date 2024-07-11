import decodeImage from "./decodeImage";

export const getFileDetails = async (file: File): Promise<[string, number]> => {
  // Convert image into browser viewable format
  if (
    // Omit these file formats (should be supported already)

    file.type?.toLowerCase().includes("avif") ||
    file.type?.toLowerCase().includes("jxl") ||
    file.type?.toLowerCase().includes("gif") ||
    file.type?.toLowerCase().includes("qoi")
  ) {
    const imageData = await decodeImage(file);
    if (imageData instanceof Error) {
      throw new Error("Unable to decode image");
    }
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    canvas.getContext("2d")?.putImageData(imageData, 0, 0);
    const url = URL.createObjectURL(await canvas.convertToBlob());
    return [url, file.size];
  } else {
    return [URL.createObjectURL(file), file.size];
  }
};

export const getBlob = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.blob();
  } catch (e) {
    return e as Error;
  }
};

export const toBlob = (
  data: Uint8Array | Uint8ClampedArray,
  format?: string,
) => {
  return new Blob([data], format ? { type: `image/${format}` } : {});
};

export const imageDataToBlob = async (data: ImageData) => {
  const canvas = new OffscreenCanvas(data.width, data.height);
  const ctx = canvas.getContext("2d");
  ctx?.putImageData(data, 0, 0);
  return await canvas.convertToBlob();
};

export const calculatePercentDiff = (optimized: number, original: number) => {
  const diff = ((optimized - original) / original) * 100;
  return Math.abs(diff).toFixed(0) + "%";
};
