import { useEffect, type ReactElement } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./ImageBrowser.css";
import getCurrentFile from "../utils/getCurrentFile";
import { useSelector } from "react-redux";
import { selectCurrentFileId } from "../store/currentFileId";
import ImageBrowserControl from "./ImageBrowserControls";

export default function ImageBrowser(): ReactElement {
  const currentFileId = useSelector(selectCurrentFileId);
  let currentImage = getCurrentFile();

  useEffect(() => {
    currentImage = getCurrentFile();
  }, [currentFileId]);

  return (
    <>
      <TransformWrapper
        minScale={0.1}
        maxScale={10}
        wheel={{ step: 0.5 }}
        centerOnInit={true}
        centerZoomedOut={true}
        panning={{ velocityDisabled: true }}
      >
        <ImageBrowserControl />
        <TransformComponent wrapperClass="h-[calc(100vh-64px)] w-full checkerboard relative">
          <img src={currentImage?.url} />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
