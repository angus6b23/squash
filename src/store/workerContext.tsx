import { createContext, useEffect, useState, type ReactNode } from "react";

export const workerContext = createContext<{
  testFormatWorker: Worker | null;
  bulkWorker: Worker | null;
  singleWorker: Worker | null;
} | null>(null);

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
  const [testFormatWorker, setTestFormatWorker] = useState<Worker | null>(null);
  const [bulkWorker, setBulkWorker] = useState<Worker | null>(null);
  const [singleWorker, setSingleWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setTestFormatWorker(() => {
      return new Worker(
        new URL("@/workers/testFormat-worker", import.meta.url),
        {
          type: "module",
        },
      );
    });
    setBulkWorker(() => {
      return new Worker(new URL("@/workers/bulk-worker", import.meta.url), {
        type: "module",
      });
    });
    setSingleWorker(() => {
      return new Worker(new URL("@/workers/single-worker", import.meta.url), {
        type: "module",
      });
    });
  }, []);

  return (
    <workerContext.Provider
      value={{ testFormatWorker, bulkWorker, singleWorker }}
    >
      {children}
    </workerContext.Provider>
  );
};
