import { selectCurrentFileId } from "@/store/currentFileId";
import { File } from "@/store/file";
import getCurrentFile from "@/utils/getCurrentFile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCurrentFile = () => {
  const currentFileId = useSelector(selectCurrentFileId);
  const [currentFile, setCurrentFile] = useState<File>();
  useEffect(() => {
    setCurrentFile(getCurrentFile());
  }, [currentFileId]);
  return currentFile;
};

export default useCurrentFile;
