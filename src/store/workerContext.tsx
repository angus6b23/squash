import { createContext, useEffect, useState, type ReactNode } from "react";

export const workerContext = createContext(null);

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setWorker(
      new Worker(new URL("@/workers/worker", import.meta.url), {
        type: "module",
      }),
    );
  }, []);

  return (
    <workerContext.Provider value={{ worker }}>
      {children}
    </workerContext.Provider>
  );
};
