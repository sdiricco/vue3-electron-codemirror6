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
    name: "",
    ext: "",
    path: "",
    value: "",
    stat: {},
  };

  const buffer = await fsProm.readFile(filePath);
  result.value = buffer.toString("utf8");
  result.stat = await fsProm.stat(filePath);
  result.name = path.basename(filePath);
  result.path = filePath;
  result.ext = path.extname(filePath)

  return result;
}

//save file
export async function saveFile({filePath = '', value = ''}){
  return fsProm.writeFile(filePath, value);
}