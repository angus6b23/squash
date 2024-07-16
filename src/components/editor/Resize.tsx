import {
  selectBulkOptions,
  handleResize,
  TransformOption,
  MaxWidthOption,
  ByScaleOption,
  handleResizeMethod,
} from "@/store/bulkOptions";
import currentFileId from "@/store/currentFileId";
import { getCurrentFileDimension } from "@/utils/getCurrentFile";
import {
  BaseSyntheticEvent,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import { PiInfo, PiResize } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import SliderOption from "../output-menu/SliderOption";

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
  const handleMethodChange = (e: BaseSyntheticEvent) => {
    dispatch(handleResizeMethod(e.target.value));
  };
  const handleOptionChange = (e: BaseSyntheticEvent) => {
    const updatedOption = {
      ...resize.option,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : Number(e.target.value),
    };
    dispatch(handleResize({ ...resize, option: updatedOption }));
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
          className="dropdown-content z-[1] p-4 bg-base-200 w-64 flex flex-col gap-2 rounded-box"
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
          <div className="flex justify-between items-center sticky top-0">
            <p className="flex items-center gap-2">
              Method
              <PiInfo title="" className="opacity-60 text-sm" />
            </p>
            <select
              className="select select-sm text-left"
              name="method"
              value={resize.method}
              onChange={handleMethodChange}
              disabled={!resize.enabled}
            >
              <option value="maxWidth">Max Width</option>
              <option value="maxHeight">Max Height</option>
              <option value="byScale">Scale</option>
              <option value="stretch">Stretch</option>
              <option value="crop">Crop</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          {resize.method === "maxWidth" ? (
            <MaxWidthOptions
              resize={resize}
              imgWidth={imgWidth}
              onChange={handleOptionChange}
            />
          ) : resize.method === "maxHeight" ? (
            <MaxHeightOption
              resize={resize}
              imgHeight={imgHeight}
              onChange={handleOptionChange}
            />
          ) : resize.method === "byScale" ? (
            <ScaleOption resize={resize} onChange={handleOptionChange} />
          ) : (
            <StretchOption
              resize={resize}
              onChange={handleOptionChange}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
            />
          )}
        </div>
      </div>
    </>
  );
}

const MaxWidthOptions = (props: {
  resize: TransformOption["resize"];
  imgWidth: number;
  onChange: (e: BaseSyntheticEvent) => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Upscale images</p>
        <input
          type="checkbox"
          name="upscale"
          className="toggle toggle-primary"
          onChange={props.onChange}
          disabled={!props.resize.enabled}
          checked={(props.resize.option as MaxWidthOption).upscale}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Width</p>
        <input
          type="number"
          name="width"
          className="input w-20 h-8 text-right placeholder:text-neutral"
          min={0}
          placeholder={props.imgWidth.toString()}
          disabled={!props.resize.enabled}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

const MaxHeightOption = (props: {
  resize: TransformOption["resize"];
  imgHeight: number;
  onChange: (e: BaseSyntheticEvent) => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Upscale images</p>
        <input
          type="checkbox"
          name="upscale"
          className="toggle toggle-primary"
          onChange={props.onChange}
          disabled={!props.resize.enabled}
          checked={(props.resize.option as MaxWidthOption).upscale}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Height</p>
        <input
          type="number"
          name="height"
          className="input w-20 h-8 text-right placeholder:text-neutral"
          min={0}
          placeholder={props.imgHeight.toString()}
          onChange={props.onChange}
          disabled={!props.resize.enabled}
        />
      </div>
    </>
  );
};

const ScaleOption = (props: {
  resize: TransformOption["resize"];
  onChange: (e: BaseSyntheticEvent) => void;
}) => {
  return (
    <>
      <SliderOption
        title="Scale"
        min={0}
        max={500}
        value={(props.resize.option as ByScaleOption).scale}
        name="scale"
        onChange={props.onChange}
        disabled={!props.resize.enabled}
      />
    </>
  );
};

const StretchOption = (props: {
  resize: TransformOption["resize"];
  imgWidth: number;
  imgHeight: number;
  onChange: (e: BaseSyntheticEvent) => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Width</p>
        <input
          type="number"
          name="width"
          className="input w-20 h-8 text-right placeholder:text-neutral"
          min={0}
          placeholder={props.imgWidth.toString()}
          onChange={props.onChange}
          disabled={!props.resize.enabled}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Height</p>
        <input
          type="number"
          name="height"
          className="input w-20 h-8 text-right placeholder:text-neutral"
          min={0}
          placeholder={props.imgHeight.toString()}
          onChange={props.onChange}
          disabled={!props.resize.enabled}
        />
      </div>
    </>
  );
};
