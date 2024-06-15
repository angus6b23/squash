import { handleOutputFormat, selectBulkOptions } from "@/store/bulkOptions";
import { ReactElement, BaseSyntheticEvent } from "react";
import { PiFileImage } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function Output(): ReactElement {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const handleFormatChange = (e: BaseSyntheticEvent) => {
    dispatch(handleOutputFormat(e.target.value));
  };
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn h-16 btn-ghost">
          <PiFileImage className="text-xl" />
          Format
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] p-4 bg-base-100 w-64 flex flex-col gap-1 rounded-box"
        >
          <div className="flex justify-between items-center">
            <p>Method</p>
            <select
              className="select text-left"
              name="format"
              value={output.format}
              onChange={handleFormatChange}
            >
              <option value="auto">Auto</option>
              <option value="avif">AVIF</option>
              <option value="jpgxl">JpgXL</option>
              <option value="mozjpeg">Mozjpeg</option>
              <option value="oxipng">OxiPng</option>
              <option value="qoi">QOI</option>
              <option value="webp">Webp</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
