import { defineStore } from "pinia";
import { openDialog, saveDialog, setTitle } from "@/electronRenderer";
import {readFile, saveFile} from "@/services/nodeApi"
import {Menu} from "../types"
import {ref} from "vue"

export const useMainStore = defineStore("main", {
  state: () => ({ 
    file: {
      ext: '',
      name: '',
      path: '',
      stat: {},
      value: ''
    },
    editorTempValue: "",
    editorRef: ref(null)
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