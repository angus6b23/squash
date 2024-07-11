import { handleOutputFormat, selectBulkOptions } from "@/store/bulkOptions";
import { ReactElement, BaseSyntheticEvent } from "react";
import { PiFileImage, PiInfo } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import OptionSelectMozjpeg from "@/components/output-menu/OptionSelectMozjpeg";
import OptionsSelectOxipng from "@/components/output-menu/OptionSelectOxipng";
import OptionsSelectJxl from "@/components/output-menu/OptionSelectJxl";
import OptionSelectWebp from "@/components/output-menu/OptionSelectWebp";

export default function Output(): ReactElement {
  const dispatch = useDispatch();
  const { output } = useSelector(selectBulkOptions);
  const handleFormatChange = (e: BaseSyntheticEvent) => {
    dispatch(handleOutputFormat(e.target.value));
  };
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={3} role="button" className="btn h-16 btn-ghost">
          <PiFileImage className="text-xl" />
          Format
        </div>
        <div
          tabIndex={3}
          className="dropdown-content z-[1] p-4 bg-base-200 w-96 flex flex-col gap-1 rounded-box max-h-80 overflow-y-auto"
        >
          <div className="flex justify-between items-center sticky top-0">
            <p className="flex items-center gap-2">
              Method
              <PiInfo
                title="Determine what encoder and format will be used to generate the ouput image"
                className="opacity-60 text-sm"
              />
            </p>
            <select
              className="select select-sm text-left"
              name="format"
              value={output.format}
              onChange={handleFormatChange}
            >
              <option value="auto">Auto</option>
              <option value="avif" disabled>
                AVIF
              </option>
              <option value="jxl">JpgXL</option>
              <option value="mozjpeg">Mozjpeg</option>
              <option value="oxipng">OxiPng</option>
              <option value="qoi">QOI</option>
              <option value="webp">Webp</option>
            </select>
          </div>
          <div className="h-full overflow-y-auto pr-[2px]">
            {output.format === "mozjpeg" ? (
              <OptionSelectMozjpeg />
            ) : output.format === "oxipng" ? (
              <OptionsSelectOxipng />
            ) : output.format === "jxl" ? (
              <OptionsSelectJxl />
            ) : output.format === "webp" ? (
              <OptionSelectWebp />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
