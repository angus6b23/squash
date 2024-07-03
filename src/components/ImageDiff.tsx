import useCurrentFile from "@/hooks/useCurrentFile";
import { selectOutputState, setUrl, startLoading } from "@/store/outputState";
import { selectBulkOptions } from "@/store/bulkOptions";
import { workerContext } from "@/store/workerContext";
import { getCurrentFileDimension } from "@/utils/getCurrentFile";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

export default function ImageDiff() {
  const currentFile = useCurrentFile();
  const { loading, url } = useSelector(selectOutputState);
  const bulkOption = useSelector(selectBulkOptions);
  const dispatch = useDispatch();

  const [imageDimension, setImageDimension] = useState([0, 0]);
  const { singleWorker } = useContext(workerContext) as {
    singleWorker: Worker;
  };

  // Create ref for fileid used in message listener
  const fileIdRef = useRef(currentFile?.id);
  useEffect(() => {
    fileIdRef.current = currentFile?.id;
  }, [currentFile]);

  const sendSignal = () => {
    singleWorker.postMessage({
      file: currentFile,
      option: bulkOption,
      type: "preview",
    });
  };
  const debouncedSingal = useDebouncedCallback(sendSignal, 1000);

  useEffect(() => {
    dispatch(startLoading());
    getCurrentFileDimension().then((dimension) => {
      setImageDimension(dimension);
    });
    if (currentFile) {
      sendSignal();
    }
  }, [currentFile]);

  useEffect(() => {
    dispatch(startLoading());
    debouncedSingal();
  }, [bulkOption]);

  useEffect(() => {
    const handleWorkerMessage = (e: MessageEvent) => {
      const { data } = e;
      const {
        type,
        payload,
        id,
        size,
      }: { type: string; payload: Blob | Error; id: string; size: number } =
        data;
      if (type === "preview" && fileIdRef.current === id) {
        URL.revokeObjectURL(url);
        dispatch(setUrl([URL.createObjectURL(payload as Blob), size]));
      } else if (type === "error") {
        toast.error((payload as Error).message);
      }
    };
    singleWorker.addEventListener("message", handleWorkerMessage);
    return () =>
      singleWorker.removeEventListener("message", handleWorkerMessage);
  }, []);

  return (
    <div
      className="diff"
      style={{ width: imageDimension[0], height: imageDimension[1] }}
    >
      {/* Output image here */}
      <div className="diff-item-1">
        {loading ? (
          <img src={currentFile?.url} />
        ) : (
          <img src={url} height={imageDimension[0]} width={imageDimension[1]} />
        )}
      </div>
      {/* Original Image here */}
      <div className="diff-item-2">
        <img src={currentFile?.url} />
      </div>
      <div className="diff-resizer panningDisabled"></div>
    </div>
  );
}
