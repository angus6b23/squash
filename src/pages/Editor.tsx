import { type ReactElement } from "react";
import FileSelector from "@/components/FileSelector";
import ImageBrowser from "@/components/ImageBrowser";
import EditBar from "@/components/EditBar";
import PreviewButton from "@/components/PreviewButton";

export interface EditorProps {}

export default function Editor(): ReactElement {
  return (
    <>
      <main className="grid grid-cols-12 h-dvh">
        <section className="col-span-2 h-full overflow-y-auto">
          <FileSelector />
        </section>
        <section className="col-span-10 h-full overflow-hidden relative">
          <EditBar />
          <PreviewButton />
          <ImageBrowser />
        </section>
      </main>
    </>
  );
}
