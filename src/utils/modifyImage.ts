import { TransformOption } from "@/store/bulkOptions";
import resizeInit, {
  resize as resizeWasm,
} from "@/codecs/resize/pkg/squoosh_resize";
import decodeImage from "./decodeImage";

export const resize = async (
  input: Blob,
  options: TransformOption["resize"],
) => {
  try {
    // Get Width and height of the original image
    const img = await createImageBitmap(input);
    const decoded = await decodeImage(input);

    if (decoded instanceof Error) {
      return decoded;
    }

    let targetWidth = 0;
    let targetHeight = 0;

    // Calculate target Sizes
    if (options.keepRatio) {
      const imageAspect = img.width / img.height;
      if (options.height) {
        targetHeight = Math.round(options.height);
        targetWidth = Math.round(imageAspect * targetHeight);
      } else if (options.width) {
        targetWidth = Math.round(options.width);
        targetHeight = Math.round(targetWidth / imageAspect);
      }
    } else {
      [targetWidth, targetHeight] = [
        options.width as number,
        options.height as number,
      ];
    }

    // Simply return input blob url if upcale is disabled and target dimensions are larger than original one
    if (!options.upscale) {
      if (targetWidth > img.width || targetHeight > img.height) {
        return input;
      }
    }

    // Auto select resize method
    // Use Lanczos3 for downscale and Mitchell for upscale, see https://github.com/PistonDevelopers/resize
    let targetMethod = 0;
    if (options.method === 4) {
      if (targetWidth > img.width || targetHeight > img.height) {
        targetMethod = 3;
      } else {
        targetMethod = 2;
      }
    } else {
      targetMethod = options.method;
    }
    await resizeInit();
    // console.log(new Uint8Array(decoded.data.buffer));
    const result = resizeWasm(
      new Uint8Array(decoded.data.buffer),
      img.width,
      img.height,
      targetWidth,
      targetHeight,
      targetMethod,
      false,
      false,
    );
    // Convert result back to blob using canvas
    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    const resultImgData = new ImageData(targetWidth, targetHeight);
    resultImgData.data.set(result);
    ctx.putImageData(resultImgData, 0, 0);
    return await canvas.convertToBlob();
  } catch (e) {
    return e as Error;
  }
};

export const rotate = async (
  input: Blob,
  option: TransformOption["rotate"],
) => {
  try {
    // Create a new image
    const img = await createImageBitmap(input);
    // Create a new canvas
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    // Set the width and height of canvas same as the image, swap height and width for 90 & 270
    if (Number(option.degree) === Number(90) || Number(option.degree) === 270) {
      [canvas.height, canvas.width] = [img.width, img.height];
    } else {
      [canvas.width, canvas.height] = [img.width, img.height];
    }
    // Do the rotation and translation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((option.degree * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    const canvasBlob = await canvas.convertToBlob();
    return canvasBlob;
  } catch (e) {
    return e as Error;
  }
};
