import { BaseSyntheticEvent } from "react";
import { PiInfo } from "react-icons/pi";

interface SliderOptionProps {
  title: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  name: string;
  tooltip?: string;
  disabled?: boolean;
  onChange: (e: BaseSyntheticEvent) => void;
}
function SliderOption(props: SliderOptionProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p className="flex gap-2 items-center">
          {props.title}
          {props.tooltip && (
            <PiInfo className="text-sm opacity-60" title={props.tooltip} />
          )}
        </p>
        <input
          type="number"
          className="input input-sm text-right"
          min={props.min}
          max={props.max}
          step={props.step}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
      <input
        type="range"
        className="range range-xs range-primary"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </>
  );
}

export default SliderOption;
