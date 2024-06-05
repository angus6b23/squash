import { selectBulkOptions, handleResize } from "@/store/bulkOptions";
import currentFileId from "@/store/currentFileId";
import { getCurrentFileDimension } from "@/utils/getCurrentFile";
import {
  BaseSyntheticEvent,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import { PiResize } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function Resize(): ReactElement {
  const dispatch = useDispatch();
  const { resize } = useSelector(selectBulkOptions);
  const handleChange = (e: BaseSyntheticEvent) => {
    const updatedResize = {
      ...resize,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    dispatch(handleResize(updatedResize));
  };
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    getCurrentFileDimension().then(([width, height]) => {
      setImgWidth(width);
      setImgHeight(height);
    });
  }, [currentFileId]);

  return (
    <>
      <div className="dropdown dropdown-hover">
        <div tabIndex={1} role="button" className="btn h-16 btn-ghost">
          <PiResize className="text-xl" />
          Resize
        </div>
        <div
          tabIndex={1}
          className="dropdown-content z-[1] p-4 bg-base-100 w-64 flex flex-col gap-2 rounded-box"
        >
          <div className="flex justify-between items-center mb-2 pb-2 border-b-neutral border-b-[1px]">
            <p>Enable</p>
            <input
              type="checkbox"
              name="enabled"
              className="toggle toggle-primary"
              onChange={handleChange}
              checked={resize.enabled}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="underline decoration-dotted">Keep ratio</p>
            <input
              type="checkbox"
              name="keepRatio"
              className="toggle toggle-primary"
              onChange={handleChange}
              disabled={!resize.enabled}
              checked={resize.keepRatio}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Upscale images</p>
            <input
              type="checkbox"
              name="upscale"
              className="toggle toggle-primary"
              onChange={handleChange}
              disabled={!resize.enabled}
              checked={resize.upscale}
            />
          </div>
          <div className="flex justify-between items-center">
            <p
              className="tooltip underline decoration-dotted"
              data-tip="The decided width of the ouput image. Setting the width when Keep ratio is enabled will unset the height"
            >
              Width
            </p>
            <input
              type="number"
              name="width"
              className="input w-20 h-8 text-right placeholder:text-neutral"
              min={0}
              placeholder={imgWidth.toString()}
              onChange={handleChange}
              disabled={!resize.enabled}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Height</p>
            <input
              type="number"
              name="height"
              className="input w-20 h-8 text-right placeholder:text-neutral"
              min={0}
              placeholder={imgHeight.toString()}
              onChange={handleChange}
              disabled={!resize.enabled}
            />
          </div>
        </div>
      </div>
    </>
  );
}
