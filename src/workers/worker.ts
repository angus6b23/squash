import { File } from "@/store/file";
import decodeImage from "@/utils/decodeImage";
import encodeImage from "@/utils/encodeImage";

export interface SinglePayload {
  file: File;
  option?: any;
}

export interface MultiplePayload {
  files: File[];
  option?: any;
}

export interface eventData {
  action: "process-all" | "process-single" | "test-format";
  payload: SinglePayload | MultiplePayload;
}
onmessage = async (e) => {
  try {
    const { data }: { data: eventData } = e;
    switch (data.action) {
      case "process-all": {
        console.log("process-all");
        break;
      }
      case "process-single": {
        console.log("process-single");
        break;
      }
      case "test-format": {
        const imgData = await decodeImage(
          (data.payload as SinglePayload).file as File,
        );
        const res = await encodeImage(imgData as ImageData, "oxipng", {
          level: 2,
          interlace: false,
        });
        console.log(res);
        break;
      }
      default:
        throw new Error("Unknown action");
    }
  } catch (e) {
    console.error(e);
  }
};
