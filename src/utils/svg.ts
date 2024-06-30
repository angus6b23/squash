export const getDimension = async (input: Blob) => {
  const data = await input.text();
  const viewBoxText = (data as string).match(/viewBox=".+?"/)[0] as string;
  const viewBox = viewBoxText
    .replace(/viewBox="/, "")
    .replace('"', "")
    .split(" ");
  const [_x, _y, width = 100, height = 100] = viewBox;
  return [Number(width), Number(height)];
};

export const toDataURI = (input: Blob) => {
  return URL.createObjectURL(input);
};
