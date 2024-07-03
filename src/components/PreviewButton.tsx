import { useContext, useEffect, type ReactElement } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import { workerContext } from "@/store/workerContext";

export default function PreviewButton(): ReactElement {
  const { singleWorker }: { singleWorker: Worker } = useContext(
    workerContext,
  ) as { singleWorker: Worker };
  const handlePreview = async () => {
    singleWorker.postMessage({});
  };
  useEffect(() => {}, [singleWorker]);
  return (
    <>
      <button
        className="flex justify-center items-center btn btn-primary w-fit"
        onClick={handlePreview}
      >
        <PiArrowsLeftRight />
        <p>Preview Optimized</p>
      </button>
    </>
  );
}
