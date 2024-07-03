import useCurrentFile from "@/hooks/useCurrentFile";
import { File, handlePreviewClicked } from "@/store/file";
import { workerContext } from "@/store/workerContext";
import { useContext } from "react";
import { PiFlask } from "react-icons/pi";
import { useDispatch } from "react-redux";

function TestFormatButton() {
  const dispatch = useDispatch();
  const currentFile = useCurrentFile();

  const { testFormatWorker } = useContext(workerContext) as {
    testFormatWorker: Worker;
  };

  const handleClick = () => {
    testFormatWorker.postMessage({
      format: "all",
      file: currentFile,
    });
    dispatch(handlePreviewClicked((currentFile as File).id));
  };

  return (
    <>
      <button
        className="btn btn-primary flex gap-2 items-center justify-center"
        onClick={handleClick}
      >
        <PiFlask className="text-lg" />
        <p>Test All format</p>
      </button>
    </>
  );
}

export default TestFormatButton;
