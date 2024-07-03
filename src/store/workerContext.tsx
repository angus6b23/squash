import { createContext, useEffect, useState, type ReactNode } from "react";
import TestFormatWorker from "@/workers/testFormat-worker?worker";
import SingleWorker from "@/workers/single-worker?worker";
import BatchWorker from "@/workers/bulk-worker?worker";

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
      return new TestFormatWorker();
    });
    setBulkWorker(() => {
      return new BatchWorker();
    });
    setSingleWorker(() => {
      return new SingleWorker();
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
