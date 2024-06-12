// Web worker for handling image preview and converting / optimizing single image

import { File } from "@/store/file";
import decodeImage from "@/utils/decodeImage";
import encodeImage, { AnyEncodeOption } from "@/utils/encodeImage";

type eventData = {
  payload: File;
  format: "avif" | "mozjpeg" | "qoi" | "oxipng" | "jpgxl";
  option: AnyEncodeOption;
};

onmessage = async (e) => {
  const { data }: { data: eventData } = e;
  const { payload, format, option } = data;
  const decoded = await decodeImage(payload);
  if (decoded instanceof Error) {
    return;
  }
  const encodedUrl = await encodeImage(decoded, format, option);
  postMessage(encodedUrl);
};
