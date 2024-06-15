import { selectBulkOptions } from "@/store/bulkOptions";
import { selectFiles } from "@/store/file";
import { workerContext } from "@/store/workerContext";
import saveAs from "@/utils/saveAs";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Id, toast } from "react-toastify";

const OptimizeButton = (): ReactNode => {
  const { bulkWorker } = useContext(workerContext) as { bulkWorker: Worker };
  const allFiles = useSelector(selectFiles);
  const bulkOptions = useSelector(selectBulkOptions);

  // Local State for disabling button and displaying progress via toast
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const toastID = useRef<Id>();

  useEffect(() => {
    const bulkWorkerListener = (e: MessageEvent) => {
      const { data } = e;
      switch (data.type) {
        case "info":
          toast.update(toastID.current as Id, {
            render: `Processing ${data.payload.current} out of ${data.payload.total} image`,
          });
          break;
        case "success":
          saveAs(
            data.payload,
            countRef.current === 0
              ? "squash-bulk-optimize.zip"
              : `squash-bulk-optimize-${count}.zip`,
          );
          setCount((prevState) => prevState + 1);
          toast.update(toastID.current as Id, {
            type: "success",
            autoClose: 3000,
            render: "Finished optimizing all images",
          });
          setDisabled(false);
          break;
        case "error":
          console.error(data.payload);
          toast.error(data.payload.message);
          setDisabled(false);
          break;
      }
    };
    bulkWorker.addEventListener("message", bulkWorkerListener);
    return () => bulkWorker.removeEventListener("message", bulkWorkerListener);
  }, [bulkWorker]);

  const handleOptimize = () => {
    toastID.current = toast(`Optimizing Files`, { autoClose: false });
    setDisabled(true);

    bulkWorker.postMessage({
      files: allFiles,
      options: bulkOptions,
    });
  };
  return (
    <button
      className="btn btn-accent"
      onClick={handleOptimize}
      disabled={disabled}
    >
      Optimize All
    </button>
  );
};

export default OptimizeButton;
