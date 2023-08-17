import { ipcMain, BrowserWindow, dialog } from "electron";
import { IError, Channel } from "../types";
import chokidar from "chokidar";
import {Tree} from "../services/tree2"
const tree = new Tree({
  enableWatcher:true
})

export function sendToClient(win: BrowserWindow, channel = "", data) {
  win.webContents.send(channel, data);
}

/*************************************************************************************/
/* DIALOGs API */
/*************************************************************************************/
export function handleDialogs(win: BrowserWindow) {
  /* SHOW MESSAGE BOX */
  ipcMain.handle(Channel.ShowMessageBox, async (_evt, data) => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <showMessageBox()> electron API",
      details: "",
      type: "electron",
      channel: Channel.ShowMessageBox,
    };
    try {
      result.data = await dialog.showMessageBox(win, data);
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  });

  /* SHOW OPEN DIALOG */
  ipcMain.handle(Channel.ShowOpenDialog, async (_evt, data) => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <showOpenDialog()> electron API",
      details: "",
      type: "electron",
      channel: Channel.ShowMessageBox,
    };
    try {
      result.data = await dialog.showOpenDialog(win, data);
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  });

  /* SHOW SAVE DIALOG */
  ipcMain.handle(Channel.ShowSaveDialog, async (_evt, data) => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <showSaveDialog()> electron API",
      details: "",
      type: "electron",
      channel: Channel.ShowSaveDialog,
    };
    try {
      result.data = await dialog.showSaveDialog(win, data);
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  });
}

export function handleWindow(win: BrowserWindow) {
  /* SET WINDOW TITLE */
  ipcMain.handle(Channel.SetWindowTitle, async (_evt, data) => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <SetWindowTitle()> electron API",
      details: "",
      type: "electron",
      channel: Channel.SetWindowTitle,
    };
    try {
      result.data = win.setTitle(data);
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  });
}

export function handleFS(win: BrowserWindow) {

  //create tree
  ipcMain.handle(Channel.CreateTree, async (_evt, dirPath = '') => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <create tree> electron API",
      details: "",
      type: "electron",
      channel: Channel.CreateTree,
    };
    try {
      await tree.destroy();
      result.data = await tree.create(dirPath);
      tree.on('update-tree', (tree) => sendToClient(win, Channel.OnNewTree, tree))
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  })

  //update directory tree
  ipcMain.handle(Channel.UpdateDirectoryTree, async (_evt, data: {tree: Array<any>, node: any}) => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <update directory tree> electron API",
      details: "",
      type: "electron",
      channel: Channel.UpdateDirectoryTree,
    };
    try {
      result.data = await tree.createNodeChildren(data.node)
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  })

  // watch directory
  ipcMain.handle(Channel.WatchDir, async (_evt, dir = "") => {
    const result = {
      data: null,
      error: null,
    };
    const error: IError = {
      code: 0,
      message: "Error executing <watch dir()> electron API",
      details: "",
      type: "electron",
      channel: Channel.WatchDir,
    };
    try {
      const log = console.log.bind(console);
      const watcher = chokidar.watch(dir, {
        ignoreInitial: true,
        depth: 0
      });

      // praticamente va aggiunto un watcher per ogni sotto directory con la configurazione come sopra
      // ogni volta che aprirò una nuova directory, (esiste il campo children) verrà aggiunto un watcher
      // quindi devo creare il tree lato backend
      watcher
        .on("add", (path) => log(`File ${path} has been added`))
        .on("addDir", (path) => log(`File ${path} has been added`))
        .on("change", (path) => log(`File ${path} has been changed`))
        .on("unlink", (path) => log(`File ${path} has been removed`));
    } catch (e) {
      result.error = { ...error, ...{ details: e.message } };
    }
    return result;
  });
}
