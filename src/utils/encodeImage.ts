import webp_enc, {
  EncodeOptions as WebpEncodeOptions,
} from "../codecs/webp/enc/webp_enc";

const encodeImage = async (
  input: ImageData,
  targetFormat: string,
  options: WebpEncodeOptions,
) => {
  switch (targetFormat) {
    case "webp": {
      const webpModule = await webp_enc();
      const result = webpModule.encode(
        input.data,
        input.width,
        input.height,
        options as WebpEncodeOptions,
      );
      return outputUrl(result, "webp");
    }

    default:
      return new Error("Unknown format");
  }
};

const outputUrl = (data: Uint8Array, format: string) => {
  const blob = new Blob([data], { type: `image/${format}` });
  return URL.createObjectURL(blob);
};

export default encodeImage;
