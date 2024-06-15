import { useSelector } from "react-redux";
import Uploader from "@/components/Uploader";
import { File, selectFiles } from "@/store/file";
import Editor from "@/pages/Editor";
import { WorkerProvider } from "./store/workerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

function App() {
  const allFiles: File[] = useSelector(selectFiles);
  return (
    <WorkerProvider>
      <ToastContainer
        toastClassName={(context) =>
          clsx("alert relative flex text-lg pointer-cursor w-fit", {
            "alert-success": context?.type === "success",
            "alert-error": context?.type === "error",
            "alert-info": context?.type === "info",
          })
        }
        bodyClassName="text-xl flex gap-4 items-center w-fit"
        position="bottom-center"
        autoClose={3000}
        newestOnTop={false}
        theme="colored"
        rtl={false}
        pauseOnHover
        pauseOnFocusLoss
      />
      {allFiles.length === 0 ? <Uploader /> : <Editor />}
    </WorkerProvider>
  );
}

export default App;
