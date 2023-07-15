import fsProm from "fs/promises";
import fs from "fs";
import path from "path"

//check if path exsits
export async function exsistPath(p = "") {
  return fsProm
    .access(p, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

//read file and return an Object with more information
export async function readFile(filePath = "") {
  const result = {
    file: {
      name: "",
      ext: "",
      path: "",
      value: "",
      stat: {},
    },
  };

  const buffer = await fsProm.readFile(filePath);
  result.file.value = buffer.toString("utf8");
  result.file.stat = await fsProm.stat(filePath);
  result.file.name = path.basename(filePath);
  result.file.path = filePath;
  result.file.ext = path.extname(filePath)

  return result;
}

//save file
export async function saveFile({filePath = null, value = null}){
  return fsProm.writeFile(filePath, value);
}