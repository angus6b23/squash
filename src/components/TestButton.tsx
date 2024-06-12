import { workerContext } from "@/store/workerContext";
import { defaultWebpOption } from "@/utils/defaultOptions";
import getCurrentFile from "@/utils/getCurrentFile";
import {
  useContext,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";

export interface TestButtonProps {
  children: ReactNode;
}

export default function TestButton(): ReactElement {
  const { singleWorker } = useContext(workerContext) as {
    singleWorker: Worker;
  };
  const sendTestSignal = () => {
    const currentFile = getCurrentFile();
    singleWorker.postMessage({
      payload: currentFile,
      format: "webp",
      option: defaultWebpOption,
    });
  };

  useEffect(() => {
    singleWorker.addEventListener("message", (e: MessageEvent) => {
      console.log(e.data);
      window.open(e.data, "_blank");
    });
  }, [singleWorker]);
  return (
    <>
      <button className="btn btn-primary" onClick={sendTestSignal}>
        Test
      </button>
    </>
  );
}
