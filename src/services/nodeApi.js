import fsProm from "fs/promises";
import fs from "fs";
import path from "path"
import {sortBy} from "lodash"
import langMap from "lang-map"

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
    info: {
      type: "file",
      language:""
    }
  };

  const buffer = await fsProm.readFile(filePath);
  const ext = path.extname(filePath)
  const languages = langMap.languages(ext)
  const language = languages && languages.length && languages[0]

  result.value = buffer.toString("utf8");
  console.log('value: ', result.value)
  result.stat = await fsProm.stat(filePath);
  result.name = path.basename(filePath);
  result.path = filePath;
  result.ext = ext;
  result.info.language = language;

  return result;
}

//save file
export async function saveFile({filePath = '', value = ''}){
  return fsProm.writeFile(filePath, value);
}

//read directory with extra 
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
      name: path.basename(fullPath),
    }
    if (itemFull.type === 'file') {
      const ext = path.extname(fullPath);
      const languages = langMap.languages(ext)
      const language = languages && languages.length && languages[0]
      itemFull = {...itemFull, ... {
        ext,
        language: language,
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