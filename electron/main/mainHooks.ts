import { BrowserWindow } from "electron";
import * as mainHandle from "./mainHandle";
import * as mainMenu from "./mainMenu";
import { Channel } from "../types";

export function onWindowCreated(window: BrowserWindow) {
  mainMenu.create(window, (data) => {
    mainHandle.sendToClient(window, Channel.Menu, data);
  })
  mainHandle.handleDialogs(window)
  mainHandle.handleWindow(window)
}
