import { File } from "../store/file";
import { store } from "../store/store";

const getCurrentFile = () => {
  const state = store.getState();
  return state.files.find((file) => file.id === state.currentFileId) as File;
};

export const getCurrentFileDimension = async () => {
  const currentFile = getCurrentFile();
  const img = document.createElement("img");
  img.src = currentFile.url;
  await new Promise((resolve) => (img.onload = resolve));
  return [img.width, img.height];
};

export default getCurrentFile;
