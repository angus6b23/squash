import { getDimension, toDataURI } from "./svg";

const decodeImage = async (input: Blob) => {
  try {
    // Create a new canvas
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    let img;
    if (input.type.includes("svg")) {
      img = (await input.text()) as unknown as SVGGraphicsElement;
      const svgImage = new Image();
      const [svgWidth, svgHeight] = await getDimension(input);
      svgImage.height = svgHeight;
      svgImage.width = svgWidth;
      svgImage.src = toDataURI(input);
      [canvas.width, canvas.height] = [svgWidth, svgHeight];
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

export default decodeImage;
