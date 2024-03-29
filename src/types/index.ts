import * as electron from "electron";

export interface IError {
  code?: null | number;
  message?: null | string;
  details?: null | string;
  type?: null | string;
  channel?: null | string;
}

export interface IIPC {
    error: IError;
    data: any
}

export interface IShowMessageBoxReturnValue {
  data: electron.MessageBoxReturnValue,
  error: IError
}

export interface ISaveDialogReturnValue {
  data: electron.SaveDialogReturnValue,
  error: IError
}

export enum Menu {
  //file
  openFile = "file/open",
  openFolder = "file/open-folder",
  saveFile = "file/save",
  saveAsFile = "file/save-as",
  newFile = "file/new",
  themes = "file/themes",
  //view
  toggleExplorer = "view/toggle-explorer"

}

export enum Channel {
  ShowMessageBox = "electron/show-message-box",
  ShowSaveDialog = "electron/show-save-dialog",
  ShowOpenDialog = "electron/show-open-dialog",
  SetWindowTitle = "electron/set-window-title",
  Menu = "electron/menu",
  WatchDir = "electron/watch-dir",
  CreateTree = "electron/create-tree",
  UpdateDirectoryTree = "electron/update-directory-tree",
  OnNewTree = "electron/on-new-tree",
}






