import { selectBulkOptions } from "@/store/bulkOptions";
import { selectFiles } from "@/store/file";
import { workerContext } from "@/store/workerContext";
import { ReactNode, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

const OptimizeButton = (): ReactNode => {
  const { bulkWorker } = useContext(workerContext) as { bulkWorker: Worker };
  const allFiles = useSelector(selectFiles);
  const bulkOptions = useSelector(selectBulkOptions);
  useEffect(() => {
    bulkWorker.addEventListener("message", (e) => {
      console.log(e);
      window.open(e.data, "_blank");
    });
  }, [bulkWorker]);
  const handleOptimize = () => {
    bulkWorker.postMessage({
      files: allFiles,
      options: bulkOptions,
    });
  };
  return (
    <button className="btn btn-accent" onClick={handleOptimize}>
      Optimize All
    </button>
  );
};

export default OptimizeButton;
