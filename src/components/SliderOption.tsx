import { BaseSyntheticEvent } from "react";

interface SliderOptionProps {
  title: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  name: string;
  onChange: (e: BaseSyntheticEvent) => void;
}
function SliderOption(props: SliderOptionProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p>{props.title}</p>
        <input
          type="number"
          className="input input-sm text-right"
          min={props.min}
          max={props.max}
          step={props.step}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
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
      />
    </>
  );
}

export default SliderOption;
