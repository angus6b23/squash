import { getDecodeModules } from "./decodeModules";

const decodeImage = async (input: Blob) => {
  try {
    // Create a new canvas
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    let img;
    if (input.type.toLowerCase().includes("jxl")) {
      const jxlModule = await getDecodeModules("jxl");
      const decoded = jxlModule.decode(await input.arrayBuffer());
      return decoded as ImageData;
    } else if (input.type.toLowerCase().includes("avif")) {
      const avifModule = await getDecodeModules("avif");
      const decoded = avifModule.decode(await input.arrayBuffer());
      return decoded as ImageData;
    } else if (input.type.toLowerCase().includes("qoi")) {
      const qoiModule = await getDecodeModules("qoi");
      const decoded = qoiModule.decode(await input.arrayBuffer());
      return decoded as ImageData;
    } else {
      img = await createImageBitmap(input);
      // Set the width and height of canvas same as the image
      [canvas.width, canvas.height] = [img.width, img.height];
      ctx.drawImage(img, 0, 0);
    }
    return ctx.getImageData(0, 0, canvas.width, canvas.height) as ImageData;
  } catch (e) {
    console.log(e);
    return new Error("Unable to decode image: " + (e as Error).message);
  }
};

export const decodeFromUrl = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await decodeImage(blob);
};

export default decodeImage;
