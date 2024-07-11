import useCurrentFile from "@/hooks/useCurrentFile";
import { selectOutputState } from "@/store/outputState";
import prettyBytes from "pretty-bytes";
import { PiArrowDown, PiArrowUp } from "react-icons/pi";
import { useSelector } from "react-redux";
import { calculatePercentDiff } from "@/utils/convertUtils";

export default function InputOutputInfo() {
  const currentFile = useCurrentFile();
  const { size, loading, url } = useSelector(selectOutputState);
  return (
    <>
      <div className="absolute bottom-20 left-4 bg-base-200 p-4 rounded-md text-sm">
        <p>Original:</p>
        <p>{prettyBytes(currentFile?.size ?? 0)}</p>
      </div>
      <div className="absolute bottom-20 right-4 bg-base-200 p-4 rounded-md text-sm">
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <>
            <a
              href={url}
              className="tooltip"
              data-tip="Open output image on new tab"
              target="_blank"
            >
              <p>Output:</p>
              <p>{prettyBytes(size)}</p>
              {currentFile && size > currentFile?.size ? (
                <span className="text-error flex items-center gap-2">
                  <PiArrowUp />
                  {calculatePercentDiff(size, currentFile?.size as number)}
                </span>
              ) : (
                <span className="text-success flex items-center gap-2">
                  <PiArrowDown />
                  {calculatePercentDiff(size, currentFile?.size as number)}
                </span>
              )}
            </a>
          </>
        )}
      </div>
    </>
  );
}
