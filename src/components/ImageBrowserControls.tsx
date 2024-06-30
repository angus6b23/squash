import { selectCurrentFileId } from "@/store/currentFileId";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  PiArrowClockwise,
  PiCheckerboard,
  PiMagnifyingGlassMinus,
  PiMagnifyingGlassPlus,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import { useControls, useTransformEffect } from "react-zoom-pan-pinch";

export interface ImageBrowserProps {
  toggleShowCheckerboard: () => void;
}

export default function ImageBrowserControl(props: ImageBrowserProps) {
  const { zoomIn, zoomOut, resetTransform, centerView } = useControls();
  const [scale, setScale] = useState(0);
  useTransformEffect(({ state }) => {
    setScale(state.scale);
  });
  const handleInputChange = (e: BaseSyntheticEvent) => {
    setScale(e.target.value / 100);
  };
  const handleScaleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    centerView(scale);
  };
  const resetView = (animation = true) => {
    if (animation) {
      resetTransform();
      centerView(1);
    } else {
      resetTransform(0);
      centerView(1, 0);
    }
  };
  const currentFileId = useSelector(selectCurrentFileId);
  useEffect(() => {
    setTimeout(() => resetView(false), 50);
  }, [currentFileId]);
  return (
    <>
      <div className="absolute w-fit h-12 bottom-20 left-0 right-0 mx-auto flex gap-4 items-center z-40">
        <div className="flex bg-base-200 rounded-md items-center">
          <button
            type="button"
            className="btn btn-ghost tooltip"
            onClick={() => zoomOut()}
            data-tip="Zoom Out"
          >
            <PiMagnifyingGlassMinus className="text-xl" />
          </button>
          <form onSubmit={handleScaleChange}>
            <input
              value={(scale * 100).toFixed(0)}
              name="scale-input"
              className="input input-sm text-lg h-full w-14 bg-base-200 p-0 text-center"
              onChange={handleInputChange}
            />
          </form>
          <p className="text-lg">%</p>
          <button
            type="button"
            className="btn btn-ghost tooltip"
            onClick={() => zoomIn()}
            data-tip="Zoom In"
          >
            <PiMagnifyingGlassPlus className="text-xl" />
          </button>
        </div>
        <div className="flex bg-base-200 rounded-md">
          <button
            type="button"
            className="btn btn-ghost tooltip"
            data-tip="Reset View"
            onClick={() => resetView(true)}
          >
            <PiArrowClockwise className="text-xl" />
          </button>
          <button
            type="button"
            className="btn btn-ghost tooltip"
            data-tip="Toggle background"
            onClick={props.toggleShowCheckerboard}
          >
            <PiCheckerboard className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}
