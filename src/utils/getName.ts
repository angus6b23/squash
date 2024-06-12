import { File } from "@/store/file";

const getName = async (original: File, newUrl: string) => {
  const res = await fetch(newUrl);
  const blob = await res.blob();
  const tempName = original.name.split(".");
  tempName.pop();
  tempName.push(blob.type.split("/")[1]);
  return tempName.join(".");
};

export default getName;
