import { useState, type ReactElement } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./ImageBrowser.css";
import ImageBrowserControl from "./ImageBrowserControls";
import clsx from "clsx";
import ImageDiff from "./ImageDiff";

export default function ImageBrowser(): ReactElement {
  const [showCheckerboard, setShowCheckerboard] = useState(false);
  const toggleCheckerboard = () => {
    setShowCheckerboard((prev) => !prev);
  };

  return (
    <>
      <TransformWrapper
        minScale={0.1}
        maxScale={10}
        wheel={{ step: 0.5 }}
        centerOnInit={true}
        centerZoomedOut={true}
        panning={{ velocityDisabled: true, excluded: ["panningDisabled"] }}
      >
        <ImageBrowserControl toggleShowCheckerboard={toggleCheckerboard} />
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}
          wrapperClass={clsx("h-[calc(100vh-64px)] w-full relative", {
            checkerboard: showCheckerboard,
          })}
        >
          <ImageDiff />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
