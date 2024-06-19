import useOptimizeResult from "@/hooks/useOptimizeResults";
import { addOptimizeSize } from "@/store/file";
import { workerContext } from "@/store/workerContext";
import getCurrentFile from "@/utils/getCurrentFile";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

function TestFormatButton() {
  const dispatch = useDispatch();
  const optimizeResult = useOptimizeResult();
  const { singleWorker } = useContext(workerContext) as {
    singleWorker: Worker;
  };
  useEffect(() => {
    const workerListener = (e: MessageEvent) => {
      const { data } = e;
      const { type, payload } = data;
      if (type !== "error") {
        dispatch(addOptimizeSize(payload));
      }
    };
    singleWorker.addEventListener("message", workerListener);
    return () => singleWorker.removeEventListener("message", workerListener);
  }, [singleWorker]);

  const handleClick = () => {
    const file = getCurrentFile();
    singleWorker.postMessage({
      format: "all",
      file: file,
    });
  };
  return (
    <>
      <button
        className={clsx("btn btn-primary", {
          hidden: optimizeResult !== undefined,
        })}
        onClick={handleClick}
      >
        Test All format
      </button>
    </>
  );
}

export default TestFormatButton;
