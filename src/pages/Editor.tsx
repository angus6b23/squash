import { type ReactElement } from "react";
import FileSelector from "@/components/editor/FileSelector";
import ImageBrowser from "@/components/image-browser/ImageBrowser";
import EditBar from "@/components/editor/EditBar";
import EditorButtons from "@/components/image-browser/BrowserButtons";
import InputOutputInfo from "@/components/image-browser/InputOutputInfo";

export interface EditorProps {}

export default function Editor(): ReactElement {
  return (
    <>
      <main className="grid grid-cols-12 h-[calc(100dvh-48px)]">
        <section className="col-span-2 h-full overflow-y-auto">
          <FileSelector />
        </section>
        <section className="col-span-10 h-full overflow-hidden relative">
          <EditBar />
          <div className="w-full h-full relative" tabIndex={4}>
            <ImageBrowser />
            <InputOutputInfo />
            <EditorButtons />
          </div>
        </section>
      </main>
    </>
  );
}
