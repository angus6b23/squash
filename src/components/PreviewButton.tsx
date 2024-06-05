import getCurrentFile from "../utils/getCurrentFile";
import { type ReactElement } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import decodeImage from "../utils/decodeImage";
import encodeImage from "../utils/encodeImage";

export default function PreviewButton(): ReactElement {
  const handlePreview = async () => {
    const currentFile = getCurrentFile();
    const decoded = await decodeImage(currentFile);
    const encoded = await encodeImage(decoded as unknown as ImageData, "webp", {
      quality: 90,
      target_size: 0,
      target_PSNR: 0,
      method: 4,
      sns_strength: 50,
      filter_strength: 60,
      filter_sharpness: 0,
      filter_type: 1,
      partitions: 0,
      segments: 4,
      pass: 1,
      show_compressed: 0,
      preprocessing: 0,
      autofilter: 0,
      partition_limit: 0,
      alpha_compression: 1,
      alpha_filtering: 1,
      alpha_quality: 100,
      lossless: 0,
      exact: 0,
      image_hint: 0,
      emulate_jpeg_size: 0,
      thread_level: 0,
      low_memory: 0,
      near_lossless: 100,
      use_delta_palette: 0,
      use_sharp_yuv: 0,
    });
    console.log(encoded);
  };
  return (
    <>
      <button
        className="flex justify-center items-center btn btn-primary absolute right-8 top-20 z-30"
        onClick={handlePreview}
      >
        <PiArrowsLeftRight />
        <p>Preview Optimized</p>
      </button>
    </>
  );
}
