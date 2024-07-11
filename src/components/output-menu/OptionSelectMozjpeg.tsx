import { handleOutputOption, selectBulkOptions } from "@/store/bulkOptions";
import { MozjpegEncodeOptions } from "@/utils/defaultOptions";
import { BaseSyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderOption from "./SliderOption";
import CheckboxOption from "./CheckboxOption";
import { PiInfo } from "react-icons/pi";

function OptionSelectMozjpeg() {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const option = output.option as MozjpegEncodeOptions;
  const handleOptionChange = (e: BaseSyntheticEvent, checkbox = false) => {
    const { name, value }: { name: keyof MozjpegEncodeOptions; value: string } =
      e.target;
    let newOption = option;
    if (checkbox) {
      newOption = {
        ...option,
        [name]: !(option[name] as boolean),
      };
    } else {
      newOption = {
        ...option,
        [name]: Number(value),
      };
    }
    dispatch(handleOutputOption(newOption));
  };
  return (
    <div className="flex flex-col gap-2 py-4">
      <SliderOption
        name="quality"
        value={option.quality}
        onChange={handleOptionChange}
        min={0}
        max={100}
        title="Quality"
      />
      <details className="collapse collapse-arrow">
        <summary className="collapse-title px-0">Advance Options</summary>
        <div className="collapse-content flex flex-col gap-4 py-2 px-0">
          <div className="flex flex-row justify-between items-center">
            <p>Channels</p>
            <select
              className="select select-sm"
              name="color_space"
              value={option.color_space}
              onChange={handleOptionChange}
            >
              <option value={1}>Grayscale</option>
              <option value={2}>RGB</option>
              <option value={3}>YCbCr</option>
            </select>
          </div>
          <CheckboxOption
            title="Auto subsmaple Chroma"
            checked={option.auto_subsample}
            name="auto_subsample"
            onChange={handleOptionChange}
          />
          {!option.auto_subsample && (
            <SliderOption
              title="Subsample chroma by"
              name="chroma_subsample"
              min={1}
              max={4}
              onChange={handleOptionChange}
              value={option.chroma_subsample}
            />
          )}
          <CheckboxOption
            title="Separate chroma quality"
            checked={option.separate_chroma_quality}
            name="separate_chroma_quality"
            onChange={handleOptionChange}
          />
          {option.separate_chroma_quality && (
            <SliderOption
              title="Chroma quality"
              value={option.chroma_quality}
              name="chroma_quality"
              min={0}
              max={100}
              onChange={handleOptionChange}
            />
          )}
          <CheckboxOption
            title="Progressive Rendering"
            checked={option.progressive}
            name="progressive"
            tooltip={`Creates a "progressive JPEG" file.  In this type of JPEG file, the data is stored in multiple scans of increasing quality.`}
            onChange={handleOptionChange}
          />
          <SliderOption
            title="Smoothing"
            tooltip="Smooth the input image to eliminate dithering noise."
            value={option.smoothing}
            name="smoothing"
            min={0}
            max={100}
            onChange={handleOptionChange}
          />
          <div className="flex flex-row justify-between items-center">
            <p>Quantization</p>
            <select
              className="select select-sm"
              name="quant_table"
              value={option.quant_table}
              onChange={handleOptionChange}
            >
              <option value={0}>JPEG Annex K</option>
              <option value={1}>Flat</option>
              <option value={2}>MSSIM-tuned Kodak</option>
              <option value={3}>ImageMagick</option>
              <option value={4}>PSNR-HVS tuned</option>
              <option value={5}>Klein et al.</option>
            </select>
          </div>
          <CheckboxOption
            title="Trellis multipass"
            checked={option.trellis_multipass}
            name="trellis_multipass"
            tooltip="Specifies whether multiple scans should be considered during trellis quantization."
            onChange={handleOptionChange}
          />
          {option.trellis_multipass && (
            <CheckboxOption
              title="Optimize zero block runs"
              checked={option.trellis_opt_zero}
              name="trellis_opt_zero"
              tooltip="Specifies whether to optimize runs of zero blocks in trellis quantization."
              onChange={handleOptionChange}
            />
          )}
          <CheckboxOption
            title="Optimize after trellis quantization"
            checked={option.optimize_coding}
            name="optimize_coding"
            tooltip="Specifies whether scan parameters should be optimized."
            onChange={handleOptionChange}
          />
          <SliderOption
            title="Trellis quantization passes"
            value={option.trellis_loops}
            name="trellis_loops"
            min={1}
            max={50}
            tooltip="Specifies the number of trellis quantization passes.  Huffman tables are updated between passes."
            onChange={handleOptionChange}
          />
        </div>
      </details>
    </div>
  );
}

export default OptionSelectMozjpeg;
