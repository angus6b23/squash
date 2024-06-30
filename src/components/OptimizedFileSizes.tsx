import useCurrentFile from "@/hooks/useCurrentFile";
import useOptimizeResult from "@/hooks/useOptimizeResults";
import prettyBytes from "pretty-bytes";
import { PiArrowDown, PiArrowUp, PiCircleNotch } from "react-icons/pi";

const calculatePercentDiff = (optimized: number, original: number) => {
  const diff = ((optimized - original) / original) * 100;
  return Math.abs(diff).toFixed(0) + "%";
};

const OptimizedResult = ({
  originalSize,
  newSize,
}: {
  originalSize: number;
  newSize: number;
}) => {
  return (
    <>
      <p className="col-span-2 grid grid-cols-2">
        <span>{prettyBytes(newSize)}</span>
        {newSize < originalSize ? (
          <span className="text-success grid grid-cols-2">
            <PiArrowDown />
            {calculatePercentDiff(newSize, originalSize)}
          </span>
        ) : (
          <span className="text-error grid grid-cols-2">
            <PiArrowUp />
            {calculatePercentDiff(newSize, originalSize)}
          </span>
        )}
      </p>
    </>
  );
};
export default function OptimizedFileSizes() {
  const currentFile = useCurrentFile();
  const optimizeResult = useOptimizeResult();
  return (
    <>
      {currentFile && optimizeResult !== undefined && (
        <details className="collapse collapse-arrow bg-base-100 !w-72" open>
          <summary className="collapse-title">Optimized Files Sizes:</summary>
          <div className="collapse-content grid grid-cols-3 gap-y-2 w-full">
            <p>Original:</p>
            <p className="col-span-2">{prettyBytes(currentFile.size)}</p>
            <p>AVIF:</p>
            {optimizeResult.avif ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.avif}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
            <p>Jxl:</p>
            {optimizeResult.jxl ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.jxl}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
            <p>Mozjpeg:</p>
            {optimizeResult.mozjpeg ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.mozjpeg}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
            <p>Oxipng:</p>
            {optimizeResult.oxipng ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.oxipng}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
            <p>Qoi:</p>
            {optimizeResult.qoi ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.qoi}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
            <p>Webp:</p>
            {optimizeResult.webp ? (
              <OptimizedResult
                originalSize={currentFile.size}
                newSize={optimizeResult.webp}
              />
            ) : (
              <PiCircleNotch className="animate-spin col-span-2" />
            )}
          </div>
        </details>
      )}
    </>
  );
}
