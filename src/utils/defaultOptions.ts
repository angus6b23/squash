import { EncodeOptions as wrapAvifEncodeOptions } from "@/codecs/avif/enc/avif_enc";
export type AvifEncodeOptions = wrapAvifEncodeOptions;
export const defaultAvifOption: AvifEncodeOptions = {
  quality: 50, // [0 - 100]; 0 = worst quality, 100 = lossless
  qualityAlpha: -1, // As above, but -1 means 'use quality'
  denoiseLevel: 0, // 0-50
  tileRowsLog2: 0,
  tileColsLog2: 0,
  // [0 - 6]
  // Creates 2^n tiles in that dimension
  speed: 6, // [0 - 10], 0 = slowest, 10 = fastest
  subsample: 1, // 0 = 4:0:0, 1 = 4:2:0, 2 = 4:2:2, 3 = 4:4:4
  chromaDeltaQ: false,
  sharpness: 0, // 0-7
  enableSharpYUV: false,
  tune: 0, // auto, psnr, ssim,
};
import { EncodeOptions as wrapWebpEncodeOptions } from "@/codecs/webp/enc/webp_enc";
export type WebpEncodeOptions = wrapWebpEncodeOptions;
export const defaultWebpOption: WebpEncodeOptions = {
  quality: 75, //quality factor (0:small..100:big), default=75
  target_size: 0, //target size (in bytes)
  target_PSNR: 0, //target PSNR (in dB. typically: 42)
  method: 4, // compression method (0=fast, 6=slowest), default=4
  sns_strength: 50, //spatial noise shaping (0:off, 100:max), default=50
  filter_strength: 60, // filter strength (0=off..100), default=60
  filter_sharpness: 0, //filter sharpness (0:most .. 7:least sharp), default=0
  filter_type: 1, //use strong filter instead of simple (default)
  partitions: 0,
  segments: 4, //number of segments to use (1..4), default=4
  pass: 1, //analysis pass number (1..10)
  show_compressed: 0,
  preprocessing: 0,
  autofilter: 0,
  partition_limit: 0, //limit quality to fit the 512k limit on the first partition (0=no degradation ... 100=full)
  alpha_compression: 1, //transparency-compression method (0..1), default=1
  alpha_filtering: 1, //predictive filtering for alpha plane, one of: none, fast (default) or best
  alpha_quality: 100, // transparency-compression quality (0..100), default = 100
  lossless: 0, //encode image losslessly, default=off
  exact: 0, //preserve RGB values in transparent area, default=off
  image_hint: 0, //specify image characteristics hint, one of: photo, picture or graph
  emulate_jpeg_size: 0,
  thread_level: 0, // use multi-threading if available
  low_memory: 0, // reduce memory usage (slower encoding)
  near_lossless: 100, //use near-lossless image preprocessing (0..100=off), default=100
  use_delta_palette: 0,
  use_sharp_yuv: 0, //use sharper (and slower) RGB->YUV conversion
};

import { EncodeOptions as wrapJxlEncodeOptions } from "@/codecs/jxl/enc/jxl_enc";
export type JxlEncodeOptions = wrapJxlEncodeOptions;
export const defaultJxlOption: JxlEncodeOptions = {
  effort: 7,
  quality: 75,
  progressive: false,
  epf: 2,
  lossyPalette: false,
  decodingSpeedTier: 0,
  photonNoiseIso: 0,
  lossyModular: false,
};

export type OxipngEncodeOptions = {
  level: number;
  interlace: boolean;
};

export const defaultOxipngOption: OxipngEncodeOptions = {
  level: 2, // 0 - 6, 6 = slowest and smallest
  interlace: false,
};

import { EncodeOptions as wrapMozjpegEncodeOptions } from "@/codecs/mozjpeg/enc/mozjpeg_enc";
export type MozjpegEncodeOptions = wrapMozjpegEncodeOptions;
export const defaultMozjpegOption: MozjpegEncodeOptions = {
  quality: 75, // 0 - 100
  baseline: false, //
  arithmetic: false,
  progressive: false, // progressive rendering
  optimize_coding: false, // Optimize huffman table
  smoothing: 0, // 0 - 100
  color_space: 3,
  // GRAYSCALE = 1,
  // RGB,
  // YCbCr,
  quant_table: 3,
  // - 0 JPEG Annex K
  // - 1 Flat
  // - 2 Custom, tuned for MS-SSIM
  // - 3 ImageMagick table by N. Robidoux
  // - 4 Custom, tuned for PSNR-HVS
  // - 5 Table from paper by Klein, Silverstein and Carney
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false,
  chroma_quality: 75,
};

import { EncodeOptions as wrapQoiEncodeOptions } from "@/codecs/qoi/enc/qoi_enc";
export type QoiEncodeOptions = wrapQoiEncodeOptions;
export const defaultQoiOption: QoiEncodeOptions = {};
