import { addFile } from "@/store/file";
import { BaseSyntheticEvent, useRef, type ReactElement } from "react";
import { PiCameraPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import Resize from "@/components/editor/Resize";
import Rotate from "@/components/editor/Rotate";
import OptimizeButton from "@/components/editor/OptimizeButton";
import Output from "@/components/editor/Output";
import { getFileDetails } from "@/utils/convertUtils";

const AddImageButton = () => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const openFileDiag = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    fileRef.current?.click();
  };
  const handleFileUpload = (e: BaseSyntheticEvent) => {
    Array.from(e.target.files).forEach(async (file) => {
      const newFile = file as File;
      const [url, size] = await getFileDetails(newFile);
      dispatch(
        addFile({
          name: newFile.name,
          url,
          size,
        }),
      );
    });
  };

  return (
    <>
      <input
        className="hidden"
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        multiple
      />
      <button
        className="btn btn-primary flex justify-center items-center"
        onClick={openFileDiag}
      >
        <PiCameraPlus className="text-xl" />
        Add Photo
      </button>
    </>
  );
};

export default function EditBar(): ReactElement {
  return (
    <>
      <nav className="flex justify-between items-center py-2 px-4 w-full gap-x-4 h-16">
        <AddImageButton />
        <div className="h-16 w-full flex justify-start items-end mx-4 gap-2">
          <Resize />
          <Rotate />
          <Output />
        </div>
        <OptimizeButton />
      </nav>
    </>
  );
}
