import { handleOutputOption, selectBulkOptions } from "@/store/bulkOptions";
import { JxlEncodeOptions, defaultJxlOption } from "@/utils/defaultOptions";
import { BaseSyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderOption from "./SliderOption";
import CheckboxOption from "./CheckboxOption";

function OptionsSelectJxl() {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const option = output.option as JxlEncodeOptions;
  const handleOptionChange = (e: BaseSyntheticEvent, checkbox = false) => {
    const { name, value }: { name: keyof JxlEncodeOptions; value: string } =
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
  const handleEpfChange = (e: BaseSyntheticEvent) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(
        handleOutputOption({
          ...option,
          epf: -1,
        }),
      );
    } else {
      dispatch(
        handleOutputOption({
          ...option,
          epf: defaultJxlOption.epf,
        }),
      );
    }
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
      <CheckboxOption
        disabled={option.quality < 7}
        checked={option.lossyModular}
        name="lossyModular"
        title="Alternative Lossy mode"
        onChange={handleOptionChange}
      />
      <details className="collapse collapse-arrow p-0">
        <summary className="collapse-title px-0">Advance Options</summary>
        <div className="collapse-content flex flex-col gap-4 py-2 px-0">
          <CheckboxOption
            checked={option.epf === -1}
            name="epf"
            title="Auto edge filter"
            onChange={handleEpfChange}
          />
          {option.epf !== -1 && (
            <SliderOption
              title="Edge preserving filter"
              value={option.epf}
              name="epf"
              min={0}
              max={3}
              onChange={handleOptionChange}
            />
          )}
          <SliderOption
            title="Optimise for decoding speed (worse compression)"
            value={option.decodingSpeedTier}
            name="decodingSpeedTier"
            min={0}
            max={4}
            onChange={handleOptionChange}
          />
          <SliderOption
            title="Noise equivalent to ISO"
            value={option.photonNoiseIso}
            name="photonNoiseIso"
            min={0}
            max={50000}
            step={100}
            tooltip="Adds noise to the image emulating photographic film or sensor noise. Higher number = grainier image"
            onChange={handleOptionChange}
          />
          <CheckboxOption
            checked={option.progressive}
            name="progressive"
            title="Progressive rendering"
            tooltip="Enable (more) progressive/responsive decoding"
            onChange={handleOptionChange}
          />
          <SliderOption
            title="Effort"
            value={option.effort}
            name="effort"
            min={0}
            max={9}
            tooltip="Higher numbers allow more computation at the expense of time."
            onChange={handleOptionChange}
          />
        </div>
      </details>
    </div>
  );
}

export default OptionsSelectJxl;
