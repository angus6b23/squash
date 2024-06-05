import decodeImage from "@/utils/decodeImage";

onmessage = async (e) => {
  try {
    console.log(e.data);
    console.log(await decodeImage(e.data.file));
  } catch (e) {
    console.error(e);
  }
};
