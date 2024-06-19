import { type ReactElement } from "react";
import { Dropzone, ExtFile } from "@files-ui/react";
import { useDispatch } from "react-redux";
import { addFile } from "../store/file";
import { getFileDetails } from "@/utils/convertUtils";

export default function Uploader(): ReactElement {
  const dispatch = useDispatch();
  const handleChange = (files: ExtFile[]) => {
    files.forEach((newFile) => {
      const [url, size] = getFileDetails(newFile.file as File);
      dispatch(
        addFile({
          name: newFile.name as string,
          url: url,
          size: size,
        }),
      );
    });
  };
  return (
    <>
      <Dropzone onChange={handleChange} accept="image/*" multiple />
    </>
  );
}
