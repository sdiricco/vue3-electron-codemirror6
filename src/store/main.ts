import { defineStore } from "pinia";
import { createTree, openDialog, saveDialog, setTitle, updateDirectoryTree, watchDir } from "@/electronRenderer";
import {readFile, saveFile} from "@/services/nodeApi"
import {ref} from "vue"
import { JSONClone } from "@/utils/helpers";

/**
 * Riscrivere lo store per avere soltanto tempFileList e l'index del file corrente. Deve essere tolto tempFile che sarà soltando una computed.
 * Valutare se serve 'editorRef'. Il resto ok
 * 
 */

export type RootState = {
  tempFileList: Array<any>,
  tempFile: {
    ext: string;
    name: string;
    path: string;
    stat: object;
    value: string;
    info: {
      type: string;
      language:string;
    }
  },
  folderPath: string;
  editorRef: any;
  tree: Array<any>;
  isTreeLoading: boolean;
};


export const useMainStore = defineStore("main", {

  
  state: ():RootState => ({ 

    tempFileList:[],
    tempFile: {
      ext: '',
      name: '',
      path: '',
      stat: {},
      value: '',
      info: {
        type: "",
        language:""
      }
    },

    folderPath: '',
    editorRef: ref(null),
    tree: [],
    isTreeLoading: false
  }),

  getters: {
    isFileChanged: () => false,
  },

  actions: {

    //new file
    async newFile(){
      this.tempFile = {
        ext: '',
        name: '',
        path: '',
        stat: {},
        value: '',
        info: {
          type: "",
          language:""
        }
      }
    },

    //select node
    async selectNode(node:any){
      if(node.item.type === 'directory'){
        return false
      }
      const filePath = node.item.path;  

      //check if file is already opened
      const tempFile = this.tempFileList.find(f => f.path === filePath);

      //If file already opened, load it from tempFileList
      if (tempFile) {
        this.tempFile = tempFile;
      }
      //else read file from file system and add it to tempFileList
      else{
        const file = await readFile(filePath);
        this.tempFileList.push(file);
        this.tempFile = file
      }
    },

    //Load children 
    async updateTreeNode(_node:any){
      if(_node.children){
        return false;
      }
      this.isTreeLoading = true
      const tree = JSONClone(this.tree)
      const node = JSONClone(_node)
      this.tree = await updateDirectoryTree({tree, node})
      this.isTreeLoading = false
      return true
    },

    //refresh tree
    async refreshTree(){
      if (!this.folderPath) {
        return;
      }
      this.isTreeLoading = true
      this.tree = await createTree(this.folderPath);
      this.isTreeLoading = false
    },

    //open file
    async openFolder(){
      let response = null;
      try {
        //open dialog
        response = await openDialog({properties: ['openDirectory']})
        if (response.canceled) {
          return false;
        }
        //get folder path
        const folderPath:any = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!folderPath) {
          return false;
        }

        this.folderPath = folderPath
        this.isTreeLoading = true
        this.tree = await createTree(folderPath);
        this.isTreeLoading = false;
        return true;
      } catch (error) {
        console.log(error)
      }
    },

    //open file
    async openFile() {
      let response = null;
      try {
        //open dialog
        response = await openDialog({})
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
        this.tempFile = file;
        return true;
      } catch (error) {
        console.log(error)
      }
    },

    //save file
    async saveFile() {
      try {
        const filePath = this.tempFile.path || ''
        const value = this.tempFile.value || ''
        if (filePath) {
          await saveFile({filePath, value})
          const file = await readFile(filePath);
          this.tempFile = file;
        }
        else {
          this.saveAsFile();
        }
      } catch (error) {
        console.log(error)
      }
    },

    //save as file
    async saveAsFile() {
      try {
        let response = null
        response = await saveDialog({})
        if(response.canceled){
          return;
        }
        const filePath = response.filePath
        const value = this.tempFile.value || ''
        await saveFile({filePath, value})
        const file = await readFile(filePath);
        this.tempFile = file;
      } catch (error) {
        console.log(error)
      }
    },

    //update title
    async updateWindowTitle(){
      const title = `${this.isFileChanged ? '\u25CF ' : ''}${this.tempFile.path || 'Untitled'}`
      await setTitle(title)
    }
  },
});