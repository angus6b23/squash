import { BulkOptions } from "@/store/bulkOptions";
import { File } from "@/store/file";
import { getBlob } from "./convertUtils";
import resizeInit, {
  resize as resizeWasm,
} from "@/codecs/resize/pkg/squoosh_resize";
import { outputUrl } from "./encodeImage";

export const resize = async (input: File, options: BulkOptions["resize"]) => {
  try {
    // Get Width and height of the original image
    const imgBlob = await getBlob(input.url);
    if (imgBlob instanceof Error) {
      throw imgBlob;
    }
    const img = await createImageBitmap(imgBlob);
    const imgData = new Uint8Array(await imgBlob.arrayBuffer());

    let targetWidth = 0;
    let targetHeight = 0;
    // Calculate target Sizes
    if (options.keepRatio) {
      const imageAspect = img.width / img.height;
      if (options.height) {
        targetHeight = options.height;
        targetWidth = imageAspect * targetHeight;
      } else if (options.width) {
        targetWidth = options.width;
        targetHeight = img.width / imageAspect;
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
        return input.url;
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
    const result = resizeWasm(
      imgData,
      img.width,
      img.height,
      targetWidth,
      targetHeight,
      targetMethod,
      true,
      true,
    );
    return outputUrl(new Uint8Array(result), imgBlob.type.split("/")[1]);
  } catch (e) {
    return e as Error;
  }
};

export const rotate = async (input: File, option: BulkOptions["rotate"]) => {
  try {
    // Create a new image
    const imgData = await getBlob(input.url);
    if (imgData instanceof Error) {
      throw imgData;
    }
    const img = await createImageBitmap(imgData);
    // Create a new canvas
    const canvas = new OffscreenCanvas(0, 0);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    // Set the width and height of canvas same as the image
    [canvas.width, canvas.height] = [img.width, img.height];
    // Do the rotation and translation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((option.degree * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.width / 2);
    const canvasBlob = await canvas.convertToBlob();
    return URL.createObjectURL(canvasBlob);
  } catch (e) {
    return e as Error;
  }
};
