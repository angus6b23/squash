import useCurrentFile from "@/hooks/useCurrentFile";
import prettyBytes from "pretty-bytes";

function FileInfo() {
  const currentFile = useCurrentFile();
  return (
    <details className="collapse collapse-arrow bg-base-100 p-2 absolute left-2 top-2 !w-72 !min-w-fit">
      <summary className="collapse-title">Image Info:</summary>
      <div className="collapse-content grid grid-cols-2 gap-y-2 w-full">
        <p>File Name:</p>
        <p>{currentFile?.name}</p>
        <p>Original Size:</p>
        <p>{currentFile && prettyBytes(currentFile.size)}</p>
      </div>
    </details>
  );
}

export default FileInfo;
