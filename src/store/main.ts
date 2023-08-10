import { defineStore } from "pinia";
import { openDialog, saveDialog, setTitle } from "@/electronRenderer";
import {readFile, saveFile} from "@/services/nodeApi"
import {ref} from "vue"
import { readDir } from "@/services/nodeApi";
import {updateTreeNodeById} from "@/utils/tree"

export type RootState = {
  file: {
    ext: string;
    name: string;
    path: string;
    stat: object;
    value: string;
  },
  folderPath: string;
  editorTempValue: string;
  editorRef: any;
  tree: Array<any>;
  isTreeLoading: boolean;
};

export const useMainStore = defineStore("main", {
  state: ():RootState => ({ 
    file: {
      ext: '',
      name: '',
      path: '',
      stat: {},
      value: ''
    },
    folderPath: '',
    editorTempValue: "",
    editorRef: ref(null),
    tree: [],
    isTreeLoading: false
  }),

  getters: {
    isFileChanged: (state) => state.file.value !== state.editorTempValue 
  },

  actions: {

    //new file
    async newFile(){
      this.file = {
        ext: '',
        name: '',
        path: '',
        stat: {},
        value: ''
      },
      this.editorTempValue = ''
    },

    async selectNode(node:any){
      if(node.item.type === 'directory'){
        return false
      }
      const filePath = node.item.path;
      const response = await readFile(filePath);
      this.file = response;
      this.editorTempValue = response.value
      return true;
    },

    async updateTreeNode(node:any){
      if(node.children){
        return false;
      }
      this.isTreeLoading = true
      const items = await readDir({ dirPath: node.item.path });
      let _node = node
      _node.children = items.map((item:any, i:number) => {
        return {
          key: `${node.key}-${String(i)}`,
          id: `${node.id}-${String(i)}`,
          parentId: node.key,
          label: item.name,
          data: item.name,
          icon: item.type === 'directory' ? 'pi pi-folder' : 'pi pi-file',
          item: item,
          leaf: item.type === 'directory' ? false : true
        }
      })
      this.tree = updateTreeNodeById(this.tree, _node.id, _node)
      this.isTreeLoading = false
      return true
    },

    //open file
    async openFolder(){
      let response = null;
      try {
        response = await openDialog({properties: ['openDirectory']})
        if (response.canceled) {
          return false;
        }
        const folderPath:any = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!folderPath) {
          return false;
        }
        this.folderPath = folderPath
        this.isTreeLoading = true
        const items = await readDir({ dirPath: folderPath });
        this.tree = items.map((item:any, i:number) => {
          return {
            key: String(i),
            id: String(i),
            parentId: null,
            label: item.name,
            data: item.name,
            icon: item.type === 'directory' ? 'pi pi-folder' : 'pi pi-file',
            item: item,
            leaf: item.type === 'directory' ? false : true
          }
        })
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
        response = await openDialog({})
        if (response.canceled) {
          return false;
        }
        const filePath = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!filePath) {
          return false;
        }
        response = await readFile(filePath);
        this.file = response;
        this.editorTempValue = response.value
        return true;
      } catch (error) {
        console.log(error)
      }
    },

    //save file
    async saveFile() {
      try {
        const filePath = this.file.path || ''
        const value = this.editorTempValue || ''
        if (filePath) {
          await saveFile({filePath, value})
          const response = await readFile(filePath);
          this.file = response;
          this.editorTempValue = response.value
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
        const value = this.editorTempValue || ''
        await saveFile({filePath, value})
        response = await readFile(filePath);
        this.file = response;
        this.editorTempValue = response.value
      } catch (error) {
        console.log(error)
      }
    },

    //update title
    async updateWindowTitle(){
      const title = `${this.isFileChanged ? '\u25CF ' : ''}${this.file.path || 'Untitled'}`
      await setTitle(title)
    }
  },
});