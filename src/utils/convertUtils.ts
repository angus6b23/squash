export const getFileUrl = (file: File) => {
  return URL.createObjectURL(file);
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
