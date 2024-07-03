import TestFormatButton from "./TestFormatButton";
import OptimizedFileSizes from "./OptimizedFileSizes";
import useCurrentFile from "@/hooks/useCurrentFile";
import { useContext, useEffect } from "react";
import { workerContext } from "@/store/workerContext";
import { useDispatch } from "react-redux";
import { addOptimizeSize } from "@/store/file";

export default function EditorButtons() {
  const currentFile = useCurrentFile();
  const { testFormatWorker } = useContext(workerContext) as {
    testFormatWorker: Worker;
  };
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="absolute top-0 right-0 flex flex-col gap-4 items-end p-4">
        {currentFile?.previewClicked ? (
          <OptimizedFileSizes />
        ) : (
          <TestFormatButton />
        )}
      </div>
    </>
  );
}
