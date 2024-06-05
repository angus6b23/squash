import { File } from "../store/file";

const decodeImage = async (input: File) => {
  try {
    // Create a new image
    const res = await fetch(input.url);
    const imgData = await res.blob();
    const img = await createImageBitmap(imgData);
    // Create a new canvas
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    // Set the width and height of canvas same as the image
    [canvas.width, canvas.height] = [img.width, img.height];
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, img.width, img.height) as ImageData;
  } catch (e) {
    return new Error("Unable to decode image:" + (e as Error).message);
  }
};

export default decodeImage;
