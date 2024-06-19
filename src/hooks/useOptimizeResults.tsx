import { selectCurrentFileId } from "@/store/currentFileId";
import { File, selectFiles } from "@/store/file";
import getCurrentFile from "@/utils/getCurrentFile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useOptimizeResult = () => {
  const currentFileId = useSelector(selectCurrentFileId);
  const files = useSelector(selectFiles);
  const [optimizeResult, setOptimizeResult] =
    useState<File["optimizeResult"]>();
  useEffect(() => {
    setOptimizeResult(getCurrentFile()?.optimizeResult);
  }, [files, currentFileId]);

  return optimizeResult;
};

export default useOptimizeResult;
