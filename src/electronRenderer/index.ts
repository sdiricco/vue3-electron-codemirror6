import { ipcRenderer, MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue, SaveDialogOptions, SaveDialogReturnValue } from "electron";
import { IShowMessageBoxReturnValue, ISaveDialogReturnValue, Channel } from "../types";
import { ElectronError } from "./errorHandle"

export async function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue> {
  const response = await ipcRenderer.invoke(Channel.ShowMessageBox, options);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function openDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
  const response = await ipcRenderer.invoke(Channel.ShowOpenDialog, options);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function saveDialog(options: SaveDialogOptions): Promise<SaveDialogReturnValue> {
  const response = await ipcRenderer.invoke(Channel.ShowSaveDialog, options);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function setTitle(title: string){
  const response = await ipcRenderer.invoke(Channel.SetWindowTitle, title);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function watchDir(dir: string){
  const response = await ipcRenderer.invoke(Channel.WatchDir, dir);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function createTree(dir: string){
  const response = await ipcRenderer.invoke(Channel.CreateTree, dir);  
  if (response.error) {
    throw new ElectronError(response.error);
  }
  return response.data;
}

export async function updateDirectoryTree(data:{tree: Array<any>, node:any}){
  const response = await ipcRenderer.invoke(Channel.UpdateDirectoryTree, data);  
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

