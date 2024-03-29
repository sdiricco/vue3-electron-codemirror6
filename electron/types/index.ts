import * as electron from "electron";

export interface IError {
  code?: null | number;
  message?: null | string;
  details?: null | string;
  type?: null | string;
  channel?: null | string;
}

export interface IIPC {
    error?: IError;
    data?: any
}

export interface IShowMessageBoxReturnValue {
  data: electron.MessageBoxReturnValue,
  error: IError
}

export enum Channel {
  ShowMessageBox = "electron/show-message-box",
  ShowSaveDialog = "electron/show-save-dialog",
  ShowOpenDialog = "electron/show-open-dialog",
  SetWindowTitle = "electron/set-window-title",
  Menu = "electron/menu",
  LoadThemes = "electron/load-themes",
  WatchDir = "electron/watch-dir",
  CreateTree = "electron/create-tree",
  UpdateDirectoryTree = "electron/update-directory-tree",
  OnNewTree = "electron/on-new-tree",
}
