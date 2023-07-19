import { defineStore } from "pinia";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import {readFile, saveFile} from "@/services/nodeApi"
import {Menu} from "../types"

export const useMainStore = defineStore("main", {
  state: () => ({ 
    file: {},
    value: "",
  }),
  actions: {
    async openFile() {
      let response = null;
      try {
        response = await openDialog({})
        if (response.canceled) {
          return
        }
        const filePath = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!filePath) {
          return;
        }
        response = await readFile(filePath);
        this.file = response;
        this.value = response.value
      } catch (error) {
        console.log(error)
      }
    },
    async saveFile() {
      try {
        console.log("Saveing file")
      } catch (error) {
        console.log(error)
      }
    },
  },
});
