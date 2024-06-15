import { workerContext } from "@/store/workerContext";
import getCurrentFile from "@/utils/getCurrentFile";
import { useContext, useEffect } from "react";

function TestFormatButton() {
  const { singleWorker } = useContext(workerContext) as {
    singleWorker: Worker;
  };
  useEffect(() => {
    const workerListener = (e: MessageEvent) => {
      const { data } = e;
      const { type, payload } = data;
      console.log(type, payload);
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
      <button className="btn btn-primary" onClick={handleClick}>
        Test All format
      </button>
    </>
  );
}

export default TestFormatButton;
