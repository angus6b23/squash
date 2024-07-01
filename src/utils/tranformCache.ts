import { TransformOption } from "@/store/bulkOptions";

const cache = new Map<string, Map<string, Blob | Error>>();

export const getCache = (id: string, option: TransformOption) => {
  if (cache.has(id)) {
    const map = cache.get(id) as Map<string, Blob | Error>;
    const optionString = JSON.stringify(option);
    if (map.has(optionString)) {
      return map.get(optionString);
    } else {
      return undefined;
    }
  }
  return undefined;
};

export const setCache = (
  id: string,
  option: TransformOption,
  output: Blob | Error,
) => {
  const optionString = JSON.stringify(option);
  if (cache.has(id)) {
    (cache.get(id) as Map<string, Blob | Error>).set(optionString, output);
  } else {
    const map = new Map();
    map.set(optionString, output);
    cache.set(id, map);
  }
};
