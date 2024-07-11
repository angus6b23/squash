import { BaseSyntheticEvent } from "react";
import { PiInfo } from "react-icons/pi";

interface CheckboxOptionProps {
  name: string;
  title: string;
  checked: boolean;
  disabled?: boolean;
  tooltip?: string;
  onChange: (e: BaseSyntheticEvent, checked: boolean) => void;
}
function CheckboxOption(props: CheckboxOptionProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="flex gap-2 items-center">
        {props.title}
        {props.tooltip && (
          <PiInfo className="text-xs opacity-60" title={props.tooltip} />
        )}
      </p>

      <input
        type="checkbox"
        className="checkbox checkbox-sm checkbox-primary"
        name={props.name}
        checked={props.checked}
        onChange={(e) => props.onChange(e, true)}
        disabled={props.disabled}
      />
    </div>
  );
}

export default CheckboxOption;
