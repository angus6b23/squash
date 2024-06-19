export const getFileDetails = (file: File): [string, number] => {
  return [URL.createObjectURL(file), file.size];
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
