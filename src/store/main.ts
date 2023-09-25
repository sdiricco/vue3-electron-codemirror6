import { defineStore } from "pinia";
import { createTree, openDialog, saveDialog, setTitle, updateDirectoryTree, watchDir, showMessageBox } from "@/electronRenderer";
import { readFile, saveFile } from "@/services/nodeApi";
import { ref } from "vue";
import { JSONClone } from "@/utils/helpers";

export type RootState = {
  tempFileList: Array<any>;
  activeIndex: number;
  folderPath: string;
  editorRef: any;
  tree: Array<any>;
  isTreeLoading: boolean;
  showFileExplorer: boolean;
};

export const useMainStore = defineStore("main", {
  state: (): RootState => ({
    tempFileList: [],
    activeIndex: -1,
    folderPath: "",
    editorRef: ref(null),
    tree: [],
    isTreeLoading: false,
    showFileExplorer: false,
  }),

  persist: true,

  getters: {
    isSomeFileChanged: (state) => state.tempFileList.some((f) => f.isChanged),
    getActiveFile: (state) => {
      const exsitFile = state.tempFileList.length && state.activeIndex >= 0;
      return exsitFile ? state.tempFileList[state.activeIndex] : null;
    },
  },

  actions: {
    //new file
    async newFile() {
      console.log("new file not supported");
    },

    addNewFile() {
      this.tempFileList.push({
        name: "Untitled",
        ext: "txt",
        path: "",
        value: "",
        isChanged: false,
        stat: {},
        info: {
          type: "file",
          language: "text/plain",
        },
      });
      this.activeIndex = this.tempFileList.length - 1;
    },

    async removeTempFile(index: number) {
      const tempFileList = JSONClone(this.tempFileList);
      const isFileChanged = tempFileList[index].isChanged;
      if (isFileChanged) {
        const response = await showMessageBox({
          type: 'error', 
          title: 'v-code', 
          message: "Do you want to save the changes in this file?",
          detail: "Your changes will be lost if you don't save them",
          buttons: ["Don't Save", "Cancel", "Save"],
          defaultId: 2
        });
        if (response.response === 1) {
          return;
        }
        if (response.response === 2) {
          await this.saveFile()
        }
      }
      tempFileList.splice(index, 1);
      this.tempFileList = tempFileList;
      this.activeIndex = tempFileList.length - 1;
    },

    //select file from tree
    async selectFileFromTree(node: any) {
      if (node.item.type === "directory") {
        return false;
      }
      const filePath = node.item.path;

      //check if file is already opened
      const activeIndex = this.tempFileList.findIndex((f) => f.path === filePath);

      //If file already opened, load it from tempFileList
      if (activeIndex >= 0) {
        this.activeIndex = activeIndex;
      }
      //else read file from file system and add it to tempFileList
      else {
        const file = await readFile(filePath);
        this.tempFileList.push(file);
        this.activeIndex = this.tempFileList.length - 1;
      }
    },

    //Load children
    async updateTreeNode(_node: any) {
      if (_node.children) {
        return false;
      }
      this.isTreeLoading = true;
      const tree = JSONClone(this.tree);
      const node = JSONClone(_node);
      this.tree = await updateDirectoryTree({ tree, node });
      this.isTreeLoading = false;
      return true;
    },

    //refresh tree
    async refreshTree() {
      if (!this.folderPath) {
        return;
      }
      this.isTreeLoading = true;
      this.tree = await createTree(this.folderPath);
      this.isTreeLoading = false;
    },

    //open file
    async openFolder() {
      let response = null;
      try {
        //open dialog
        response = await openDialog({ properties: ["openDirectory"] });
        if (response.canceled) {
          return false;
        }
        //get folder path
        const folderPath: any = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!folderPath) {
          return false;
        }

        this.folderPath = folderPath;
        this.isTreeLoading = true;
        this.tree = await createTree(folderPath);
        this.isTreeLoading = false;
        this.showFileExplorer = true;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    //open file
    async openFile() {
      let response = null;
      try {
        //open dialog
        response = await openDialog({});
        if (response.canceled) {
          return false;
        }
        //get file path
        const filePath = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!filePath) {
          return false;
        }
        //read file
        const file = await readFile(filePath);
        const tempFileList = JSONClone(this.tempFileList);
        tempFileList.push(file);
        this.tempFileList = tempFileList;
        this.activeIndex = this.tempFileList.length - 1;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    //save file
    async saveFile() {
      try {
        const tempFile = this.tempFileList[this.activeIndex];
        const filePath = tempFile.path;
        const value = tempFile.value || "";
        if (filePath) {
          await saveFile({ filePath, value });
          const file = await readFile(filePath);
          this.tempFileList[this.activeIndex] = file;
        } else {
          await this.saveAsFile();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async saveAllTempFiles() {
      const tempFileList = JSONClone(this.tempFileList);
      for (let i = 0; i < tempFileList.length; i++) {
        const file = tempFileList[i];
        if (file.isChanged) {
          const filePath = file.path;
          const value = file.value;
          await saveFile({ filePath, value });
          const newFile = await readFile(file.path);
          tempFileList[i] = newFile;
        }
      }
      this.tempFileList = tempFileList;
    },

    //save as file
    async saveAsFile() {
      try {
        let response = null;
        response = await saveDialog({});
        if (response.canceled) {
          return;
        }
        const tempFile = this.tempFileList[this.activeIndex];
        const filePath = response.filePath;
        const value = tempFile.value || "";
        await saveFile({ filePath, value });
        const file = await readFile(filePath);
        this.tempFileList[this.activeIndex] = file;
      } catch (error) {
        console.log(error);
      }
    },

    //update title
    async updateWindowTitle() {
      const title = `${this.isSomeFileChanged ? "\u25CF " : ""} v-code`;
      await setTitle(title);
    },
  },
});
