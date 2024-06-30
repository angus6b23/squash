import { handleRotate, selectBulkOptions } from "@/store/bulkOptions";
import { BaseSyntheticEvent, type ReactElement } from "react";
import { PiArrowClockwise } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function Rotate(): ReactElement {
  const dispatch = useDispatch();
  const { rotate } = useSelector(selectBulkOptions);
  const handleChange = (e: BaseSyntheticEvent) => {
    const updatedRotate = {
      ...rotate,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    dispatch(handleRotate(updatedRotate));
  };
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={2} role="button" className="btn h-16 btn-ghost">
          <PiArrowClockwise className="text-xl" />
          Rotate
        </div>
        <div
          tabIndex={2}
          className="dropdown-content z-[1] p-4 bg-base-100 w-64 flex flex-col gap-1 rounded-box"
        >
          <div className="flex justify-between items-center mb-2 pb-2 border-b-neutral border-b-[1px]">
            <p>Enable</p>
            <input
              type="checkbox"
              name="enabled"
              className="toggle toggle-primary"
              onChange={handleChange}
              checked={rotate.enabled}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Degree</p>
            <select
              className="select text-center"
              disabled={!rotate.enabled}
              name="degree"
              value={rotate.degree}
              onChange={handleChange}
            >
              <option value={0}>0°</option>
              <option value={90}>90°</option>
              <option value={180}>180°</option>
              <option value={270}>270°</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
