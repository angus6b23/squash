import { useSelector } from "react-redux";
import Uploader from "@/components/Uploader";
import { File, selectFiles } from "@/store/file";
import Editor from "@/pages/Editor";
import { WorkerProvider } from "./store/workerContext";

function App() {
  const allFiles: File[] = useSelector(selectFiles);
  return (
    <WorkerProvider>
      {allFiles.length === 0 ? <Uploader /> : <Editor />}
    </WorkerProvider>
  );
}

export default App;
