import useOptimizeResult from "@/hooks/useOptimizeResults";
import { addOptimizeSize } from "@/store/file";
import { workerContext } from "@/store/workerContext";
import getCurrentFile from "@/utils/getCurrentFile";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { PiFlask } from "react-icons/pi";
import { useDispatch } from "react-redux";

function TestFormatButton() {
  const dispatch = useDispatch();
  const optimizeResult = useOptimizeResult();

  const { testFormatWorker } = useContext(workerContext) as {
    testFormatWorker: Worker;
  };

  useEffect(() => {
    const workerListener = (e: MessageEvent) => {
      const { data } = e;
      const { type, payload } = data;
      if (type !== "error") {
        dispatch(addOptimizeSize(payload));
      }
    };
    testFormatWorker.addEventListener("message", workerListener);
    return () =>
      testFormatWorker.removeEventListener("message", workerListener);
  }, [testFormatWorker]);

  const handleClick = () => {
    const file = getCurrentFile();
    testFormatWorker.postMessage({
      format: "all",
      file: file,
    });
  };

  return (
    <>
      <button
        className={clsx(
          "btn btn-primary flex gap-2 items-center justify-center",
          {
            hidden: optimizeResult !== undefined,
          },
        )}
        onClick={handleClick}
      >
        <PiFlask className="text-lg" />
        <p>Test All format</p>
      </button>
    </>
  );
}

export default TestFormatButton;
