import _ from "lodash";
import { BrowserWindow, session } from 'electron'
import { homedir } from 'os'
import { join } from 'path'

export function treeToArray(array = [], { children = "submenu" } = {}): Array<any> {
  const iterateFn = (item: any) => {
    return !item[children] || !item[children].length ? item : [item, _.flatMapDeep(item[children], iterateFn)];
  };
  return _.flatMapDeep(array, iterateFn);
}

export function arrayToTree(array = [], { id = null, parentId = "parentId", children = "submenu" } = {}): Array<any> {
  return array
    .filter((item) => item[parentId] === id)
    .map((item) => ({
      ...item,
      [children]: arrayToTree(array, { id: item.id }),
    }))
    .map((item) => {
      if (!item[children].length) {
        delete item[children];
      }
      return item;
    });
}

export async function loadVueJSExtensionDevTools(){
  let vueDevToolsPath = ''
  switch (process.platform) {
    case 'linux':
      //Ubuntu '/.config/google-chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0/'
      //Fedora '.var/app/com.google.Chrome/config/google-chrome/Profile 1/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.1_0'
      vueDevToolsPath = join(
        homedir(),
        '.var/app/com.google.Chrome/config/google-chrome/Profile 1/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.1_0'

      )
      break;
    default:
      throw(new Error(`Cannot load vueJS exetension dev tool because platform '${process.platform}' is not supported`))
  }
  await session.defaultSession.loadExtension(vueDevToolsPath)
}

export function openDevTools(win:BrowserWindow){
  win.webContents.openDevTools()
}
