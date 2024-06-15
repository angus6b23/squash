import { File } from "@/store/file";

const getName = (original: File, newBlob: Blob) => {
  const tempName = original.name.split(".");
  tempName.pop();
  tempName.push(newBlob.type.split("/")[1]);
  return tempName.join(".");
};

export default getName;
