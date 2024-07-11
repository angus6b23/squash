import { handleOutputOption, selectBulkOptions } from "@/store/bulkOptions";
import { OxipngEncodeOptions } from "@/utils/defaultOptions";
import { BaseSyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderOption from "./SliderOption";
import CheckboxOption from "./CheckboxOption";

function OptionsSelectOxipng() {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const option = output.option as OxipngEncodeOptions;
  const handleOptionChange = (e: BaseSyntheticEvent, checkbox = false) => {
    const { name, value }: { name: keyof OxipngEncodeOptions; value: string } =
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
        [name]: value,
      };
    }
    dispatch(handleOutputOption(newOption));
  };
  return (
    <div className="flex flex-col gap-2 py-4">
      <CheckboxOption
        checked={option.interlace}
        name="interlace"
        title="Interlace"
        onChange={handleOptionChange}
        tooltip="Set the PNG interlacing type. Note that interlacing can add 25-50% to the size of an optimized image."
      />
      <SliderOption
        name="level"
        value={option.level}
        onChange={handleOptionChange}
        min={0}
        max={6}
        title="Effort"
        tooltip="Lower is faster, higher is better compression"
      />
    </div>
  );
}

export default OptionsSelectOxipng;
