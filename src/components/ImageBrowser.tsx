import { useState, type ReactElement } from "react";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import "./ImageBrowser.css";
import ImageBrowserControl from "./ImageBrowserControls";
import clsx from "clsx";
import useCurrentFile from "@/hooks/useCurrentFile";

export default function ImageBrowser(): ReactElement {
  const currentImage = useCurrentFile();

  const [showCheckerboard, setShowCheckerboard] = useState(false);
  const toggleCheckerboard = () => {
    setShowCheckerboard((prev) => !prev);
  };

  const focusImage = (_: ReactZoomPanPinchRef, e: MouseEvent | TouchEvent) => {
    const img = (e.target as Element).querySelector("img") as HTMLImageElement;
    img.tabIndex = 6;
    img.focus();
  };

  return (
    <>
      <TransformWrapper
        minScale={0.1}
        maxScale={10}
        wheel={{ step: 0.5 }}
        centerOnInit={true}
        centerZoomedOut={true}
        panning={{ velocityDisabled: true }}
        onPanningStart={focusImage}
        onWheelStart={focusImage}
      >
        <ImageBrowserControl toggleShowCheckerboard={toggleCheckerboard} />
        <TransformComponent
          wrapperClass={clsx("h-[calc(100vh-64px)] w-full relative", {
            checkerboard: showCheckerboard,
          })}
        >
          <img src={currentImage?.url} tabIndex={5} />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
