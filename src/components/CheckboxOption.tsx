import { BaseSyntheticEvent } from "react";

interface CheckboxOptionProps {
  name: string;
  title: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: BaseSyntheticEvent, checked: boolean) => void;
}
function CheckboxOption(props: CheckboxOptionProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <p>{props.title}</p>
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
