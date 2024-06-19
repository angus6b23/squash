// Web worker for handling image preview and converting / optimizing single image

import { File } from "@/store/file";
import decodeImage from "@/utils/decodeImage";
import {
  defaultJxlOption,
  defaultMozjpegOption,
  defaultOxipngOption,
  defaultQoiOption,
  defaultWebpOption,
} from "@/utils/defaultOptions";
import encodeImage, { AnyEncodeOption } from "@/utils/encodeImage";

type eventData = {
  file: File;
  format: "avif" | "mozjpeg" | "qoi" | "oxipng" | "jpgxl" | "all";
  id: string;
  option?: AnyEncodeOption;
};

onmessage = async (e) => {
  const { data }: { data: eventData } = e;
  const { file, format } = data;
  if (format === "all") {
    testAllFormat(file);
  }
};

const testAllFormat = async (file: File) => {
  const res = await fetch(file.url);
  const blob = await res.blob();
  const { id } = file;
  const decoded = await decodeImage(blob);
  if (decoded instanceof Error) {
    postMessage({ type: "error", payload: decoded });
    return;
  }
  // encodeImage(decoded, "avif", defaultAvifOption).then((res) =>
  //   handlePromse(res, "avif"),
  // );
  encodeImage(decoded, "mozjpeg", defaultMozjpegOption).then((res) =>
    handlePromse(res, "mozjpeg", id),
  );
  encodeImage(decoded, "jxl", defaultJxlOption).then((res) =>
    handlePromse(res, "jxl", id),
  );
  encodeImage(decoded, "oxipng", defaultOxipngOption).then((res) =>
    handlePromse(res, "oxipng", id),
  );
  encodeImage(decoded, "qoi", defaultQoiOption).then((res) =>
    handlePromse(res, "qoi", id),
  );
  encodeImage(decoded, "webp", defaultWebpOption).then((res) =>
    handlePromse(res, "webp", id),
  );
};

const handlePromse = (res: Blob | Error, encoder: string, id: string) => {
  if (res instanceof Error) {
    postMessage({ type: "error", payload: res });
    return;
  }
  postMessage({
    type: "info",
    payload: {
      format: encoder,
      size: res.size,
      id: id,
    },
  });
};
