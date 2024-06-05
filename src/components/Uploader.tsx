import { type ReactElement } from "react";
import { Dropzone, ExtFile } from "@files-ui/react";
import { useDispatch } from "react-redux";
import { addFile } from "../store/file";

export default function Uploader(): ReactElement {
  const dispatch = useDispatch();
  const handleChange = (files: ExtFile[]) => {
    files.forEach((newFile) => {
      dispatch(
        addFile({
          name: newFile.name as string,
          blob: newFile.file as File,
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
