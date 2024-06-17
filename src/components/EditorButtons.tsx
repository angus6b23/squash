import TestFormatButton from "./TestFormatButton";
import PreviewButton from "./PreviewButton";

export default function EditorButtons() {
  return (
    <>
      <div className="absolute top-0 right-0 flex flex-col gap-4 items-end p-4">
        <PreviewButton />
        <TestFormatButton />
      </div>
    </>
  );
}
