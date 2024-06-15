import { useEffect, type ReactElement } from "react";
import { File, selectFiles, removeFile } from "../store/file";
import { selectCurrentFileId, select } from "../store/currentFileId";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { PiTrashSimple } from "react-icons/pi";

export default function FileSelector(): ReactElement {
  const allFiles: File[] = useSelector(selectFiles);
  const selectedFileId = useSelector(selectCurrentFileId);
  const dispatch = useDispatch();

  const handleFileSelect = (id: string) => {
    dispatch(select(id));
  };
  const handleRemove = (id: string) => {
    dispatch(removeFile(id));
  };
  // Automatically select the first image when selectedID is undefined or pointed to an unexisting image
  useEffect(() => {
    if (
      allFiles.length > 0 &&
      allFiles.filter((file) => file.id === selectedFileId).length === 0
    ) {
      dispatch(select(allFiles[0].id));
    }
  }, [allFiles, selectedFileId]);

  return (
    <>
      <section className="flex flex-col">
        {allFiles.map((file) => (
          <div
            className={clsx(
              "flex flex-col justify-center items-center p-4 cursor-pointer select-none relative group",
              {
                "bg-primary/50": selectedFileId === file.id,
                "hover:bg-primary/20": selectedFileId !== file.id,
              },
            )}
            key={file.id}
            onClick={() => handleFileSelect(file.id)}
          >
            <img src={file.url} className="object-contain w-32 h-28" />
            <p className="text-center line-clamp-2 w-full mt-2">{file.name}</p>
            <button
              onClick={() => handleRemove(file.id)}
              className="btn btn-ghost absolute right-2 top-2 group-hover:visible invisible"
            >
              <PiTrashSimple />
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
