import fsProm from "fs/promises";
import fs from "fs";
import path from "path"
import {sortBy} from "lodash"

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

//readDirectory
export async function readDir({dirPath = ''}){
  const items = await fsProm.readdir(dirPath)
  const fullItems = []
  for(const item of items){
    const itemPath = path.join(dirPath, item);
    const fullPath = path.resolve(itemPath)
    const itemStats = await fsProm.stat(fullPath)
    let itemFull = {
      type: itemStats.isDirectory() ? 'directory' : 'file',
      path: fullPath,
      name: itemPath,
    }
    if (itemFull.type === 'file') {
      itemFull = {...itemFull, ... {
        ext: path.extname(fullPath),
        stat: itemStats
      }}
    }
    fullItems.push(itemFull)
  }
  const sortedItems = sortBy(fullItems, (item) => {
    if (item.type === 'directory') {
      return 0; 
    } else {
      return 1;
    }
  });
  return sortedItems
}