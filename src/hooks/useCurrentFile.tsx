import { selectCurrentFileId } from "@/store/currentFileId";
import { File, selectFiles } from "@/store/file";
import getCurrentFile from "@/utils/getCurrentFile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCurrentFile = () => {
  const currentFileId = useSelector(selectCurrentFileId);
  const allFiles = useSelector(selectFiles);
  const [currentFile, setCurrentFile] = useState<File>();
  useEffect(() => {
    setCurrentFile(getCurrentFile());
  }, [currentFileId, allFiles]);
  return currentFile;
};

export default useCurrentFile;
