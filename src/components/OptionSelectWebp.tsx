import { handleOutputOption, selectBulkOptions } from "@/store/bulkOptions";
import { WebpEncodeOptions } from "@/utils/defaultOptions";
import { BaseSyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderOption from "./SliderOption";
import CheckboxOption from "./CheckboxOption";

function OptionSelectWebp() {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const option = output.option as WebpEncodeOptions;
  const losslessPresets = [
    [0, 0],
    [1, 20],
    [2, 25],
    [3, 30],
    [3, 50],
    [4, 50],
    [4, 75],
    [4, 90],
    [5, 90],
    [6, 100],
  ];
  const [losslessEffort, setLosslessEffort] = useState(6);

  const handleOptionChange = (e: BaseSyntheticEvent, checkbox = false) => {
    const { name, value }: { name: keyof WebpEncodeOptions; value: number } =
      e.target;
    let newOption = option;
    if (checkbox) {
      newOption = {
        ...option,
        [name]: option[name] === 0 ? 1 : 0,
      };
    } else {
      newOption = {
        ...option,
        [name]: Number(value),
      };
    }
    dispatch(handleOutputOption(newOption));
  };
  const handleFilterSharpness = (e: BaseSyntheticEvent) => {
    const { value } = e.target;
    dispatch(handleOutputOption({ ...option, filter_sharpness: 7 - value }));
  };
  const handleLosslessEffortChange = (e: BaseSyntheticEvent) => {
    const { value } = e.target;
    setLosslessEffort(value);
    dispatch(
      handleOutputOption({
        ...option,
        method: losslessPresets[value][0],
        quality: losslessPresets[value][1],
      }),
    );
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <CheckboxOption
        checked={option.lossless === 1}
        name="lossless"
        title="Lossless"
        onChange={handleOptionChange}
      />
      {option.lossless === 0 ? (
        <>
          <SliderOption
            name="method"
            value={option.method}
            onChange={handleOptionChange}
            min={0}
            max={6}
            title="Effort"
          />
          <SliderOption
            name="quality"
            value={option.quality}
            onChange={handleOptionChange}
            min={0}
            max={100}
            title="Quality"
          />
          <details className="collapse collapse-arrow p-0">
            <summary className="collapse-title px-0">Advance Options</summary>
            <div className="collapse-content flex flex-col gap-4 py-2 px-0">
              <CheckboxOption
                checked={option.alpha_compression === 1}
                name="alpha_compression"
                title="Compress alph"
                onChange={handleOptionChange}
              />
              <SliderOption
                name="alpha_quality"
                value={option.alpha_quality}
                onChange={handleOptionChange}
                min={0}
                max={100}
                title="Alpha quality"
              />
              <SliderOption
                name="alpha_filtering"
                value={option.alpha_filtering}
                onChange={handleOptionChange}
                min={0}
                max={2}
                title="Alpha filter quality"
              />
              <CheckboxOption
                checked={option.autofilter === 1}
                name="autofilter"
                title="Auto adjust filter strength"
                onChange={handleOptionChange}
              />
              <SliderOption
                name="filter_strength"
                value={option.filter_strength}
                onChange={handleOptionChange}
                min={0}
                max={100}
                title="Filter strength"
              />
              <CheckboxOption
                checked={option.filter_type === 1}
                name="filter_type"
                title="Strong filter"
                onChange={handleOptionChange}
              />
              <SliderOption
                name="filter_sharpness"
                value={7 - option.filter_sharpness}
                onChange={handleFilterSharpness}
                min={0}
                max={7}
                title="Filter sharpness"
              />
              <CheckboxOption
                checked={option.use_sharp_yuv === 1}
                name="use_sharp_yuv"
                title="Use Sharp YUV"
                onChange={handleOptionChange}
              />
              <SliderOption
                name="pass"
                value={option.pass}
                onChange={handleOptionChange}
                min={1}
                max={10}
                title="Passes"
              />
              <SliderOption
                name="sns_strength"
                value={option.sns_strength}
                onChange={handleOptionChange}
                min={0}
                max={100}
                title="Spaital noise shaping"
              />
              <SliderOption
                name="segments"
                value={option.segments}
                onChange={handleOptionChange}
                min={1}
                max={4}
                title="Segments"
              />
              <SliderOption
                name="partitions"
                value={option.partitions}
                onChange={handleOptionChange}
                min={0}
                max={3}
                title="Partitions"
              />
            </div>
          </details>
        </>
      ) : (
        <>
          <SliderOption
            name="partitions"
            value={losslessEffort}
            onChange={handleLosslessEffortChange}
            min={0}
            max={9}
            title="Effort"
          />
          <SliderOption
            name="near_lossless"
            value={option.near_lossless}
            onChange={handleOptionChange}
            min={0}
            max={100}
            title="Near lossless"
          />
          <CheckboxOption
            checked={option.image_hint === 1}
            name="image_hint"
            title="Discrete tone image"
            onChange={handleOptionChange}
          />
        </>
      )}
      <CheckboxOption
        checked={option.exact === 1}
        name="exact"
        title="Preserve transparent data"
        onChange={handleOptionChange}
      />
    </div>
  );
}

export default OptionSelectWebp;
