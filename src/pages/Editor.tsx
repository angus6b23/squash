import { type ReactElement } from "react";
import FileSelector from "@/components/FileSelector";
import ImageBrowser from "@/components/ImageBrowser";
import EditBar from "@/components/EditBar";
import EditorButtons from "@/components/EditorButtons";
import FileInfo from "@/components/FileInfo";

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
          <div className="w-full h-full relative" tabIndex={4}>
            <ImageBrowser />
            <FileInfo />
            <EditorButtons />
          </div>
        </section>
      </main>
    </>
  );
}
