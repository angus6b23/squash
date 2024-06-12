import { createContext, useEffect, useState, type ReactNode } from "react";

export const workerContext = createContext<{
  singleWorker: Worker | null;
  bulkWorker: Worker | null;
} | null>(null);

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
  const [singleWorker, setSingleWorker] = useState<Worker | null>(null);
  const [bulkWorker, setBulkWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setSingleWorker(() => {
      return new Worker(new URL("@/workers/single-worker", import.meta.url), {
        type: "module",
      });
    });
    setBulkWorker(() => {
      return new Worker(new URL("@/workers/bulk-worker", import.meta.url), {
        type: "module",
      });
    });
  }, []);

  return (
    <workerContext.Provider
      value={{ singleWorker: singleWorker, bulkWorker: bulkWorker }}
    >
      {children}
    </workerContext.Provider>
  );
};
