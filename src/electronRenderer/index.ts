import { ipcRenderer, MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue } from "electron";
import { IShowMessageBoxReturnValue, ISaveDialogReturnValue, Channel } from "../types";
import { ElectronError } from "./errorHandle"

export async function showMessageBox(messageBoxOptions: MessageBoxOptions): Promise<MessageBoxReturnValue> {
  const response = await ipcRenderer.invoke(Channel.ShowMessageBox, messageBoxOptions);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function openDialog(openDialogOptions: OpenDialogOptions): Promise<OpenDialogReturnValue> {
  const response = await ipcRenderer.invoke(Channel.ShowOpenDialog, openDialogOptions);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function invokeChildWin()  {
  return await ipcRenderer.invoke('open-win');
}

export async function onMenuAction(callback: Function){
  ipcRenderer.on(Channel.Menu, (_evt, data)=> {
    callback(data);
  })
}

