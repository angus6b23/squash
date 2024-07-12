import {
  ByScaleOption,
  ContainOption,
  MaxHeightOption,
  MaxWidthOption,
  StretchOption,
  TransformOption,
  WAresizeMethod,
} from "@/store/bulkOptions";
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
    let skipResize = false;
    let targetMethod: WAresizeMethod = 3;
    const imgRatio = img.width / img.height;
    switch (options.method) {
      case "maxWidth": {
        const resizeOption = options.option as MaxWidthOption;
        if (resizeOption.upscale || img.width > resizeOption.width) {
          targetWidth = Math.round(resizeOption.width);
          targetHeight = Math.round(targetWidth / imgRatio);
          targetMethod = img.width < targetWidth ? 2 : 3;
        } else {
          skipResize = true;
        }
        break;
      }
      case "maxHeight": {
        const resizeOption = options.option as MaxHeightOption;
        if (resizeOption.upscale || img.height > resizeOption.height) {
          targetHeight = Math.round(resizeOption.height);
          targetWidth = Math.round(imgRatio * targetHeight);
          targetMethod = img.height < targetHeight ? 2 : 3;
        } else {
          skipResize = true;
        }
        break;
      }
      case "byScale": {
        const resizeOption = options.option as ByScaleOption;
        if (resizeOption.scale <= 0) {
          skipResize = true;
        } else {
          targetHeight = Math.round((img.height * resizeOption.scale) / 100);
          targetWidth = Math.round((img.width * resizeOption.scale) / 100);
          if (resizeOption.scale > 100) {
            targetMethod = 2;
          }
        }
        break;
      }
      case "stretch": {
        const resizeOption = options.option as StretchOption;
        targetWidth = resizeOption.width;
        targetHeight = resizeOption.height;
        if (targetHeight * targetWidth > img.width * img.height) {
          targetMethod = 2;
        }
        break;
      }
      case "contain": {
        const resizeOption = options.option as ContainOption;
        if (resizeOption.width > resizeOption.height) {
          targetWidth = resizeOption.width;
          targetHeight = Math.round(resizeOption.width / imgRatio);
        } else {
          targetHeight = resizeOption.height;
          targetWidth = Math.round(resizeOption.height * imgRatio);
        }

        break;
      }
      default: {
        throw new Error("Invalid resize method");
      }
    }
    if (targetWidth <= 0 || targetHeight <= 0) {
      skipResize = true;
    }
    if (skipResize) {
      return input;
    }
    // console.log(targetWidth, targetHeight, targetMethod);

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
    const canvas =
      options.method === "contain"
        ? new OffscreenCanvas(
            (options.option as ContainOption).width,
            (options.option as ContainOption).height,
          )
        : new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    const resultImgData = new ImageData(targetWidth, targetHeight);
    resultImgData.data.set(result);
    if (options.method === "contain") {
      const resizeOption = options.option as ContainOption;
      ctx.putImageData(
        resultImgData,
        -(targetWidth - resizeOption.width) / 2,
        -(targetHeight - resizeOption.height) / 2,
      );
    } else {
      ctx.putImageData(resultImgData, 0, 0);
    }
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
