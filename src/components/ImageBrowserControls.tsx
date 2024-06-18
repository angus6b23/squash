import { selectCurrentFileId } from "@/store/currentFileId";
import React, { BaseSyntheticEvent, useEffect } from "react";
import { PiMagnifyingGlassMinus, PiMagnifyingGlassPlus } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useControls } from "react-zoom-pan-pinch";

export default function ImageBrowserControl() {
  const { zoomIn, zoomOut, resetTransform, centerView, instance } =
    useControls();
  const handleScaleChange = (e: BaseSyntheticEvent) => {
    const newScale = e.target.value / 100;
    instance.transformState.scale = newScale;
  };
  const currentFileId = useSelector(selectCurrentFileId);
  useEffect(() => {
    resetTransform();
    centerView();
  }, [currentFileId]);
  return (
    <>
      <div className="absolute w-fit h-12 bottom-20 left-0 right-0 mx-auto flex items-center bg-base-200 z-40 rounded-md">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => zoomOut()}
        >
          <PiMagnifyingGlassMinus className="text-xl" />
        </button>
        <input
          value={instance.transformState.scale * 100}
          className="input input-sm text-lg h-full w-16 bg-base-200"
          onChange={(e) => handleScaleChange(e)}
        />
        <p className="text-lg">%</p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => zoomIn()}
        >
          <PiMagnifyingGlassPlus className="text-xl" />
        </button>
      </div>
    </>
  );
}
